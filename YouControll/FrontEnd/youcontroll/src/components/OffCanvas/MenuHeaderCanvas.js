/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { AccordionBody, AccordionHeader,NavLink, AccordionItem, Card, Collapse, Nav, NavItem,  NavbarToggler, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, UncontrolledAccordion } from "reactstrap";
import React, { useEffect, useState } from "react";
import CadastarClienteModal from "../Modals/CadastrarClienteModal";
import CadastrarVendaModal from "../Modals/CadastrarVendaModal";

// eslint-disable-next-line no-unused-vars
const MenuHeaderCanvas = ({open, handleClose, SaveClienteSucess, SaveVendaSucess}) => {

	
	const [cadastrarCliente, setCadastrarCliente] = useState(false);
    
	const handleSucessCliente = ()  =>{
		SaveClienteSucess("cliente");
	};
	const handleCadastrarCliente = () =>{
		setCadastrarCliente(!cadastrarCliente);
	};

	const [cadastrarVenda, setCadastrarVenda] = useState(false);
    
	const handleSucessVenda = ()  =>{
		SaveClienteSucess("venda");
	};
	const handleCadastrarVenda = () =>{
		setCadastrarVenda(!cadastrarVenda);
	};
    
	const [OffCanvas, setOffcanvas] = useState(false);
    
	useEffect(() => {
		setOffcanvas(open);
	});

	const toggle = () => {
		setOffcanvas(!OffCanvas);
		handleClose(OffCanvas);
	};


	return(
		<Offcanvas isOpen={Offcanvas}  color="primary" toggle={toggle} style={{backgroundColor: "#0d6efd", color: "white"}} >
			<OffcanvasHeader toggle={toggle}>Menu Principal</OffcanvasHeader>
			<OffcanvasBody>
				
				
				<Row style={{marginBottom: 30}}>
					<UncontrolledAccordion  stayOpen>
						<AccordionItem>

							<AccordionHeader targetId="1">
                                        Gestão de Clientes
							</AccordionHeader>
							<AccordionBody accordionId="1">
								<Nav fill
									pills
									vertical>
									
					
									<NavItem style={{ marginBottom: 30}} >
										<NavLink active href="/clientes" style={{color: "white" }}>Lista de Clientes</NavLink>
									</NavItem>
									<NavItem >
										<NavLink active onClick={handleCadastrarCliente} style={{color: "white", cursor: "pointer"}}>Cadastrar Cliente</NavLink>
									</NavItem>
								</Nav>
							</AccordionBody>
						</AccordionItem>
					</UncontrolledAccordion>
				</Row>
				<Row style={{marginBottom: 30}}>
					<UncontrolledAccordion  stayOpen>
						<AccordionItem>

							<AccordionHeader targetId="1">
                                        Gestão de Vendas
							</AccordionHeader>
							<AccordionBody accordionId="1">
								<Nav fill
									pills
									vertical>
									
					
									<NavItem style={{ marginBottom: 30}} >
										<NavLink active href="/vendas" style={{color: "white" }}>Lista de vendas</NavLink>
									</NavItem>
									<NavItem >
										<NavLink active onClick={handleCadastrarVenda} style={{color: "white", cursor: "pointer"}}>Cadastrar venda</NavLink>
									</NavItem>
								</Nav>
							</AccordionBody>
						</AccordionItem>
					</UncontrolledAccordion>
				</Row >

				<Row style={{marginBottom: 30}}>
					<UncontrolledAccordion  stayOpen>
						<AccordionItem>

							<AccordionHeader targetId="1">
                                        Relatórios
							</AccordionHeader>
							<AccordionBody accordionId="1">
								<Nav fill
									pills
									vertical>
									
					
									<NavItem  >
										<NavLink active href="/vendas" style={{color: "white" }}>Relatórios</NavLink>
									</NavItem>
									
								</Nav>
							</AccordionBody>
						</AccordionItem>
					</UncontrolledAccordion>
				</Row >
				

				

				
	
			</OffcanvasBody>
			{cadastrarCliente && <CadastarClienteModal Sucess={handleSucessCliente} onChangeState={handleCadastrarCliente} state={cadastrarCliente}/>}
			{cadastrarVenda && <CadastrarVendaModal Sucess={handleSucessVenda} onChangeState={handleCadastrarVenda} state={cadastrarVenda}/>}
		</Offcanvas>
	);
};

export default MenuHeaderCanvas;