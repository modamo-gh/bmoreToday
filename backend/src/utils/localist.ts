import { DateTime } from "luxon";
import pool from "../../db";
import { sendTelegramError } from "../scripts/telegram";

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

			const price = (
				event.event.ticket_cost ||
				event.event.filters.event_cost?.[0].name ||
				"Not Provided"
			)
				.replace("FREE", "0")
				.trim();

			let minPrice = null;
			let maxPrice = null;

			if (baseURL.includes("prattlibrary")) {
				minPrice = 0;
				maxPrice = 0;
			} else {
				const prices = [...price.matchAll(/\d+/g)]
					.map((price) => Number(price[0]))
					.sort((a, b) => a - b);

				if (prices.length) {
					minPrice = prices[0];
					maxPrice = prices[prices.length - 1];
				}
			}

			const url = event.event.localist_url;

			const imageURL = event.event.photo_url;

			try {
				await pool.query(
					"INSERT INTO events (title, location, price, source, imageURL, startTime, endTime, minPrice, maxPrice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
					[
						title,
						location,
						price,
						url,
						imageURL,
						startDateTime?.toFormat("HH:mm") || null,
						endDateTime?.toFormat("HH:mm") || null,
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
		}

		page++;
	}
};
