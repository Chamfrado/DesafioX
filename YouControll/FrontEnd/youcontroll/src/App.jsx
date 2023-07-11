/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "react-datepicker/dist/react-datepicker.css";

import ClienteView from "./view/ClienteView";
import VendaView from "./view/VendaView";
import RelatorioView from "./view/RelatorioView";
import LoginView from "./view/LoginView";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = () => {
		// Perform authentication logic here (e.g., check credentials)
		// Set isAuthenticated state accordingly
		setIsAuthenticated(!isAuthenticated);
	};

	const ProtectedRoute = ({ element: Element }) => {
		if (!isAuthenticated) {
			// If not authenticated, redirect to login
			return <Navigate to="/login" />;
		}

		// Render the protected component
		return <Element handleLogin={handleLogin} />;
	};

	return (
		<div>
			<Routes>
				<Route path="/login" element={<LoginView handleLogin={handleLogin} />} />
				<Route
					path="/"
					element={
						isAuthenticated ? (
							<Navigate to="/protected" />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route path="/protected" element={<ProtectedRoute element={ClienteView} />} />
				<Route path="/clientes/*" element={<ProtectedRoute element={ClienteView} />} />
				<Route path="/vendas/*" element={<ProtectedRoute element={VendaView} />} />
				<Route path="/relatorio/*" element={<ProtectedRoute element={RelatorioView} />} />
			</Routes>
		</div>
	);
}

export default App;
