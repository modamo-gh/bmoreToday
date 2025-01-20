import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import EventsList from "./components/EventsList.tsx";

const App = () => {
	type Event = {
		location: string;
		price: string;
		source: string;
		time: string;
		title: string;
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

	const baltShowPlaceEvents = events.filter(
		(event) => event.source === "baltshowplace.tumblr.com"
	);
	const baltimoreMagazineEvents = events.filter(
		(event) => event.source === "https://events.baltimoremagazine.com"
	);

	return (
		<div className="body">
			<h1>Bmore Today</h1>
			<h2>Get Outside and Bmore Today</h2>
			<EventsList events={baltShowPlaceEvents} name={"BaltShowPlace"} />
			<EventsList
				events={baltimoreMagazineEvents}
				name={"Baltimore Magazine"}
			/>
		</div>
	);
};

export default App;
