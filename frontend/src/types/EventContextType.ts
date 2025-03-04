import { Dispatch, SetStateAction } from "react";
import { Event } from "./Event";

export type EventContextType = {
    filteredEvents: Event[];
    isBaltimoreMagazineChecked: boolean;
    isBaltimoreShowplaceChecked: boolean;
    isEnochPrattLibraryChecked: boolean;
    setFilteredEvents: Dispatch<SetStateAction<Event[]>>;
    setIsBaltimoreMagazineChecked: Dispatch<SetStateAction<boolean>>;
    setIsBaltimoreShowplaceChecked: Dispatch<SetStateAction<boolean>>;
    setIsEnochPrattLibraryChecked: Dispatch<SetStateAction<boolean>>;
};