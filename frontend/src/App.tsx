import { useEffect, useState } from "react";
import "./App.css";
import { useEventContext } from "./contexts/EventContext";
import SourcesSidebar from "./components/SourcesSidebar";
import EventsGrid from "./components/EventsGrid";
import { Event } from "./types/Event";

const App = () => {
	const {
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents
	} = useEventContext();

	const [events, setEvents] = useState<Event[]>([]);

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
			<EventsGrid />
		</div>
	);
};

export default App;
