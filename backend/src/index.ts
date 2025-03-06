import cors from "cors";
import express, { Request, Response } from "express";
import eventRouter from "./api/events";
import weatherRouter from "./api/weather";

const app = express();
const port = process.env.PORT || 5342;

app.use(express.json());
app.use(
	cors({ origin: "https://bmoretoday.modamo.xyz", optionsSuccessStatus: 200 })
);

app.use("/api/events", eventRouter);
app.use("/api/weather", weatherRouter);

app.use(express.static("/home/modamo/bmoreToday/frontend/build"));

app.get("*", (req: Request, res: Response) => {
	if (req.originalUrl.startsWith("/api/")) {
		res.status(404).json({ error: "API endpoint not found" });
	} else {
		res.sendFile("/home/modamo/bmoreToday/frontend/build/index.html");
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
