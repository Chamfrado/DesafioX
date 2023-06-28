/* eslint-disable react/prop-types */
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import YCapi from "../../services/YouControllApi";



const DeletarClienteModal = ({ Cliente, Sucess }) => {

	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
	};


	const handleConfirmar = () => {
		Delete();
	};

	const Delete = () => {
		const url = "/clientes/delete/" + Cliente.id;
		YCapi.delete(url)
			.then(() => {
				Sucess();
				setModal(!modal);
			})
			.catch((error) => {
				alert(error);
			});

	};


	useEffect(() => {
		if (Cliente.id !== -1) {
			setModal(!modal);

		}
	}, [Cliente.id]);
	return (
		<Modal isOpen={modal} fluid toggle={toggle}>
			<ModalHeader style={{ backgroundColor: "#dc3545", color: "#fff" }}>Deletar Cliente </ModalHeader>
			<ModalBody>
				<Row >
					<Label size="lg">Tem Certeza que deseja excluir o Cliente:  </Label>
				</Row>
				<Row style={{ alignContent: "center", flex: 1 }}>
					<Label size="lg">{Cliente.nome}</Label>
				</Row>

			</ModalBody>
			<ModalFooter>
				<Button onClick={toggle} >Cancelar</Button>
				<Button onClick={handleConfirmar} color="danger">Confirmar</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DeletarClienteModal;