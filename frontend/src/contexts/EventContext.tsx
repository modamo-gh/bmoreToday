import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState
} from "react";

type EventContextType = {
	isBaltimoreMagazineChecked: boolean;
	isBaltimoreShowplaceChecked: boolean;
	isEnochPrattLibraryChecked: boolean;
	setIsBaltimoreMagazineChecked: Dispatch<SetStateAction<boolean>>;
	setIsBaltimoreShowplaceChecked: Dispatch<SetStateAction<boolean>>;
	setIsEnochPrattLibraryChecked: Dispatch<SetStateAction<boolean>>;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
	const [isBaltimoreMagazineChecked, setIsBaltimoreMagazineChecked] =
		useState(true);
	const [isBaltimoreShowplaceChecked, setIsBaltimoreShowplaceChecked] =
		useState(true);
	const [isEnochPrattLibraryChecked, setIsEnochPrattLibraryChecked] =
		useState(true);

	return (
		<EventContext.Provider
			value={{
				isBaltimoreMagazineChecked,
				isBaltimoreShowplaceChecked,
				isEnochPrattLibraryChecked,
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
