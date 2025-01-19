import express from "express";
import { configDotenv } from "dotenv";
import router from "./api/events";
import pool from "../db";
import cors from "cors";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: "https://bmoretoday.modamo.xyz/"}));

app.use("/api/events", router);

app.get("/", (req, res) => {
	res.send("API o7!");
});

(async () => {
	try {
		await pool.query("SELECT NOW()");
		console.log("Database connected successfully!");
	} catch (error) {
		console.error("Error connecting to databases:", error);
	}
})();

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
