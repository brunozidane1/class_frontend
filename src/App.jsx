import { BrowserRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";
import DepartmentFormPage from "./pages/DepartmentFormPage";
import DepartmentTablePage from "./pages/DepartmentTablePage";
import DepartmentUpdatePage from "./pages/DepartmentUpdatePage";

function AppLayout() {
	return (
		<main className="page">
			<nav className="tabs">
				<NavLink to="/form" className={({ isActive }) => (isActive ? "tab-link active" : "tab-link")}>
					Form Page
				</NavLink>
				<NavLink to="/table" className={({ isActive }) => (isActive ? "tab-link active" : "tab-link")}>
					Table Page
				</NavLink>
			</nav>

			<Routes>
				<Route path="/" element={<Navigate to="/form" replace />} />
				<Route path="/form" element={<DepartmentFormPage />} />
				<Route path="/update/:id" element={<DepartmentUpdatePage />} />
				<Route path="/table" element={<DepartmentTablePage />} />
			</Routes>
		</main>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AppLayout />
		</BrowserRouter>
	);
}
