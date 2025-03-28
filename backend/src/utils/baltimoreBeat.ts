import axios from "axios";
import { load } from "cheerio";
import { DateTime } from "luxon";
import { Event } from "../types/Event";
import pool from "../../db";
import { sendTelegramError } from "../scripts/telegram";

const getBaltimoreBeatURLs = async () => {
	const response = await axios.get(
		"https://baltimorebeat.com/category/calendar/"
	);
	const html = response.data;
	const $ = load(html);

	let governmentAndCommunityEventsURL = "";
	let artsAndCultureEventsURL = "";

	$("article").each((_, element) => {
		const title = $(element).find("h2 a").text().trim();
		const url = $(element).find("h2 a").attr("href");

		if (
			title.includes("Baltimore Government and Community Events") &&
			url &&
			!governmentAndCommunityEventsURL
		) {
			governmentAndCommunityEventsURL = url;
		}

		if (
			title.includes("Baltimore Arts and Culture Events") &&
			url &&
			!artsAndCultureEventsURL
		) {
			artsAndCultureEventsURL = url;
		}

		if (governmentAndCommunityEventsURL && artsAndCultureEventsURL) {
			return false;
		}
	});

	return { governmentAndCommunityEventsURL, artsAndCultureEventsURL };
};

const getBaltimoreBeatEvents = async (url: string) => {
	const response = await axios.get(url);
	const html = response.data;
	const $ = load(html);
	const today = DateTime.now().setZone("America/New_York");
	const todaysDate = today.toFormat("EEEE, MMMM d");
	const tomorrowsDate = today.plus({ days: 1 }).toFormat("EEEE, MMMM d");
	const todaysSection = $("p > strong")
		.filter((_, element) => $(element).text().trim() === todaysDate)
		.parent();
	const tomorrowsSection = $("p > strong")
		.filter((_, element) => $(element).text().trim() === tomorrowsDate)
		.parent();
	const todaysEvents = todaysSection.nextUntil(tomorrowsSection, "p");
	const events: Event[] = [];

	todaysEvents.each((_, element) => {
		const event: Event = {
			title: "Not Provided",
			location: "Not Provided",
			price: "Not Provided",
			startTime: null,
			endTime: null
		};

		let title = $(element).find("a strong").text().trim();

		if (!title) {
			title = $(element).find("strong a").text().trim();
		}

		event.title = title;

		const price = $(element).text().trim().match(/\$\d+/)?.[0];

		if (price) {
			event.price = price;
		}

		const location = $(element)
			.text()
			.trim()
			.match(/at\s([\w|\s|\.|’]+)(,[\w|\s|\.|']+)?\./)?.[1];

		if (location) {
			event.location = location[0].toUpperCase() + location.slice(1);
		}

		const time = $(element)
			.text()
			.trim()
			.match(
				/\d{1,2}(:\d{1,2})?\s[a|p]\.m\.(\sto\s((\d{1,2}(:\d{1,2})?\s[a|p]\.m\.)|noon))?/
			)?.[0];

		if (time) {
			const timeTokens = time
				.split("to")
				.map((token) => token.trim().replace(/\./g, "").toUpperCase());

			if (timeTokens[1] && timeTokens[1] === "NOON") {
				timeTokens[1] = "12:00 PM";
			}

			event.startTime = DateTime.fromFormat(timeTokens[0], "h:mm a")
				.isValid
				? DateTime.fromFormat(timeTokens[0], "h:mm a")
				: DateTime.fromFormat(timeTokens[0], "h a");

			timeTokens.length === 2
				? (event.endTime = DateTime.fromFormat(timeTokens[1], "h:mm a"))
				: undefined;
		}

		events.push(event);
	});

	return events;
};

export const getBBEvents = async () => {
	const urls = await getBaltimoreBeatURLs();

	for (const url of Object.values(urls)) {
		const events = await getBaltimoreBeatEvents(url);

		for (const event of events) {
			try {
				await pool.query(
					"INSERT INTO events (title, location, price, source, startTime, endTime) VALUES ($1, $2, $3, $4, $5, $6)",
					[
						event.title,
						event.location,
						event.price,
						url || "Unknown",
						event.startTime ? event.startTime.toSQLTime() : null,
						event.endTime ? event.endTime.toSQLTime() : null
					]
				);
			} catch (error) {
				await sendTelegramError(
					`🚨 *Baltimore Beat Insertion Error* 🚨\n\nEvent:\n\`${JSON.stringify(
						event,
						null,
						4
					)}\`\n\nError:\n\`${error}\``
				);
			}
		}
	}
};