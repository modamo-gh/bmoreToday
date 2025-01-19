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
			<h2>Bmore by Doing More</h2>
			<ul>
				{events.map((event, index) => (
					<li key={index}>{JSON.stringify(event)}</li>
				))}
			</ul>
		</div>
	);
};

export default App;
