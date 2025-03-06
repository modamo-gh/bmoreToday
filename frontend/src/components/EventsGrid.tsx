import { useEventContext } from "../contexts/EventContext";
import EventCard from "./EventCard";

const EventsGrid = () => {
	const { filteredEvents } = useEventContext();

	return (
		<div className="gap-8 grid grid-cols-3 h-full overflow-y-scroll pr-8 scrollbar w-4/5">
			{filteredEvents.map((_, index) => (
				<EventCard event={filteredEvents[index]} key={index} />
			))}
		</div>
	);
};

export default EventsGrid;
