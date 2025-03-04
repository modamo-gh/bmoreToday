import { useEventContext } from "../contexts/EventContext";
import EventCard from "./EventCard";

const EventsGrid = () => {
	const { filteredEvents } = useEventContext();
	return (
		<div className="flex-[4] h-full gap-8 grid grid-cols-3 overflow-y-scroll pr-8 scrollbar">
			{filteredEvents.map((_, index) => (
				<EventCard event={filteredEvents[index]} key={index} />
			))}
		</div>
	);
};

export default EventsGrid;
