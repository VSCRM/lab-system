import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AppShell from "@/components/layout/AppShell";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import HomePage from "@/pages/HomePage";
import LabPage from "@/pages/LabPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
	return (
		<ErrorBoundary>
			<BrowserRouter basename="/Lab-system">
				<AppShell>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/lab/:slug" element={<LabPage />} />
						<Route path="/404" element={<NotFoundPage />} />
						<Route path="*" element={<Navigate to="/404" replace />} />
					</Routes>
				</AppShell>
			</BrowserRouter>
		</ErrorBoundary>
	);
}
