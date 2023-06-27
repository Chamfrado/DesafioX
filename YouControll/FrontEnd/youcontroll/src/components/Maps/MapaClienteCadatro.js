import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import shopIcon from '../../resources/shop.png';
import { Container, Label, Row, Input, Col, Button, FormGroup } from 'reactstrap'
import axios from "axios"


import L from 'leaflet';


const MapClienteCadastro = ({ endereco , onchangeTeste}) => {

    const [isChecked, setIsChecked] = useState(false);

    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState()

    const markerRef = useRef(null)
    const mapRef = useRef(); // Define the mapRef using useRef



    const handleLocalizar = async (e) => {
        e.preventDefault();

        const address = ` ${endereco.logradouro} ${endereco.complemento} , ${endereco.bairro}, ${endereco.cidade}, ${endereco.cep}`;

        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    address
                )}&key=d8b4eb08039043f4acb5f58f7f99f752&pretty=1`
            );

            setPosition(response.data.results[0].geometry);
            alert(JSON.stringify(position));
            mapRef.current.setView(position)

        } catch (error) {

        }
    };

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
            const { lat, lng } = position;
            alert(response.data.results[0].formatted);
            onchangeTeste(lat)
            //onChangeCoordenadas({
            //    lat: lat,
            //    lng: lng,
            //    logradouro: response.data.results[0].components.road,
            //    cep: response.data.results[0].components.postcode,
            //    cidade: response.data.results[0].components.town,
            //    bairro: response.results[0].components.suburb,
            //    uf: response.data.results[0].components.state_code
            //});
        } catch (error) {

        }
    };


    const shopMarker = L.icon({
        iconUrl: shopIcon,
        iconSize: [32, 32], // set the size of the icon
        iconAnchor: [16, 32], // set the anchor point, usually half the size of the icon
    });

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
            const { lat, lng } = position;
            mapRef.current.setView([lat, lng]);
        }
    }, [position?.lat, position?.lng]);



    return (
        <Container>
            <Row style={{ paddingBottom: 10 }}>
                <Col className='d-flex align-items-center justify-content-center'>
                    <Button color='primary' onClick={handleLocalizar}>Localizar</Button>
                </Col>
            </Row>
            <Row>
                <MapContainer ref={mapRef} center={[-15.7801, -47.9292]} zoom={15} style={{ height: '250px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {position && <Marker draggable={draggable}
                        eventHandlers={{ dragend: handleMarkerDragEnd }} ref={markerRef} position={position} icon={shopMarker} >

                    </Marker>}

                </MapContainer>

            </Row>
            <Row >
                <FormGroup switch>
                    <Input type="switch" checked={isChecked} name='radio' onClick={handleCheckboxChange} />
                    {' '}
                    <Label check>
                        Ajustar Localizacao no mapa?
                    </Label>
                </FormGroup>

            </Row>

        </Container>

    );
};

export default MapClienteCadastro;
