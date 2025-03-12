import { createContext, ReactNode, useContext, useState } from "react";
import { PreferencesContextType } from "../types/PreferencesContextType";

const PreferencesContext = createContext<PreferencesContextType | undefined>(
	undefined
);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
	const [useFahrenheit, setUseFahrenheit] = useState(true);

	return (
		<PreferencesContext.Provider
			value={{ setUseFahrenheit, useFahrenheit }}
		>
			{children}
		</PreferencesContext.Provider>
	);
};

export const usePreferencesContext = () => {
	const context = useContext(PreferencesContext);

	if (!context) {
		throw new Error(
			"usePreferencesContext must be used within a EventProvider"
		);
	}

	return context;
};
