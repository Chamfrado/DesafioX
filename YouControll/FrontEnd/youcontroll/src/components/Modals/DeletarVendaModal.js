/* eslint-disable react/prop-types */
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import YCapi from "../../services/YouControllApi";



const DeletarVendaModal = ({ VendaId , Sucess }) => {

	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
	};

	const handleConfirmar = () => {
		Delete();
	};

	const Delete = () => {
		const url = "/vendas/delete/" + VendaId;
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
		if (VendaId !== -1) {
			setModal(!modal);
		}
	}, [VendaId]);
	return (
		<Modal isOpen={modal} size="lg" fluid toggle={toggle}>
			<ModalHeader style={{ backgroundColor: "#dc3545", color: "#fff" }}>Deletar Venda </ModalHeader>
			<ModalBody>
				<Row >
					<Label size="lg">Tem Certeza que deseja excluir esta venda? Esta ação e irreversível.  </Label>
				</Row>
			</ModalBody>
			<ModalFooter>
				<Button onClick={toggle} >Cancelar</Button>
				<Button onClick={handleConfirmar} color="danger">Confirmar</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DeletarVendaModal;