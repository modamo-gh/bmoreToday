import pool from "../../db";
import { getLocalistEvents } from "../utils/localist";
import { getBaltShowPlaceEvents } from "../utils/tumblr";

const fetchEvents = async () => {
	try {
		await pool.query("TRUNCATE TABLE events");
		await getBaltShowPlaceEvents();
		await getLocalistEvents("https://events.baltimoremagazine.com");
		await getLocalistEvents("https://calendar.prattlibrary.org/");
	} catch (error) {
		console.error("Error during cron job:", error);
	} finally {
		await pool.end();
	}
};

fetchEvents();
