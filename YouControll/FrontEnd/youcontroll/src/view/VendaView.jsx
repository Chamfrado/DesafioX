import { Container, Card, Row, Col, Alert } from "reactstrap";
import { useState, React } from "react";
import MainHeader from "../components/Header/Header";
import TableVendas from "../components/Tables/TableVendas";


const VendaView = () => {
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


	return (
		<Container id="VendaContainer"  fluid>
			<Row >

				<MainHeader height="100px" />

			</Row>

			<Row style={{ paddingTop: 10 }}>
				<Col>
					{alertSaveSucess && <Alert id="saveSucess" isOpen={alertSaveSucess} toggle={onDismissSave}>
                        Venda cadastrada com sucesso!
					</Alert>}
					{alertUpdateSucess && <Alert id="updateSucess" isOpen={alertUpdateSucess} toggle={onDismissUpdate}>
						Venda atualizada com sucesso!
					</Alert>}
					{alertSaveSucess && <Alert id="deleteSucess" isOpen={alertDeleteSucess} toggle={onDismissDelete}>
						Venda Deletada com sucesso!
					</Alert>}
				</Col>

			</Row>


			<Row  style={{ paddingTop: 20, marginLeft: "1%" }}>
				<h1 id="VendaTitle">Lista de Vendas</h1>
			</Row>



			<Row style={{ paddingTop: 10, margin: "1%" }}>
				<Card>
					<TableVendas onSaveSucess={handleSaveSucess} onUpdateSucess={handleUpdateSucess} onDeleteSucess={handleDeleteSucess} />
				</Card>




			</Row>






		</Container >


	);
};
export default VendaView;