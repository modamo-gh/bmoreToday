import { useEffect, useRef, useState } from "react";
import "./App.css";
import EventsGrid from "./components/EventsGrid";
import Header from "./components/Header";
import SourcesSidebar from "./components/SourcesSidebar";
import { useEventContext } from "./contexts/EventContext";
import { Event } from "./types/Event";
import { DateTime } from "luxon";

const App = () => {
	const {
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isBmoreAgendaChecked,
		isBmoreArtChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents,
		sortSetting
	} = useEventContext();

	const [events, setEvents] = useState<Event[]>();
	const [headerHeight, setHeaderHeight] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);

	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}

		const handleResize = () => {
			if (headerRef.current) {
				setHeaderHeight(headerRef.current.offsetHeight);
			}

			setWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const mascots = [
			"/assets/natty.png",
			"/assets/oriole.png",
			"/assets/raven.png",
			"/assets/utz.png"
		];
		let mascotIndex = 0;

		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"https://bmoretoday.modamo.xyz/api/events"
				);
				const data: Event[] = await response.json();

				for (const event of data) {
					if (!event.imageurl) {
						event.imageurl = mascots[mascotIndex];
						mascotIndex = (mascotIndex + 1) % mascots.length;
					}
				}

				setEvents(data);
			} catch (error) {
				console.error("Error fetching events", error);
			}
		};

		fetchEvents();
	}, []);

	useEffect(() => {
		if (events) {
			const sortedEvents = [...events];

			switch (sortSetting) {
				case "aToZ":
					sortedEvents.sort((a, b) =>
						a.title
							.toLowerCase()
							.localeCompare(b.title.toLowerCase())
					);
					break;
				case "cheapestToMostExpensive":
					sortedEvents.sort((a, b) => {
						const aMinPrice = a.minprice ?? Infinity;
						const bMinPrice = b.minprice ?? Infinity;

						if (aMinPrice === bMinPrice) {
							const aMaxPrice = a.maxprice ?? Infinity;
							const bMaxPrice = b.maxprice ?? Infinity;

							return aMaxPrice - bMaxPrice;
						}

						return aMinPrice - bMinPrice;
					});
					break;
				case "earliestToLatest":
					sortedEvents.sort((a, b) => {
						const aStartTime =
							a.starttime &&
							DateTime.fromFormat(
								a.starttime.toString(),
								"HH:mm:ss"
							);
						const bStartTime =
							b.starttime &&
							DateTime.fromFormat(
								b.starttime.toString(),
								"HH:mm:ss"
							);

						return (
							(aStartTime?.toMillis() || 0) -
							(bStartTime?.toMillis() || 0)
						);
					});
					break;
				case "zToA":
					sortedEvents.sort((a, b) =>
						b.title
							.toLowerCase()
							.localeCompare(a.title.toLowerCase())
					);
					break;
				default:
					break;
			}

			const filtered = sortedEvents.filter((event) => {
				return (
					(isBaltimoreBeatChecked &&
						event.source.includes("https://baltimorebeat.com")) ||
					(isBaltimoreMagazineChecked &&
						event.source.includes(
							"https://events.baltimoremagazine.com"
						)) ||
					(isBaltimoreShowplaceChecked &&
						event.source.includes("baltshowplace.tumblr.com")) ||
					(isBmoreAgendaChecked &&
						event.source.includes("bmoreagenda.org/")) ||
					(isBmoreArtChecked &&
						event.source.includes("bmoreart.com")) ||
					(isEnochPrattLibraryChecked &&
						event.source.includes(
							"https://calendar.prattlibrary.org/"
						))
				);
			});

			setFilteredEvents(filtered);
		}
	}, [
		events,
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isBmoreAgendaChecked,
		isBmoreArtChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents,
		sortSetting
	]);

	return (
		<div className="bg-[#1c1a29] flex flex-col gap-8 h-screen max-w-screen p-8">
			<Header headerRef={headerRef} width={width} />
			<div
				className={`flex flex-col gap-8 lg:flex-row w-full ${
					(isBaltimoreBeatChecked ||
						isBaltimoreMagazineChecked ||
						isBaltimoreShowplaceChecked ||
						isBmoreAgendaChecked ||
						isBmoreArtChecked ||
						isEnochPrattLibraryChecked) &&
					events?.length &&
					width >= 768
						? "pb-8"
						: ""
				}`}
				style={{ height: `calc(100% - ${headerHeight}px)` }}
			>
				<SourcesSidebar width={width} />
				<EventsGrid />
			</div>
		</div>
	);
};

export default App;
