import { Dispatch, SetStateAction } from "react";

export type PreferencesContextType = {
	setUse12Hours: Dispatch<SetStateAction<boolean>>;
	setUseFahrenheit: Dispatch<SetStateAction<boolean>>;
	use12Hours: boolean;
	useFahrenheit: boolean;
};
