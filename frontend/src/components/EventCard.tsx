import { FC } from "react";
import { EventCardType } from "../types/EventCardType";

const EventCard: FC<EventCardType> = ({ event }) => {
	return (
		<div className="rounded-lg bg-[#30255C] h-80">
			<p>{event.location}</p>
			<p>{event.price}</p>
			<p>{event.source}</p>
			<p>{event.time}</p>
			<p>{event.title}</p>
		</div>
	);
};

export default EventCard;
