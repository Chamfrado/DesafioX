import { Button, Container, Card, Row, Input, Label, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, Spinner, Alert } from 'reactstrap'
import { BiSearch, BiPlus } from "react-icons/bi";
import { useState } from 'react';
import { useEffect } from 'react';
import MainHeader from '../components/Header/Header'
import TableClient from '../components/Tables/TableClientes'
import YCapi from '../services/YouControllApi'
import MapaClienteCadastro from '../components/Maps/MapaClienteCadatro';
import ViaCepApi from '../services/ViaCepApi'


const Home = () => {
    const [alertSaveSucess, setAlertSaveSucess] = useState(false);

    const onDismiss = () => {setAlertSaveSucess(!alertSaveSucess)}

    const handleSaveSucess = () => {
        setAlertSaveSucess(true)}


    return (
        <Container fluid>
            <Row >

                <MainHeader height="100px" />

            </Row>
            <Row style={{ paddingTop: 20, marginLeft: '1%' }}>
                <Col>
                    <Alert isOpen={alertSaveSucess} toggle={onDismiss}>
                        Cliente cadastrado com sucesso!
                    </Alert>
                </Col>

            </Row>

            <Row style={{ paddingTop: 20, marginLeft: '1%' }}>
                <h1>Lista de Clientes</h1>
            </Row>
            


            <Row style={{ paddingTop: 10, margin: '1%' }}>
                <Card >
                    <TableClient onSaveSucess={handleSaveSucess}/>
                </Card>

                
            </Row>
        </Container >
    );
};
export default Home;