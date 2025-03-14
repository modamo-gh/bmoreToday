import { load } from "cheerio";
import { DateTime } from "luxon";
import { configDotenv } from "dotenv";
import pool from "../../db";
import { Event } from "../types/Event";

configDotenv();

const todaysDate: string = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

export const getBaltShowPlaceEvents = async () => {
	const blogIdentifier = "baltshowplace.tumblr.com";
	const apiKey = process.env.API_KEY;

	const response = await fetch(
		`https://api.tumblr.com/v2/blog/${blogIdentifier}/posts?api_key=${apiKey}`
	);

	const data = await response.json();
	const posts = data.response.posts;
	const thisMonthsPost = posts[0];
	const body = thisMonthsPost.body;
	const $ = load(body);

	const todaysHeader = $("h2").filter(
		(_: number, el) => $(el).text().trim() === todaysDate
	);

	const todaysEvents = todaysHeader.nextUntil("h2", "p");
	const events: Event[] = [];

	todaysEvents.each((_: number, el) => {
		let event = $(el).text().trim();

		const locationRegex = /@ (.+)$/;
		const locationMatch = event.match(locationRegex);
		const location = locationMatch ? locationMatch[1].trim() : "Unknown";

		event = event.replace(locationRegex, "").trim();

		const priceRegex = /(\$.+)/;
		const priceMatch = event.match(priceRegex);
		const price = priceMatch ? priceMatch[1].trim() : "Unknown";

		event = event.replace(priceRegex, "").trim();

		const timeRegex = /((\d+:)?\d+(A|P)M)/;
		const timeMatch = event.match(timeRegex);

		let startTime = null;

		if (timeMatch) {
			startTime = DateTime.fromFormat(timeMatch[1], "h:mma").isValid
				? DateTime.fromFormat(timeMatch[1], "h:mma")
				: DateTime.fromFormat(timeMatch[1], "ha");
		}

		event = event.replace(timeRegex, "").trim();

		const title = event.slice(0, -3);

		if (title.length) {
			events.push({
				title,
				price,
				location,
				endTime: null,
				startTime
			});
		}
	});

	for (const event of events) {
		await pool.query(
			"INSERT INTO events (title, location, price, source, startTime, endTime) VALUES ($1, $2, $3, $4, $5, $6)",
			[
				event.title,
				event.location,
				event.price,
				`https://${blogIdentifier}` || "Unknown",
				event.startTime?.toFormat("HH:mm") || null,
				event.endTime?.toFormat("HH:mm") || null
			]
		);
	}
};
