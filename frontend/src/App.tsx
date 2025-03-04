import { useEffect, useState } from "react";
import "./App.css";
import { useEventContext } from "./contexts/EventContext";
import SourcesSidebar from "./components/SourcesSidebar";

const App = () => {
	const {
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked
	} = useEventContext();

	type Event = {
		created_at: string;
		id: number;
		location: string;
		price: string;
		source: string;
		time: string;
		title: string;
	};

	const [events, setEvents] = useState<Event[]>();
	const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"https://bmoretoday.modamo.xyz/api/events"
				);
				const data = await response.json();

				console.log("Fetched Events:", data);

				setEvents(data);
			} catch (error) {
				console.error("Error fetching events", error);
			}
		};

		fetchEvents();
	}, []);

	useEffect(() => {
		const fe: Event[] = [];

		if (events) {
			if (isBaltimoreMagazineChecked) {
				fe.push(
					...events.filter(
						(event) =>
							event.source ===
							"https://events.baltimoremagazine.com"
					)
				);
			}

			if (isBaltimoreShowplaceChecked) {
				fe.push(
					...events.filter(
						(event) => event.source === "baltshowplace.tumblr.com"
					)
				);
			}

			if (isEnochPrattLibraryChecked) {
				fe.push(
					...events.filter(
						(event) =>
							event.source ===
							"https://calendar.prattlibrary.org/"
					)
				);
			}
		}

		setFilteredEvents(fe);
	}, [
		events,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked
	]);

	return (
		<div className="bg-[#1c1a29] h-screen w-screen p-8 gap-8 flex flex-row">
			<SourcesSidebar />
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
		</div>
	);
};

export default App;
