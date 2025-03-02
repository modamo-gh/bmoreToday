import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import EventsList from "./components/EventsList.tsx";
import TumblrIcon from "./components/icons/TumblrIcon.tsx";
import InternetIcon from "./components/icons/InternetIcon.tsx";

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
					"https://bmoretoday.modamo.xyz/api/events"
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
	const prattEvents = events.filter(
		(event) => event.source === "https://calendar.prattlibrary.org/"
	);

	return (
		<div className="body">
			<h1>Bmore Today</h1>
			<h2>Get Outside and Bmore Today</h2>
			<EventsList
				events={baltimoreMagazineEvents}
				icon={<InternetIcon />}
				name={"Baltimore Magazine"}
				url={"https://events.baltimoremagazine.com/"}
			/>
			<EventsList
				events={baltShowPlaceEvents}
				icon={<TumblrIcon />}
				name={"BaltShowPlace"}
				url={"https://baltshowplace.tumblr.com/"}
			/>
			<EventsList
				events={prattEvents}
				icon={<InternetIcon />}
				name={"Enoch Pratt Free Library"}
				url={"https://calendar.prattlibrary.org/"}
			/>
		</div>
	);
};

export default App;
