import pool from "../../db";
import { getBBEvents } from "../utils/baltimoreBeat";
import { getLocalistEvents } from "../utils/localist";
import { getBaltShowPlaceEvents } from "../utils/tumblr";
import { sendTelegramError } from "./telegram";

const fetchEvents = async () => {
	try {
		await pool.query("TRUNCATE TABLE events RESTART IDENTITY");
		await getBaltShowPlaceEvents();
		await getLocalistEvents("https://events.baltimoremagazine.com");
		await getLocalistEvents("https://calendar.prattlibrary.org/");
		await getBBEvents();
	} catch (error) {
		console.error("Error during cron job:", error);
		
		if(error instanceof Error){
			await sendTelegramError(error.message)
		}
		else{
			await sendTelegramError("An unknown error occurred")
		}
	} finally {
		await pool.end();
	}
};

fetchEvents();
