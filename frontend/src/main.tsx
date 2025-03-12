import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { EventProvider } from "./contexts/EventContext.tsx";
import { PreferencesProvider } from "./contexts/PreferencesContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<EventProvider>
			<PreferencesProvider>
				<App />
			</PreferencesProvider>
		</EventProvider>
	</StrictMode>
);
