import React, { useState } from "react";
import { Button, Card, CardText, CardTitle, Col, Container,  Nav, NavItem, NavLink, Row, TabContent, TabPane, } from "reactstrap";

import Header from "../components/Header/Header";
import MapaTodosClientes from "../components/Maps/MapaTodosClientes";
import DadosImportantes from "../components/Relatorios/DadosImportantes";



const RelatorioView = () => {
	const [activeTab, setActiveTab] = useState("1");

	const handleChangeTab = (tabId) => {
		setActiveTab(tabId);
	};



	return (
		<Container fluid>
            
			<Row>
				<Header />
			</Row>
			<Card>
				<Row style={{ paddingTop: 20, marginLeft: "1%", paddingBottom: 30 }}>
					<h1>Relatório</h1>
				</Row>

				<Row>
					<DadosImportantes/>
				</Row>
				
				
				
				<Nav tabs fill >
					<NavItem>
						<NavLink
								
							onClick={() => handleChangeTab("1")}
							className={activeTab === "1"? "active bg-primary": ""}
								
							style={activeTab === "1"? {color: "white", cursor:"pointer"}: {cursor:"pointer"}}
						>
                            Localização de Clientes
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={activeTab === "2"? "active bg-primary ": ""}
							style={activeTab === "2"? {color: "white", cursor:"pointer"}: {cursor:"pointer"}}
							onClick={() => handleChangeTab("2")}
						>
                            Faturamento por mês
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab} style={{ height: "100%", borderWidth: 3 }} >
					
					<TabPane tabId="1" >
						<Row>
							<Col sm="12" >
								<MapaTodosClientes/>
							</Col>
						</Row>
					</TabPane>


					<TabPane tabId="2" >
						<Row >
							<Col sm="6" >
								<Card body>
									<CardTitle>
                                            Special Title Treatment
									</CardTitle>
									<CardText>
                                            With supporting text below as a natural lead-in to additional content.
									</CardText>
									<Button>
                                            Go somewhere
									</Button>
								</Card>
							</Col>
							<Col sm="6">
								<Card body>
									<CardTitle>
                                            Special Title Treatment
									</CardTitle>
									<CardText>
                                            With supporting text below as a natural lead-in to additional content.
									</CardText>
									<Button>
                                            Go somewhere
									</Button>
								</Card>
							</Col>
						</Row>
					</TabPane>

				</TabContent>
			</Card>
			
			

		</Container>
	);
};

export default RelatorioView;