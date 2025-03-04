import { useEventContext } from "../contexts/EventContext";

const EventsGrid = () => {
	const { filteredEvents } = useEventContext();
	return (
		<div className="flex-[4] h-full gap-8 grid grid-cols-3 overflow-y-scroll pr-8 scrollbar">
			{filteredEvents.map((_, index) => (
				<div className="rounded-lg bg-[#30255C] h-80" key={index}>
					<p>{filteredEvents[index].location}</p>
					<p>{filteredEvents[index].price}</p>
					<p>{filteredEvents[index].source}</p>
					<p>{filteredEvents[index].time}</p>
					<p>{filteredEvents[index].title}</p>
				</div>
			))}
		</div>
	);
};

export default EventsGrid;
