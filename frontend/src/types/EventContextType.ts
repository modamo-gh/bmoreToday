import { Dispatch, SetStateAction } from "react";
import { Event } from "./Event";

export type EventContextType = {
	filteredEvents: Event[];
	isBaltimoreBeatChecked: boolean;
	isBaltimoreMagazineChecked: boolean;
	isBaltimoreShowplaceChecked: boolean;
	isEnochPrattLibraryChecked: boolean;
	setFilteredEvents: Dispatch<SetStateAction<Event[]>>;
	setIsBaltimoreBeatChecked: Dispatch<SetStateAction<boolean>>;
	setIsBaltimoreMagazineChecked: Dispatch<SetStateAction<boolean>>;
	setIsBaltimoreShowplaceChecked: Dispatch<SetStateAction<boolean>>;
	setIsEnochPrattLibraryChecked: Dispatch<SetStateAction<boolean>>;
};
