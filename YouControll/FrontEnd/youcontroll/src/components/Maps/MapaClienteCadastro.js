/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import shopIcon from "../../resources/shop.png";
import { Container, Label, Row, Input, Col, Button, FormGroup } from "reactstrap";
import axios from "axios";


import L from "leaflet";


// eslint-disable-next-line react/prop-types
const MapClienteCadastro = ({ endereco, onChangeLocation, startLocation }) => {

	const [isChecked, setIsChecked] = useState(false);

	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState();

	const markerRef = useRef(null);
	const mapRef = useRef(); // Define the mapRef using useRef


	useEffect(() => {
		if(startLocation != undefined){
			setPosition(startLocation);
			handleRequest();

		}
	},[startLocation]); 


	const handleLocalizar = async () => {

		
		
		// eslint-disable-next-line react/prop-types
		const address = ` ${endereco.logradouro} , ${endereco.bairro}, ${endereco.cidade}, ${endereco.cep}`;
		alert(address);
		try {
			const response = await axios.get(
				`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
					address
				)}&key=d8b4eb08039043f4acb5f58f7f99f752&pretty=1`
			);
			const response1 = response;
			alert("teste");
			alert(response1);
			//setPosition(response.data.results[0].geometry);
			//alert(JSON.stringify(position));
			//mapRef.current.setView(position);

		} catch (error) {
			alert("Coloque um endereço válido!");
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
			onChangeLocation({
				lat: response.data.results[0].geometry.lat,
			    lng: response.data.results[0].geometry.lng,
				logradouro: response.data.results[0].components.road,
				cep: response.data.results[0].components.postcode,
				cidade: response.data.results[0].components.town,
				bairro: response.data.results[0].components.suburb,
				uf: response.data.results[0].components.state_code
			    
			});
		} catch (error) {
			console.log(error);
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
		setDraggable((d) => !d);
	}, []);

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
				<MapContainer ref={mapRef} center={[-15.7801, -47.9292]} zoom={15} style={{ height: "250px", width: "100%" }}>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

					{position && <Marker draggable={draggable}
						eventHandlers={{ dragend: handleMarkerDragEnd }} ref={markerRef} position={position} icon={shopMarker} >

					</Marker>}

				</MapContainer>

			</Row>
			<Row >
				<FormGroup switch>
					<Input type="switch" checked={isChecked} name='radio' onClick={handleCheckboxChange} />
					{" "}
					<Label check>
                        Ajustar Localizacao no mapa?
					</Label>
				</FormGroup>

			</Row>

		</Container>

	);
};

export default MapClienteCadastro;
