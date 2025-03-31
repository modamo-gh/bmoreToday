import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from "react";
import { Event } from "../types/Event";
import { EventContextType } from "../types/EventContextType";

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
	const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
	const [isBaltimoreBeatChecked, setIsBaltimoreBeatChecked] = useState(true);
	const [isBaltimoreMagazineChecked, setIsBaltimoreMagazineChecked] =
		useState(true);
	const [isBaltimoreShowplaceChecked, setIsBaltimoreShowplaceChecked] =
		useState(true);
	const [isBmoreAgendaChecked, setIsBmoreAgendaChecked] = useState(true);
	const [isBmoreArtChecked, setIsBmoreArtChecked] = useState(true);
	const [isEnochPrattLibraryChecked, setIsEnochPrattLibraryChecked] =
		useState(true);
	const [sortSetting, setSortSetting] = useState("default");

	useEffect(() => {
		const savedFilters = JSON.parse(
			localStorage.getItem("filters") || "{}"
		);
		const savedSort = localStorage.getItem("sort");

		setIsBaltimoreBeatChecked(savedFilters.isBaltimoreBeatChecked ?? true);
		setIsBaltimoreMagazineChecked(
			savedFilters.isBaltimoreMagazineChecked ?? true
		);
		setIsBaltimoreShowplaceChecked(
			savedFilters.isBaltimoreShowplaceChecked ?? true
		);
		setIsBmoreAgendaChecked(savedFilters.isBmoreAgendaChecked ?? true);
		setIsBmoreArtChecked(savedFilters.isBmoreArtChecked ?? true);
		setIsEnochPrattLibraryChecked(
			savedFilters.isEnochPrattLibraryChecked ?? true
		);

		savedSort && setSortSetting(savedSort);
	}, []);

	useEffect(() => {
		const filters = {
			isBaltimoreBeatChecked,
			isBaltimoreMagazineChecked,
			isBaltimoreShowplaceChecked,
			isBmoreAgendaChecked,
			isBmoreArtChecked,
			isEnochPrattLibraryChecked
		};

		localStorage.setItem("filters", JSON.stringify(filters));
	}, [
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isBmoreAgendaChecked,
		isBmoreArtChecked,
		isEnochPrattLibraryChecked
	]);

	useEffect(() => {
		localStorage.setItem("sort", sortSetting);
	}, [sortSetting]);

	return (
		<EventContext.Provider
			value={{
				filteredEvents,
				isBaltimoreBeatChecked,
				isBaltimoreMagazineChecked,
				isBaltimoreShowplaceChecked,
				isBmoreAgendaChecked,
				isBmoreArtChecked,
				isEnochPrattLibraryChecked,
				setIsBaltimoreBeatChecked,
				setFilteredEvents,
				setIsBaltimoreMagazineChecked,
				setIsBaltimoreShowplaceChecked,
				setIsBmoreAgendaChecked,
				setIsBmoreArtChecked,
				setIsEnochPrattLibraryChecked,
				setSortSetting,
				sortSetting
			}}
		>
			{children}
		</EventContext.Provider>
	);
};

export const useEventContext = () => {
	const context = useContext(EventContext);

	if (!context) {
		throw new Error("useEventContext must be used within a EventProvider");
	}

	return context;
};
