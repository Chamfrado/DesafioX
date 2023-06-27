import { Container, Card, Row, Col, Alert } from "reactstrap";
import { useState, React } from "react";
import MainHeader from "../components/Header/Header";
import TableClient from "../components/Tables/TableClientes";
const Home = () => {
	const [alertSaveSucess, setAlertSaveSucess] = useState(false);

	const onDismiss = () => { setAlertSaveSucess(!alertSaveSucess); };

	const handleSaveSucess = () => {
		setAlertSaveSucess(true);
	};


	return (
		<Container fluid>
			<Row >

				<MainHeader height="100px" />

			</Row>

			<Row style={{ paddingTop: 10 }}>
				<Col>
					<Alert isOpen={alertSaveSucess} toggle={onDismiss}>
                        Cliente cadastrado com sucesso!
					</Alert>
				</Col>

			</Row>


			<Row style={{ paddingTop: 20, marginLeft: "1%" }}>
				<h1>Lista de Clientes</h1>
			</Row>



			<Row style={{ paddingTop: 10, margin: "1%" }}>
				<Card>
					<TableClient onSaveSucess={handleSaveSucess} />
				</Card>




			</Row>






		</Container >
	);
};
export default Home;