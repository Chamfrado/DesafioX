import { Link } from "react-router-dom";
import { AccordionBody, AccordionHeader, AccordionItem, Nav, NavItem, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, UncontrolledAccordion } from "reactstrap";
import React, { useEffect, useState } from "react";
import CadastarClienteModal from "../Modals/CadastrarClienteModal";
import CadastrarVendaModal from "../Modals/CadastrarVendaModal";
import PropTypes from "prop-types";

const MenuHeaderCanvas = ({ open, handleClose, SaveSucess }) => {
	const [cadastrarCliente, setCadastrarCliente] = useState(false);

	const handleSucessCliente = () => {
		SaveSucess("cliente");
	};

	const handleCadastrarCliente = () => {
		setCadastrarCliente(!cadastrarCliente);
	};

	const [cadastrarVenda, setCadastrarVenda] = useState(false);

	const handleSucessVenda = () => {
		SaveSucess("venda");
	};

	const handleCadastrarVenda = () => {
		setCadastrarVenda(!cadastrarVenda);
	};

	const [OffCanvas, setOffcanvas] = useState(false);

	useEffect(() => {
		setOffcanvas(open);
	}, [open]);

	const toggle = () => {
		setOffcanvas(!OffCanvas);
		handleClose(OffCanvas);
	};

	return (
		<Offcanvas isOpen={Offcanvas} color="primary" id="menuHeaderCanvas" toggle={toggle} className="bg-primary" style={{ color: "white" }}>
			<OffcanvasHeader toggle={toggle}>Menu Principal</OffcanvasHeader>
			<OffcanvasBody>
				<Row style={{ marginBottom: 30 }}>
					<UncontrolledAccordion stayOpen>
						<AccordionItem>
							<AccordionHeader targetId="1">Gestão de Clientes</AccordionHeader>
							<AccordionBody accordionId="1">
								<Nav fill pills vertical>
									<NavItem style={{ marginBottom: 30 }}>
										<Link 
											className="nav-link nav-link-active bg-primary"  style={{color: "white" }}  to="/clientes">Lista de Clientes</Link>
									</NavItem>
									<NavItem>
										<Link className="nav-link nav-link-active bg-primary"  style={{color: "white" }} to="/clientes/add" onClick={handleCadastrarCliente}>
                      Cadastrar Cliente
										</Link>
									</NavItem>
								</Nav>
							</AccordionBody>
						</AccordionItem>
					</UncontrolledAccordion>
				</Row>
				<Row style={{ marginBottom: 30 }}>
					<UncontrolledAccordion stayOpen>
						<AccordionItem>
							<AccordionHeader targetId="2">Gestão de Vendas</AccordionHeader>
							<AccordionBody accordionId="2">
								<Nav fill pills vertical>
									<NavItem style={{ marginBottom: 30 }}>
										<Link className="nav-link nav-link-active bg-primary"  style={{color: "white" }} to="/vendas">Lista de Vendas</Link>
									</NavItem>
									<NavItem>
										<Link className="nav-link nav-link-active bg-primary"  style={{color: "white" }} to="/vendas/add"  onClick={handleCadastrarVenda}>
                      Cadastrar Venda
										</Link>
									</NavItem>
								</Nav>
							</AccordionBody>
						</AccordionItem>
					</UncontrolledAccordion>
				</Row>
				<Row style={{ marginBottom: 30 }}>
					<UncontrolledAccordion stayOpen>
						<AccordionItem>
							<AccordionHeader targetId="3">Relatórios</AccordionHeader>
							<AccordionBody accordionId="3">
								<Nav fill pills vertical>
									<NavItem>
										<Link  className="nav-link nav-link-active bg-primary"  style={{color: "white" }} to="/relatorio">Relatórios</Link>
									</NavItem>
								</Nav>
							</AccordionBody>
						</AccordionItem>
					</UncontrolledAccordion>
				</Row>
			</OffcanvasBody>
			{cadastrarCliente && <CadastarClienteModal Sucess={handleSucessCliente} onChangeState={handleCadastrarCliente} state={cadastrarCliente} />}
			{cadastrarVenda && <CadastrarVendaModal Sucess={handleSucessVenda} onChangeState={handleCadastrarVenda} state={cadastrarVenda} />}
		</Offcanvas>
	);
};

MenuHeaderCanvas.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	SaveSucess: PropTypes.func.isRequired,
};

export default MenuHeaderCanvas;
