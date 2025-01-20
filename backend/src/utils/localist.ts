import { DateTime } from "luxon";
import pool from "../../db";

export const getBaltimoreMagazineEvents = async () => {
	const baseURL = "https://events.baltimoremagazine.com";
	const response = await fetch(`${baseURL}/api/2/events`);

	const data = await response.json();
	const events = data.events;

	for (const event of events) {
		const title = event.event.title;
		const location = event.event.location || event.event.location_name;

		const startTime = event.event.event_instances[0].event_instance.start;
		const endTime =
			event.event.event_instances[0].event_instance.end || startTime;

		const startDateTime = DateTime.fromISO(startTime);
		const endDateTime = DateTime.fromISO(endTime);

		const formattedStartTime = startDateTime.toFormat("hh:mm a");
		const formattedEndTime = endDateTime.toFormat("hh:mm a");

		const time = `${formattedStartTime} - ${formattedEndTime}`;

		const price = event.event.ticket_cost || "Not Provided";

		await pool.query(
			"INSERT INTO events (title, location, time, price, source) VALUES ($1, $2, $3, $4, $5)",
			[title, location, time, price, baseURL]
		);
	}
};
