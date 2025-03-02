import cors from "cors";
import express, { Request, Response } from "express";
import router from "./api/events";

const app = express();
const port = process.env.PORT || 5342;

app.use(express.json());
app.use(
	cors({ origin: "https://bmoretoday.modamo.xyz", optionsSuccessStatus: 200 })
);
app.use("/api/events", router);
app.use(express.static("/home/modamo/bmoreToday/frontend/build"));

app.get("*", (req: Request, res: Response) => {
	res.sendFile("/home/modamo/bmoreToday/frontend/build/index.html");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});