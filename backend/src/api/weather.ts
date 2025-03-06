import { Request, Response, Router } from "express";

const weatherRouter = Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const LATITUDE = 39.2908816;
const LONGITUDE = -76.610759;
const UNITS = "imperial";

weatherRouter.get("/", async (req: Request, res: Response) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/3.0/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${OPENWEATHER_API_KEY}&units=${UNITS}`
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch weather: ${response.statusText}`);
		}

		const data = await response.json();

		const weather = {
			temp: data.current.temp,
			feels_like: data.current.feels_like,
			icon: data.current.weather[0].icon
		};

		res.json(weather);
	} catch (error) {
		console.log("Weather API Error:", error);
		res.status(500).json({ error: "Failed to fetch weather data" });
	}
});

export default weatherRouter;
