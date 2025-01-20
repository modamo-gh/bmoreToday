import { Request, Response, Router } from "express";
import pool from "../../db";
import { getBaltShowPlaceEvents } from "../utils/tumblr";
import { getBaltimoreMagazineEvents } from "../utils/localist";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		const result = await pool.query("SELECT * from events");

		res.json(result.rows);
	} catch (error) {
		console.log("Error fetching events:", error);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		await getBaltShowPlaceEvents();
		await getBaltimoreMagazineEvents();

		res.status(201).json({ message: "Events saved successfully!" });
	} catch (error) {
		console.log("Error saving events:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default router;
