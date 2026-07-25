import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initErrorMonitoring } from "@/lib/monitoring";
import "@/i18n";
import "./index.css";

void initErrorMonitoring();

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element #root was not found in index.html");
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
