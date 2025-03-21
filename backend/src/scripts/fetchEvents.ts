import pool from "../../db";
import { getBBEvents } from "../utils/baltimoreBeat";
import { getBaltimoreAgendaEvents } from "../utils/bmoreAgenda";
import { getLocalistEvents } from "../utils/localist";
import { getBaltShowPlaceEvents } from "../utils/tumblr";

const fetchEvents = async () => {
	try {
		await pool.query("TRUNCATE TABLE events RESTART IDENTITY");
		await getBaltShowPlaceEvents();
		await getLocalistEvents("https://events.baltimoremagazine.com");
		await getLocalistEvents("https://calendar.prattlibrary.org/");
		await getBBEvents();
		await getBaltimoreAgendaEvents();
	} catch (error) {
		console.error("Error during cron job:", error);
	} finally {
		await pool.end();
	}
};

fetchEvents();
