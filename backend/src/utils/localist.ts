import { DateTime } from "luxon";
import pool from "../../db";

export const getLocalistEvents = async (baseURL: string) => {
	let page = 1;
	let total = 1;

	while (page <= total) {
		const response = await fetch(`${baseURL}/api/2/events?page=${page}`);
		const data = await response.json();

		total = data.page.total;

		const events = data.events;

		for (const event of events) {
			const title = event.event.title;
			const location =
				event.event.experience === "inperson"
					? event.event.location || event.event.location_name
					: "Virtual Event";

			const startTime =
				event.event.event_instances[0].event_instance.start || null;
			const endTime =
				event.event.event_instances[0].event_instance.end || null;

			const startDateTime = DateTime.fromISO(startTime, {
				zone: "utc"
			}).setZone("America/New_York");
			const endDateTime =
				endTime &&
				DateTime.fromISO(endTime, { zone: "utc" }).setZone(
					"America/New_York"
				);

			const price =
				event.event.ticket_cost ||
				event.event.filters.event_cost?.[0].name ||
				"Not Provided";

			const url = event.event.localist_url;

			const imageURL = event.event.photo_url;

			await pool.query(
				"INSERT INTO events (title, location, time, price, source, imageURL, startTime, endTime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
				[
					title,
					location,
					"time",
					price,
					url,
					imageURL,
					startDateTime?.toFormat("HH:mm") || null,
					endDateTime?.toFormat("HH:mm") || null
				]
			);
		}

		page++;
	}
};
