import './App.css';
import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // If using webpack


import TableView from "./view/TableView"
import HomeView from "./view/HomeView"
import TestView from "./view/TestView"
import MapView from "./view/MapTest"

function App() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/table" element={<TableView />} />
        <Route path="/test" element={<TestView/>}/>
        <Route path='/map' element={<MapView/>}/>
        </Routes>
    </div>
  );
}

export default App;
