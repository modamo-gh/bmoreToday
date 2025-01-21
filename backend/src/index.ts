import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";
import router from "./api/events";

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

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});