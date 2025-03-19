import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from "react";
import { PreferencesContextType } from "../types/PreferencesContextType";

const PreferencesContext = createContext<PreferencesContextType | undefined>(
	undefined
);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
	const [useFahrenheit, setUseFahrenheit] = useState(true);
	const [use12Hours, setUse12Hours] = useState(true);

	useEffect(() => {
		const saved12Hours = localStorage.getItem("use12Hours");
		const savedFahrenheit = localStorage.getItem("useFahrenheit");

		saved12Hours && setUse12Hours(saved12Hours === "true");
		savedFahrenheit && setUseFahrenheit(savedFahrenheit === "true");
	}, []);

	useEffect(() => {
		localStorage.setItem("use12Hours", use12Hours.toString());
		localStorage.setItem("useFahrenheit", useFahrenheit.toString());
	}, [use12Hours, useFahrenheit]);

	return (
		<PreferencesContext.Provider
			value={{
				setUse12Hours,
				setUseFahrenheit,
				use12Hours,
				useFahrenheit
			}}
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
