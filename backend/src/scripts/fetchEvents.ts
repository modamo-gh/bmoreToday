import pool from "../../db";
import { getBaltimoreMagazineEvents } from "../utils/localist";
import { getBaltShowPlaceEvents } from "../utils/tumblr";

const fetchEvents = async () => {
	try {
		await pool.query("TRUNCATE TABLE events");
		await getBaltShowPlaceEvents();
		await getBaltimoreMagazineEvents();
	} catch (error) {
		console.error("Error during cron job:", error);
	} finally {
		await pool.end();
	}
};

fetchEvents();
