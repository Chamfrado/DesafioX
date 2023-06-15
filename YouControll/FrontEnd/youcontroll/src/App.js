import './App.css';
import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // If using webpack


import HomeView from "./view/HomeView"
import ClienteView from "./view/ClienteView"
import VendaView from './view/VendaView';

function App() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/clientes" element={<ClienteView/>}/>
        <Route path='/vendas' element={<VendaView/>}/>
        </Routes>
    </div>
  );
}

export default App;
