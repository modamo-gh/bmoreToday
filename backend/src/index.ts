import express, {Request, Response} from "express";
import { configDotenv } from "dotenv";
import router from "./api/events";
import pool from "../db";
import cors from "cors";
import path from "path";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
	cors({ origin: "https://bmoretoday.modamo.xyz", optionsSuccessStatus: 200 })
);
app.use("/api/events", router);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
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
