import axios from "axios";
import { load } from "cheerio";
import { DateTime } from "luxon";
import { Event } from "../types/Event";

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

const getGovernmentAndCommunityEvents = async () => {
	const url = (await getBaltimoreBeatURLs()).governmentAndCommunityEventsURL;
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

		let price = $(element).text().trim().match(/\$\d+/)?.[0];

		if (price) {
			event.price = price;
		}

		console.log(event);
	});
};

getGovernmentAndCommunityEvents();
