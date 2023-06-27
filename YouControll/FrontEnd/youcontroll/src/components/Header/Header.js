import React from "react";
import {
	Row, Col, Label, Offcanvas, Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem, OffcanvasBody, OffcanvasHeader, NavLink
} from "reactstrap";
import { BiUserCircle, BiExit } from "react-icons/bi";
import logoImage from "../../resources/referencia.png";
import { useState } from "react";


// eslint-disable-next-line react/prop-types
const Header = ({ height }) => {

	const [isOpen, setIsOpen] = useState(false);
	const [collapsedClientes, setCollapsedClientes] = useState(true);
	const [collapsedVendas, setCollapsedVendas] = useState(true);


	const toggleOffcanvas = () => {
		setIsOpen((prevState) => !prevState);
	};
    

   
  
	const toggleNavbarClientes = () => {
		setCollapsedClientes((prevState) => !prevState);
		setCollapsedVendas(true);
	};
  
	const toggleNavbarVendas = () => {
		setCollapsedVendas((prevState) => !prevState);
		setCollapsedClientes(true);
	};

    
	return (
		<div style={{ backgroundColor: "#0a58ca", height: height }}>
			<Row style={{ height: "100%" }}>
				<Col style={{ display: "flex", alignItems: "center" }}>
					<div style={{ display: "flex", alignItems: "center", height: "100%" }}>
						<img onClick={toggleOffcanvas} style={{ maxWidth: "70%", maxHeight: "70%" }} src={logoImage} alt="Logo" />
					</div>
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
			<div>

				<Offcanvas style={{ backgroundColor: "#0a58ca", color: "white" }} isOpen={isOpen} toggle={toggleOffcanvas}>
					<OffcanvasHeader toggle={toggleOffcanvas}></OffcanvasHeader>
					<OffcanvasBody>
						<Navbar dark light>
                            
							<NavbarToggler style={{borderWidth:"0", color:"white"}} onClick={toggleNavbarClientes}>GESTÃO DE CLIENTES</NavbarToggler>
							<Collapse isOpen={!collapsedClientes} navbar>
								<Nav navbar>
									<NavItem>
										<NavLink href="/clientes">Lista de clientes</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="/home">
                                            Cadastrar cliente
										</NavLink>
									</NavItem>
								</Nav>
							</Collapse>
							<NavbarToggler style={{borderWidth:"0", color:"white", marginTop:50}} onClick={toggleNavbarVendas}>GESTÃO DE VENDAS</NavbarToggler>
							<Collapse isOpen={!collapsedVendas} navbar>
								<Nav navbar>
									<NavItem>
										<NavLink href="/vendas">Lista de vendas</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="/home">
                                            Cadastrar venda
										</NavLink>
									</NavItem>
								</Nav>
							</Collapse>
						</Navbar>
					</OffcanvasBody>
				</Offcanvas>
			</div>
		</div>
	);
};

export default Header;
