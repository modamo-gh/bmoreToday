import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import EventsList from "./components/EventsList.tsx";

const App = () => {
	type Event = {
		title: string;
		location: string;
		time: string;
		price: string;
	};

	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"https://bmoretoday-backend.onrender.com/api/events"
				);
				const data = await response.json();
				setEvents(data);
			} catch (error) {
				console.error("Error fetching events", error);
			}
		};
		fetchEvents();
	}, []);

	return (
		<div className="body">
			<h1>Bmore Today</h1>
			<h2>Get Outside and Bmore Today</h2>
			<EventsList events={events} name={"BaltShowPlace"} />
		</div>
	);
};

export default App;
