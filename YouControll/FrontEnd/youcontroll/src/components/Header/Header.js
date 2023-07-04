import React from "react";
import {
	Row, Col, Label, 
	Container,
	Alert,
} from "reactstrap";
import { BiUserCircle, BiExit } from "react-icons/bi";
import logoImage from "../../resources/referencia.png";
import { useState } from "react";
import MenuHeaderCanvas from "../OffCanvas/MenuHeaderCanvas";

// eslint-disable-next-line react/prop-types
const Header = ({ height }) => {



	

	const [isOpen, setIsOpen] = useState(false);

	
	const toggleOffcanvas = () => {
		setIsOpen((prevState) => !prevState);
	};
	
	const[ sucessCliente, setSucessCliente] = useState(false);
	const onDismissSaveCliente = () => { setSucessCliente(!setSucessCliente); };

	const[ sucessVenda, setSucessVenda] = useState(false);
	const onDismissSaveVenda = () => { setSucessVenda(!setSucessVenda); };

	const handleSave = (save) => {
		if( save === "cliente"){
			setSucessCliente(true);
			setIsOpen((prevState) => !prevState);
		}else if(save === "venda"){
			setSucessVenda(true);
			setIsOpen((prevState) => !prevState);
		}
	};

	

	return (
		<Container style={{  height: height }} className="bg-primary">
			<Row style={{ height: "100%" }}>
				<Col style={{ display: "flex", alignItems: "center" }}>
					
					<img
						onClick={toggleOffcanvas}
						style={{ height: "70%", width: "10%", cursor: "pointer" }}
						src={logoImage}
						alt="Logo"
					/>

				</Col>
				<Col style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 40 }}>
					<BiUserCircle color="white" size={40} style={{ marginRight: "10px" }} />
					<div style={{ display: "flex", flexDirection: "column" }}>
						<Label style={{ fontSize: "20px", color: "white" }}>Lohran Cintra</Label>
						<Label style={{ fontSize: "12px", color: "white" }}>Desenvolvedor</Label>
					</div>
					<BiExit color="white" size={40} style={{ marginLeft: "10px" }} />
				</Col>
			</Row>

			{isOpen && <MenuHeaderCanvas handleClose={toggleOffcanvas} open={isOpen}  SaveClienteSucess={handleSave}/>}
			{sucessCliente && <Alert isOpen={sucessCliente} style={{margin: 10}} toggle={onDismissSaveCliente}>
                        Cliente cadastrado com sucesso!
			</Alert>}
			{sucessVenda && <Alert isOpen={sucessVenda} style={{margin: 10}} toggle={onDismissSaveVenda}>
                        Venda cadastrada com sucesso!
			</Alert>}
		</Container>
	);
};

export default Header;
