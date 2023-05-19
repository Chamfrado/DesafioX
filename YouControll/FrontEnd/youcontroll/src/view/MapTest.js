
import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import shopIcon from '../resources/shop.png'; // Import the icon image directly

import L from 'leaflet';

function Map() {
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const position = [-22.238752362746666,-45.70767076988293]

  const shopMarker = L.icon({
    iconUrl: shopIcon,
    iconSize: [32, 32], // set the size of the icon
    iconAnchor: [16, 32], // set the anchor point, usually half the size of the icon
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const address = `${houseNumber} ${street}, ${city}, ${state}, ${postalCode}`;
    alert(address);

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=d8b4eb08039043f4acb5f58f7f99f752&pretty=1`
      );

      const { lat, lng } = response.data.results[0].geometry;
      setLatitude(lat);
      setLongitude(lng);
      alert(response.data.results[0].formatted);
    } catch (error) {
      alert(error);
    }
  };

  
  return (
    <Container>
      <Card>
        <CardBody>
          <MapContainer center={[-15.7801, -47.9292]} zoom={5} style={{ height: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {latitude && longitude && <Marker position={[latitude, longitude]} icon={shopMarker} />}

          </MapContainer>

          <Form onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label for="street">Rua</Label>
              <Input
                type="text"
                name="street"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="houseNumber">Número da Casa</Label>
              <Input
                type="text"
                name="houseNumber"
                id="houseNumber"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">Cidade</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="state">Estado</Label>
              <Input
                type="text"
                name="state"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="postalCode">CEP</Label>
              <Input
                type="text"
                name="postalCode"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">Localizar</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Map;
