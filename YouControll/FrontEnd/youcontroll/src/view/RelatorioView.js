import React, { useState } from "react";
import {  Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, } from "reactstrap";

import Header from "../components/Header/Header";
import MapaTodosClientes from "../components/Maps/MapaTodosClientes";
import DadosImportantes from "../components/Relatorios/DadosImportantes";
import VendasPorAno from "../components/Relatorios/VendasPorAno";



const RelatorioView = () => {
	const [activeTab, setActiveTab] = useState("1");

	const handleChangeTab = (tabId) => {
		setActiveTab(tabId);
	};



	return (
		<Container className="bg-ligt " fluid>

			<Row>
				<Header />
			</Row>

			<Row style={{ paddingTop: 20, marginLeft: "1%", paddingBottom: 30 }}>
				<h1>Relatório</h1>
			</Row>

			<Row>
				<DadosImportantes />
			</Row>



			<Row style={{ paddingTop: 20, marginLeft: "1%", marginRight: "1%", paddingBottom: 30 }}>
				<Nav tabs fill className=" border" >
					<NavItem>
						<NavLink

							onClick={() => handleChangeTab("1")}
							className={activeTab === "1" ? "active bg-primary" : ""}

							style={activeTab === "1" ? { color: "white", cursor: "pointer" } : { cursor: "pointer" }}
						>
							Localização de Clientes
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={activeTab === "2" ? "active bg-primary " : ""}
							style={activeTab === "2" ? { color: "white", cursor: "pointer" } : { cursor: "pointer" }}
							onClick={() => handleChangeTab("2")}
						>
							Faturamento por mês
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab} className=" border" style={{ height: "100%", borderWidth: 3 }} >

					<TabPane tabId="1" >
						<MapaTodosClientes />
					</TabPane>


					<TabPane tabId="2" >
						<VendasPorAno />
					</TabPane>

				</TabContent>
			</Row>






		</Container>
	);
};

export default RelatorioView;