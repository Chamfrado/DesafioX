
import axios from 'axios';
import { MapContainer, TileLayer,  Marker, } from 'react-leaflet';
import { Container, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import shopIcon from '../resources/shop.png'; // Import the icon image directly

import L from 'leaflet';

function Map() {
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState()

  const markerRef = useRef(null)
  const mapRef = useRef(); // Define the mapRef using useRef


  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng());
          handleRequest();
        }
      },
    }),
    [],
  )

  //LAT:-22.24268403312832     LONG:-45.71109108063319
  //LAT:-22.24268403312832     LONG:-45.71109108063319


  const handleMarkerDragEnd = (event) => {
    const marker = event.target;
    const markerPosition = marker.getLatLng();
  
    setPosition(markerPosition);
  };

  const handleRequest = async () => {
    
    try {
      
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          position.lat
        )}%2C+${encodeURIComponent(position.lng)}&key=d8b4eb08039043f4acb5f58f7f99f752&pretty=1`
      );
      alert(response.data.results[0].formatted);
    } catch (error) {
      alert(error);
    }
  };


  const shopMarker = L.icon({
    iconUrl: shopIcon,
    iconSize: [32, 32], // set the size of the icon
    iconAnchor: [16, 32], // set the anchor point, usually half the size of the icon
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const address = `${houseNumber} ${street}, ${city}, ${state}, ${postalCode}`;

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=d8b4eb08039043f4acb5f58f7f99f752&pretty=1`
      );

      setPosition(response.data.results[0].geometry);
      mapRef.current.setView(position)

    } catch (error) {
      alert(error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      toggleDraggable();
    }
  };



  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  useEffect(() => {
  if (position) {
    handleRequest();
  }
}, [position]);
  
  useEffect(() => {
    if (position) {
      // Center the map on the marker's position
      const { lat, lng } = position;
      mapRef.current.setView([lat, lng]);
    }
  }, [position?.lat, position?.lng]); 

  return (
    <Container>
      <Card>
        <CardBody>
          <MapContainer ref={mapRef} center={[-15.7801, -47.9292]} zoom={15} style={{ height: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {position && <Marker draggable={draggable} 
              eventHandlers={{ dragend: handleMarkerDragEnd }} ref={markerRef} position={position} icon={shopMarker} >
                
              </Marker>}

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
          <Button onClick={() => { alert(position) }} >UltimateTest</Button>
          <Input  type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          {' '}
          <Label check>
            Marcar localização no mapa?
          </Label>
        </CardBody>
      </Card>
    </Container>
  );
}
//LatLng(-22.242585, -45.710946)
//LatLng(-22.242888, -45.709825)
//LatLng(-22.2425, -45.7085)

export default Map;
