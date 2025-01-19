import { load } from "cheerio";
import { DateTime } from "luxon";
import { configDotenv } from "dotenv";
import pool from "../../db";

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
		(_, el) => $(el).text().trim() === todaysDate
	);

	const todaysEvents = todaysHeader.nextUntil("h2", "p");
	const events: {
		title: string;
		location: string;
		time: string;
		price: string;
	}[] = [];

	todaysEvents.each((_, el) => {
		const event = $(el).text().trim();
		const [title, time, price, location] = event.split(/\.|M,|@/);

		events.push({ title, time, price, location });
	});

	for (const event of events) {
		await pool.query(
			"INSERT INTO events (title, location, time, price) VALUES ($1, $2, $3, $4)",
			[event.title, event.location, event.time, event.price]
		);
	}
};
