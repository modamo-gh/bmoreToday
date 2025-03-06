import { useEffect, useRef, useState } from "react";
import "./App.css";
import EventsGrid from "./components/EventsGrid";
import SourcesSidebar from "./components/SourcesSidebar";
import { useEventContext } from "./contexts/EventContext";
import { Event } from "./types/Event";
import Header from "./components/Header";

const App = () => {
	const {
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents
	} = useEventContext();

	const [events, setEvents] = useState<Event[]>();
	const [headerHeight, setHeaderHeight] = useState(0);

	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}

		const handleResize = () => {
			if (headerRef.current) {
				setHeaderHeight(headerRef.current.offsetHeight);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
					...events.filter((event) =>
						event.source.includes(
							"https://events.baltimoremagazine.com"
						)
					)
				);
			}

			if (isBaltimoreShowplaceChecked) {
				fe.push(
					...events.filter((event) =>
						event.source.includes("baltshowplace.tumblr.com")
					)
				);
			}

			if (isEnochPrattLibraryChecked) {
				fe.push(
					...events.filter((event) =>
						event.source.includes(
							"https://calendar.prattlibrary.org/"
						)
					)
				);
			}
		}

		setFilteredEvents(fe);
	}, [
		events,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents
	]);

	return (
		<div className="bg-[#1c1a29] flex flex-col gap-8 h-screen max-w-screen p-8">
			<Header headerRef={headerRef}/>
			<div
				className="flex flex-row gap-8 w-full pb-8"
				style={{ height: `calc(100% - ${headerHeight}px)` }}
			>
				<SourcesSidebar />
				<EventsGrid />
			</div>
		</div>
	);
};

export default App;
