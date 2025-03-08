import { createContext, ReactNode, useContext, useState } from "react";
import { Event } from "../types/Event";
import { EventContextType } from "../types/EventContextType";

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
	const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
	const [isBaltimoreMagazineChecked, setIsBaltimoreMagazineChecked] =
		useState(true);
	const [isBaltimoreShowplaceChecked, setIsBaltimoreShowplaceChecked] =
		useState(true);
	const [isEnochPrattLibraryChecked, setIsEnochPrattLibraryChecked] =
		useState(true);
	const [isBaltimoreBeatChecked, setIsBaltimoreBeatChecked] = useState(true);

	return (
		<EventContext.Provider
			value={{
				filteredEvents,
				isBaltimoreBeatChecked,
				isBaltimoreMagazineChecked,
				isBaltimoreShowplaceChecked,
				isEnochPrattLibraryChecked,
				setIsBaltimoreBeatChecked,
				setFilteredEvents,
				setIsBaltimoreMagazineChecked,
				setIsBaltimoreShowplaceChecked,
				setIsEnochPrattLibraryChecked
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
