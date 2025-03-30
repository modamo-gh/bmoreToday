import { Request, Response, Router } from "express";
import pool from "../../db";
import { getLocalistEvents } from "../utils/localist";
import { getBaltShowPlaceEvents } from "../utils/tumblr";
import { getBaltimoreAgendaEvents } from "../utils/bmoreAgenda";
import { getBmoreArtEvents } from "../utils/bmoreArt";

const eventRouter = Router();

eventRouter.get("/", async (req: Request, res: Response) => {
	try {
		const result = await pool.query("SELECT * from events");

		res.json(result.rows);
	} catch (error) {
		console.log("Error fetching events:", error);
	}
});

eventRouter.post("/", async (req: Request, res: Response) => {
	try {
		await getBaltimoreAgendaEvents();
		await getBaltShowPlaceEvents();
		await getBmoreArtEvents();
		await getLocalistEvents("https://events.baltimoremagazine.com");
		await getLocalistEvents("https://calendar.prattlibrary.org/");

		res.status(201).json({ message: "Events saved successfully!" });
	} catch (error) {
		console.log("Error saving events:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default eventRouter;
