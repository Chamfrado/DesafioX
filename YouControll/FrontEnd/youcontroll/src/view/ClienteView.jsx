import { Container, Card, Row, Col, Alert } from "reactstrap";
import { useState, React } from "react";
import MainHeader from "../components/Header/Header";
import TableClient from "../components/Tables/TableClientes";
// eslint-disable-next-line react/prop-types
const ClienteView = ({handleLogin}) => {
	const [alertSaveSucess, setAlertSaveSucess] = useState(false);
	const [alertUpdateSucess, setAlertUpdateSucess] = useState(false);
	const [alertDeleteSucess, setAlertDeleteSucess] = useState(false);

	const onDismissSave = () => { setAlertSaveSucess(!alertSaveSucess); };
	const onDismissUpdate = () => {setAlertUpdateSucess(!alertUpdateSucess);};
	const onDismissDelete = () => {setAlertDeleteSucess(!alertDeleteSucess);};

	const handleSaveSucess = () => {
		setAlertSaveSucess(true);
	};

	const handleUpdateSucess = () =>{
		setAlertUpdateSucess(true);
	};

	const handleDeleteSucess = () => {
		setAlertDeleteSucess(true);
	};

	const handleExit = () => {
		handleLogin();
	};

	return (
		<Container fluid>
			<Row style={{height: "100px"}}>

				<MainHeader handleLogout={handleExit} />

			</Row>

			<Row style={{ paddingTop: 10 }}>
				<Col>
					{alertSaveSucess && <Alert isOpen={alertSaveSucess} toggle={onDismissSave}>
                        Cliente cadastrado com sucesso!
					</Alert>}
					{alertUpdateSucess && <Alert isOpen={alertUpdateSucess} toggle={onDismissUpdate}>
						Cliente atualizado com sucesso!
					</Alert>}
					{alertSaveSucess && <Alert isOpen={alertDeleteSucess} toggle={onDismissDelete}>
						Cliente Deletado com sucesso!
					</Alert>}
				</Col>

			</Row>


			<Row style={{ paddingTop: 20, marginLeft: "1%" }}>
				<h1>Lista de Clientes</h1>
			</Row>



			<Row style={{ paddingTop: 10, margin: "1%" }}>
				<Card>
					<TableClient onSaveSucess={handleSaveSucess} onUpdateSucess={handleUpdateSucess} onDeleteSucess={handleDeleteSucess} />
				</Card>




			</Row>






		</Container >
	);
};
export default ClienteView;