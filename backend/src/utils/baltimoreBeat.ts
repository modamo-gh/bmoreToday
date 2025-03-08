import axios from "axios";
import { load } from "cheerio";
import { DateTime } from "luxon";
import { Event } from "../types/Event";
import pool from "../../db";

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
	const today = DateTime.now().toFormat("EEEE, MMMM d");
	const todaysSection = $("p strong")
		.filter((_, element) => $(element).text().trim() === today)
		.parent();
	const todaysEvents = todaysSection.nextUntil("p.has-primary-color", "p");

	const events: Event[] = [];

	todaysEvents.each((_, element) => {
		const event: Event = {
			title: "Not Provided",
			location: "Not Provided",
			time: "Not Provided",
			price: "Not Provided"
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
			event.time = time;
		}

		events.push(event);
	});

	return events;
};

export const getEvents = async () => {
	const urls = await getBaltimoreBeatURLs();

	for (const url of Object.values(urls)) {
		const events = await getBaltimoreBeatEvents(url);

		for (const event of events) {
			await pool.query(
				"INSERT INTO events (title, location, time, price, source) VALUES ($1, $2, $3, $4, $5)",
				[
					event.title,
					event.location,
					event.time,
					event.price,
					url || "Unknown"
				]
			);
		}
	}
};
