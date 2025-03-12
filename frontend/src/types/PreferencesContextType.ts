import { Dispatch, SetStateAction } from "react";

export type PreferencesContextType = {
	setUseFahrenheit: Dispatch<SetStateAction<boolean>>;
	useFahrenheit: boolean;
};
