import React, { useState } from "react";
import "../styles/EventsList.css";

const EventsList = ({ events, icon, name, url }) => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const toggleIsCollapsed = () => {
		setIsCollapsed(!isCollapsed);
		console.log(isCollapsed);
	};

	return (
		<div className="events-container" onClick={toggleIsCollapsed}>
			<div className="event-header">
				<h3>{name}</h3>
				<a href={url}>{icon}</a>
			</div>
			{isCollapsed ? null : (
				<div className="list-container">
					<ul>
						{events.map((event, index) => (
							<li key={index}>
								<p className="title">{event.title}</p>
								<div className="details-container">
									<p>{event.location}</p>
									<p>{event.time}</p>
									<p>{event.price}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default EventsList;
