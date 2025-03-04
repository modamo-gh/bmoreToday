import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
	const [isBaltimoreMagazineChecked, setIsBaltimoreMagazineChecked] =
		useState(true);
	const [isBaltimoreShowplaceChecked, setIsBaltimoreShowplaceChecked] =
		useState(true);
	const [isEnochPrattLibraryChecked, setIsEnochPrattLibraryChecked] =
		useState(true);

	type Event = {
		created_at: string;
		id: number;
		location: string;
		price: string;
		source: string;
		time: string;
		title: string;
	};

	const [events, setEvents] = useState<Event[]>([]);
	const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"https://bmoretoday.modamo.xyz/api/events"
				);
				const data = await response.json();
				setEvents(data);
			} catch (error) {
				console.error("Error fetching events", error);
			}
		};
		fetchEvents();
	}, []);

	useEffect(() => {
		const fe: Event[] = [];

		if (isBaltimoreMagazineChecked) {
			fe.push(
				...events.filter(
					(event) => event.source === "baltshowplace.tumblr.com"
				)
			);
		}

		if (isBaltimoreShowplaceChecked) {
			fe.push(
				...events.filter(
					(event) =>
						event.source === "https://events.baltimoremagazine.com"
				)
			);
		}

		if (isEnochPrattLibraryChecked) {
			fe.push(
				...events.filter(
					(event) =>
						event.source === "https://calendar.prattlibrary.org/"
				)
			);
		}

		setFilteredEvents(fe);
	}, [
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked
	]);

	return (
		<div className="bg-[#1c1a29] h-screen w-screen p-8 gap-8 flex flex-row">
			<div className="bg-[#232130] flex flex-col flex-1 items-center rounded-lg">
				<h2 className="text-[#f5f5f5] text-lg p-4">Filter Sources</h2>
				<label className="flex flex-1 gap-2 items-center">
					<input
						checked={isBaltimoreMagazineChecked}
						className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
						onChange={() => {
							setIsBaltimoreMagazineChecked((prev) => !prev);
						}}
						type="checkbox"
					/>
					<span className="text-[#f5f5f5]">Baltimore Magazine</span>
				</label>
				<label className="flex flex-1 gap-2 items-center">
					<input
						checked={isBaltimoreShowplaceChecked}
						className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
						onChange={() => {
							setIsBaltimoreShowplaceChecked((prev) => !prev);
						}}
						type="checkbox"
					/>
					<span className="text-[#f5f5f5]">Baltimore Showplace</span>
				</label>
				<label className="flex flex-1 gap-2 items-center">
					<input
						checked={isEnochPrattLibraryChecked}
						className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
						onChange={() => {
							setIsEnochPrattLibraryChecked((prev) => !prev);
						}}
						type="checkbox"
					/>
					<span className="text-[#f5f5f5]">Enoch Pratt Library</span>
				</label>
			</div>
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
