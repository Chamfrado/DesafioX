
import { Route, Routes } from "react-router-dom";
import {React} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // If using webpack
import "react-datepicker/dist/react-datepicker.css";


import HomeView from "./view/HomeView";
import ClienteView from "./view/ClienteView";
import VendaView from "./view/VendaView";
import RelatorioView from "./view/RelatorioView";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomeView />} />
				<Route path="/clientes" element={<ClienteView/>}/>
				<Route path='/vendas' element={<VendaView/>}/>
				<Route path="/relatorio" element={<RelatorioView/>}/>
			</Routes>
		</div>
	);
}

export default App;
