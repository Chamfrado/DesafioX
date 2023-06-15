import { Button, Container, Card, Row, Input, Label, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, Spinner, Alert } from 'reactstrap'
import { BiSearch, BiPlus } from "react-icons/bi";
import { useState } from 'react';
import { useEffect } from 'react';
import MainHeader from '../components/Header/Header'
import TableVendas from '../components/Tables/TableVendas';
import YCapi from '../services/YouControllApi'
import ViaCepApi from '../services/ViaCepApi'


const VendaView = () => {
    const [alertSaveSucess, setAlertSaveSucess] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toggleCadastro, setToggleCadastro] = useState(null);

    const onDismiss = () => setAlertSaveSucess(false);



    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);

    }
    const fetchTableData = () => {
        const url = 'vendas';

        YCapi.get(url)
            .then(({ data }) => {
                const formattedData = data.map(([id, nome, data, status, valor]) => ({
                    id,
                    nome,
                    data,
                    status,
                    valor
                  }));
                  setTableData(formattedData);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchTableData();
    }, [searchQuery]);



    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container fluid>
            <Row>
                <MainHeader height="100px" />
            </Row>
            <Row style={{ paddingTop: 20, marginLeft: '1%' }}>
                <Alert isOpen={alertSaveSucess} toggle={onDismiss}>
                    Venda cadastrada com sucesso!
                </Alert>
                <h1 style={{ textDecoration: 'underline', textDecorationColor: '#0a58ca' }}>Lista de Vendas</h1>
            </Row>
            <Row style={{ paddingTop: 20, margin: '1%' }}>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        id="search"
                        name="searchQuery"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Digite o nome do cliente"
                        type="search"
                    />
                    <Button style={{ marginLeft: 10 }} color='primary'><BiSearch /></Button>

                </Col>
                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                    <Button color='primary' onClick={toggleCadastro}><BiPlus /> Cadastrar Venda</Button>
                </Col>


            </Row>
            <Card>
                <TableVendas data={tableData} />
                {isLoading ? <Spinner color="primary" style={{ alignSelf: 'center' }} /> : <></>}

            </Card>
        </Container>



    );
};
export default VendaView;