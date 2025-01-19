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
	const x = [
		{
			id: 36,
			title: "Black Celebration",
			location: "Ottobar Upstairs",
			time: "9PM",
			price: "$FREE"
		},
		{
			id: 37,
			title: "The Dirty Nil, Grumpster, House & Home",
			location: "Metro",
			time: "6PM",
			price: "$20"
		},
		{
			id: 38,
			title: "DJ Chelle",
			location: "Fadensonnen",
			time: "8PM",
			price: "$FREE"
		},
		{
			id: 39,
			title: "Nobody Is Ever Missing",
			location: "The Voxel",
			time: "4PM",
			price: "$20-$40"
		},
		{
			id: 40,
			title: "Monster Jam",
			location: "CFG Arena",
			time: "1PM",
			price: "$29"
		},
		{
			id: 41,
			title: "School Of Rock Winter Concert",
			location: "The Recher",
			time: "11AM",
			price: "$10"
		}
	];

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
				{x.map((event, index) => (
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
