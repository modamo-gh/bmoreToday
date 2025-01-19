import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

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
		<body>
			<h1>Bmore Today</h1>
			<h2>Get Outside and Bmore Today</h2>
			<ul>
				{events.map((event, index) => (
					<li key={index}>
						<p className="title">{event.title}</p>
						<div>
							<p>{event.location}</p>
							<p>{event.time}</p>
							<p>{event.price}</p>
						</div>
					</li>
				))}
			</ul>
		</body>
	);
};

export default App;
