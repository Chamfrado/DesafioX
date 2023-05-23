import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import YCapi from '../../services/YouControllApi';
import shopIcon from '../../resources/shop.png'; 
import {Card, Label, Row} from 'reactstrap'


import L from 'leaflet';


const MapComponent = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const shopMarker = L.icon({
    iconUrl: shopIcon,
    iconSize: [32, 32], // set the size of the icon
    iconAnchor: [16, 32], // set the anchor point, usually half the size of the icon
  });




  useEffect(() => {
    fetchClienteData();
  }, []);

  const handleMarkerClick = (client) => {
    setSelectedClient(client);
  };

  const fetchClienteData = () => {
    YCapi.get('clientes')
      .then(({ data }) => {
        setClients(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };



  const formatCnpj = (value) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');

    // Apply the formatting mask
    const cnpj = digitsOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

    return cnpj;
};




  const parseLocation = (locationString) => {
    const coordinates = locationString.substring(1, locationString.length - 1).split(',');
    const lat = parseFloat(coordinates[0].trim());
    const lng = parseFloat(coordinates[1].trim());
    return { lat, lng };
  };


  return (
    <div>
      <MapContainer center={[-15.7801, -47.9292]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {clients.map((client, index) => {
          if (client.localizacao) {
            const { lat, lng } = parseLocation(client.localizacao);
            return (
              <Marker
              icon={shopMarker}
                key={index}
                position={[lat,lng]}
                onClick={() => handleMarkerClick(client)}
              >
                <Popup >
                        <Row>
                        <Label>Nome: </Label> 
                        <Label>{client.nome}</Label>
                        </Row>
                        <Row>
                        <Label>CNPJ: </Label> 
                        <Label>{formatCnpj(client.cnpj) }</Label>
                        </Row>
                    
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
      {selectedClient && (
        <div>
          <h3>Selected Client:</h3>
          <p>Name: {selectedClient.nome}</p>
          <p>CNPJ: {selectedClient.cnpj}</p>
          <p>Email: {selectedClient.email}</p>
          <p>Phone: {selectedClient.telefone}</p>
          <p>State: {selectedClient.uf}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
