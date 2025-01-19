import React from "react";
import { useEffect, useState } from "react";

const App = () => {
	const [events, setEvents] = useState([]);

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

	return (
		<div>
			<h1>Bmore Today</h1>
			<h2>Bmore By Doing More</h2>
			<p>{JSON.stringify(events)}</p>
		</div>
	);
};

export default App;
