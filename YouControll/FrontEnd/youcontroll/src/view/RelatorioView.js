import React, { useState } from "react";
import { Button, Col,  Collapse,  Container, FormGroup, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane,  UncontrolledTooltip, } from "reactstrap";
import { BiRefresh } from "react-icons/bi";
import Header from "../components/Header/Header";
import MapaTodosClientes from "../components/Maps/MapaTodosClientes";
import DadosImportantes from "../components/Relatorios/DadosImportantes";
import VendasPorAno from "../components/Relatorios/VendasPorAno";
import YCapi from "../services/YouControllApi";




const RelatorioView = () => {
	const [activeTab, setActiveTab] = useState("1");
	const [anosDisponiveis, setAnosDisponiveis] = useState([]);
	const [selectedAno, setSelectedAno] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [filtros,setFiltros] = useState([]);

	

	const handleChangeFiltro = (event) =>{
		const {name} = event.target;
		
		if(filtros.includes(name)){
			setFiltros(filtros.filter(item => item !== name));
		}else{
			filtros.push(name);
		}
	}; 

	const toggle = () => setIsOpen(!isOpen);


	const handleChangeTab = (tabId) => {
		setActiveTab(tabId);
	};

	const handleRefresh = () => {
		setSelectedAno(0);
		YCapi.get("/vendas")
			.then(({ data }) => {
				let anos = [];
				data.map((item) => {

					const [, , ano] = item[2].split("/");
					if (!anos.includes(ano)) {
						anos.push(ano);
					}
					setAnosDisponiveis(anos);
				});
			})
			.catch(() => {
				alert("deu ruim");
			});
	};

	const handleChange = (event) => {

		const { value } = event.target;

		setSelectedAno(value);


	};

	useState(() => {
		handleRefresh();

	}, []);



	return (
		<Container className="bg-ligt " fluid>

			<Row>
				<Header />
			</Row>

			<Row style={{ paddingTop: 20, marginLeft: "1%", paddingBottom: 30 }}>
				<Col>
					<h1>Relatórios <BiRefresh id="atualizar" onClick={handleRefresh} style={{ padding: 10, color: "#0d6efd", cursor: "pointer" }} /></h1>
					<UncontrolledTooltip target="atualizar"> Clique para atualizar </UncontrolledTooltip>
				</Col>

			</Row>
			<Row style={{ paddingTop: 20, marginLeft: "1%", paddingBottom: 30 }}>
				<Col sm={3}>

					<Label for="anos" size="lg">Selecione o ano: </Label>
					<Input
						id="anos"
						name="anos"
						type="select"
						value={selectedAno}
						onChange={handleChange}
					>
						<option>Selecione um ano</option>
						{anosDisponiveis.map((option) => (
							<option key={option}>{option}</option>
						))}
					</Input>
				</Col>
				<Col sm="1">
					<Button
						color="primary"
						onClick={toggle}

						style={{
							marginBottom: "1rem"
						}}
					>
						Filtros
					</Button>
				</Col>
				<Col>
					<Collapse isOpen={isOpen}  toggler="#toggler">
						<Row>
							<Col>
								<FormGroup >
									<Input name="AguardandoPagamento" value={filtros.AguardandoPagamento} onChange={handleChangeFiltro} type="checkbox" />
									<Label>Aguardando pagamento</Label>
								</FormGroup>
								<FormGroup>
									<Input name="PagamentoAprovado" value={filtros.PagamentoAprovado} onChange={handleChangeFiltro} type="checkbox" />
									<Label>Pagamento aprovado</Label>
								</FormGroup>
							</Col>
						


							<Col >
								<FormGroup>
									<Input name="AguardandoEnvio" value={filtros.AguardandoEnvio} onChange={handleChangeFiltro} type="checkbox" />
									<Label>Aguardando envio</Label>
								</FormGroup>
								<FormGroup>
									<Input name="ACaminho" value={filtros.ACaminho} onChange={handleChangeFiltro} type="checkbox" />
									<Label>À caminho</Label>
								</FormGroup>

							</Col>
							<Col >
								<FormGroup>
									<Input name="Finalizado" value={filtros.Finalizado} onChange={handleChangeFiltro} type="checkbox" />
									<Label>Finalizado</Label>
								</FormGroup>



							</Col>
						</Row>
						
					</Collapse>
				</Col>
					
				



			</Row>
			<Row>
				<DadosImportantes Ano={selectedAno} />
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
						<VendasPorAno Ano={selectedAno} />
					</TabPane>

				</TabContent>
			</Row>






		</Container>
	);
};

export default RelatorioView;