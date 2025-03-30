import { Dispatch, SetStateAction } from "react";
import { Event } from "./Event";

export type EventContextType = {
	filteredEvents: Event[];
	isBaltimoreBeatChecked: boolean;
	isBaltimoreMagazineChecked: boolean;
	isBaltimoreShowplaceChecked: boolean;
	isBmoreAgendaChecked: boolean;
	isBmoreArtChecked: boolean;
	isEnochPrattLibraryChecked: boolean;
	setFilteredEvents: Dispatch<SetStateAction<Event[]>>;
	setIsBaltimoreBeatChecked: Dispatch<SetStateAction<boolean>>;
	setIsBaltimoreMagazineChecked: Dispatch<SetStateAction<boolean>>;
	setIsBaltimoreShowplaceChecked: Dispatch<SetStateAction<boolean>>;
	setIsBmoreAgendaChecked: Dispatch<SetStateAction<boolean>>;
	setIsBmoreArtChecked: Dispatch<SetStateAction<boolean>>;
	setIsEnochPrattLibraryChecked: Dispatch<SetStateAction<boolean>>;
	setSortSetting: Dispatch<SetStateAction<string>>;
	sortSetting: string;
};
