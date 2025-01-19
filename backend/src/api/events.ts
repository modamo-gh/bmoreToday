import { Router } from "express";
import pool from "../../db";

const router = Router();

type Event = {
	title: string;
	description: string;
	location: string;
	time: string;
	price: string;
};

router.get("/", async (req, res) => {
	try {
		const result = await pool.query("SELECT * from events");

		res.json(result.rows);
	} catch (error) {
		console.log("Error fetching events:", error);
	}
});

router.post("/", async (req, res) => {
	const events: Event[] = req.body.events || [];

	console.log("Events retrieved!")

	try {
		const values = events.map(
			({ title, description, location, time, price }) =>
				`('${title}', '${description}', '${location}', '${time}', '${price}')`
		);
		const query = `INSERT INTO events (title, description, location, time, price) VALUES ${values.join(
			", "
		)}`;

		await pool.query(query);

		res.status(201).json({ message: "Events saved successfully!" });
	} catch (error) {
		console.log("Error saving events:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default router;
