/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import YCapi from "../../services/YouControllApi";
import MapClienteCadastro from "../Maps/MapaClienteCadastro";


const AtualizarClienteModal = ({ClienteId}) => {
	//Inicialização do Form de Atualização
	const [updateForm,setUpdateForm] = useState({
		id: "",
		nome: "",
		cnpj: "",
		telefone: "",
		uf: "",
		email: "",
		logradouro: "",
		bairro: "",
		cidade: "",
		lat: "",
		lng: ""
	});


	//Atualizando Cliente Selecionado
	useEffect(() =>{
		if(ClienteId != -1)
			YCapi.get("/clientes/" + ClienteId)
				.then(({data}) => {
					const {id, nome, cnpj, email, telefone, uf, lat, lng} = data;
					setUpdateForm((prevForm) => ({
						...prevForm,
						id: id,
						nome: nome,
						cnpj: cnpj,
						email: email,
						telefone: telefone,
						uf: uf,
						lat: lat,
						lng: lng

					}));
					alert(JSON.stringify(data));
					setModal(!modal);
				});
		
	},[ClienteId]);

	//Funções de controle do Modal
	const [modal, setModal] = useState(false);
	const toggle = () =>{
		setModal(!modal);
	};


	const handleChangeLocation = (location) => {
		setUpdateForm((prevFormData) => ({
			...prevFormData,
			logradouro: location.logradouro,
			lat: location.lat,
			lng: location.lng,
			cep: location.cep,
			cidade: location.cidade,
			bairro: location.bairro,
			uf: location.uf

		}));
	}; 

	const handleDismiss = () =>{
		setUpdateForm({
			id: "",
			nome: "",
			cnpj: "",
			telefone: "",
			uf: "",
			email: "",
			logradouro: "",
			bairro: "",
			cidade: "",
			lat: 0,
			lng: 0
		});
	};
	return(
		<Modal isOpen={modal} toggle={toggle} >
			<ModalHeader toggle={toggle} close={toggle} onClosed={handleDismiss}>Cadastrar Cliente</ModalHeader>
			<ModalBody>
				<Button onClick={() => alert(JSON.stringify(updateForm))}>teste</Button>
				<Row>
					<Col>
						<MapClienteCadastro endereco={updateForm} onChangeLocation={handleChangeLocation} startLocation={{"lat": updateForm.lat, "lng": updateForm.lng}}/>
					</Col>
				</Row>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={toggle}>
            Do Something
				</Button>{" "}
				<Button color="secondary" onClick={toggle}>
            Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default AtualizarClienteModal;