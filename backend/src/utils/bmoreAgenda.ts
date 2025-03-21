import axios from "axios";
import { DateTime } from "luxon";
import pool from "../../db";
import { sendTelegramError } from "../scripts/telegram";

export const getBaltimoreAgendaEvents = async () => {
	const baseURL = "https://bmoreagenda.org";
	const response = await axios.get(`${baseURL}/api/events`);
	const events: any[] = response.data;

	const todaysEvents = events.filter((event) =>
		DateTime.now().hasSame(
			DateTime.fromSeconds(event.start_datetime),
			"day"
		)
	);

	todaysEvents.forEach(async (event) => {
		const title = event.title;
		const location = event.place.name || event.place.address;
		const startTime = event.start_datetime
			? DateTime.fromSeconds(event.start_datetime)
			: null;
		const endTime = event.end_datetime
			? DateTime.fromSeconds(event.end_datetime)
			: null;
		const price = "Not Provided";
		const minPrice = null;
		const maxPrice = null;
		const url = `${baseURL}/event/${event.slug}`;
		const imageURL = `${baseURL}/media/${event.media[0].url}`;

		try {
			await pool.query(
				"INSERT INTO events (title, location, price, source, imageURL, startTime, endTime, minPrice, maxPrice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
				[
					title,
					location,
					price,
					url,
					imageURL,
					startTime ? startTime.toSQLTime() : null,
					endTime ? endTime.toSQLTime() : null,
					minPrice,
					maxPrice
				]
			);
		} catch (error) {
			await sendTelegramError(
				`🚨 *${baseURL} Insertion Error* 🚨\n\nEvent:\n\`${JSON.stringify(
					event,
					null,
					4
				)}\`\n\nError:\n\`${error}\``
			);
		}
	});
};
