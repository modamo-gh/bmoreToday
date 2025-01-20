import React, { useState } from "react";
import "../styles/EventsList.css";

const EventsList = ({ name, events }) => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const toggleIsCollapsed = () => {
		setIsCollapsed(!isCollapsed);
		console.log(isCollapsed);
	};

	return (
		<div className="events-container" onClick={toggleIsCollapsed}>
			<h3>{name}</h3>
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
