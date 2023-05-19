import { Button, Container, Card, Row, Input, Label, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, Spinner, Alert } from 'reactstrap'
import { BiSearch, BiPlus } from "react-icons/bi";
import { useState } from 'react';
import { useEffect } from 'react';
import MainHeader from '../components/Header/Header'
import TableClient from '../components/TableClient/TableCliente'
import YCapi from '../services/YouControllApi'


const Home = () => {

    const [dropdownOpen, setDropdownOpen] = useState([false, false, false]);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [ufOptions, setUfOptions] = useState([]);
    const [isLoadingUfOptions, setIsLoadingUfOptions] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
        telefone: '',
        uf: '',
        email: ''
    });
    const [alertSaveSucess, setAlertSaveSucess] = useState(false);

    const onDismiss = () => setAlertSaveSucess(false);


    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then((response) => response.json())
            .then((data) => {
                const options = data.map((state) => state.sigla);
                setUfOptions(options);
                setIsLoadingUfOptions(false);
            })
            .catch((error) => {
                console.error('Error fetching UF options:', error);
                setIsLoadingUfOptions(false);
            });
    }, []);

    useEffect(() => {
        const isEmailValid = emailRegex.test(formData.email);
        const isCnpjValid = formData.cnpj.length === 14;
        const isTelefoneValid = formData.telefone.length === 11;

        setIsFormValid(isEmailValid && isCnpjValid && isTelefoneValid);
    }, [formData]);


    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            return;
        }

        setIsSaveLoading(true);

        // Convert form data to JSON
        save();
    };

    const renderCidades = (index) => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + index + '/distritos')
            .then((response) => response.json())
            .then((data) => {
                alert(data)
            })
            .catch((error) => {
                console.error('Error fetching UF options:', error);

            });
    }


    const toggle = (index) => {
        const updatedDropdownOpen = [...dropdownOpen];
        updatedDropdownOpen[index] = !updatedDropdownOpen[index];
        setDropdownOpen(updatedDropdownOpen);
    };

    const formatCnpj = (value) => {
        // Remove all non-digit characters
        const digitsOnly = value.replace(/\D/g, '');

        // Apply the formatting mask
        const cnpj = digitsOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

        return cnpj;
    };

    const formatTelefone = (value) => {
        // Remove all non-digit characters
        const digitsOnly = value.replace(/\D/g, '');

        // Apply the formatting mask
        let telefone = digitsOnly.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');

        // Add an extra digit space for numbers with 9 digits
        if (digitsOnly.length > 10) {
            telefone = telefone.replace(/(\d{2}) (\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        }

        return telefone;
    };


    //FUNÇÃO PARA SALVAR USUARIO
    async function save() {
        try {
            await YCapi.post('clientes', {
                nome: formData.nome,
                cnpj: formData.cnpj,
                email: formData.email,
                telefone: formData.telefone,
                uf: formData.uf,
                localizacao: 'local de teste',
            });
            fetchTableData(); // Refresh table data
            setAlertSaveSucess(true);
            setFormData({ // Reset form data to empty values
                nome: '',
                cnpj: '',
                telefone: '',
                uf: '',
                email: '',
            });
            setIsSaveLoading(false);
            setModal(false);
        } catch (error) {
            console.error('Error saving cliente:', error);
        }
    }

    const toggleCadastro = () => setModal(!modal);


    const fetchTableData = () => {
        const url = searchQuery ? `clientes?search=${encodeURIComponent(searchQuery)}` : 'clientes';
      
        YCapi.get(url)
          .then(({ data }) => {
            setTableData(data);
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
            <Row >

                <MainHeader height="100px" />

            </Row>
            <Row style={{ paddingTop: 20, marginLeft: '1%' }}>
                <Alert isOpen={alertSaveSucess} toggle={onDismiss}>
                    Cliente cadastrado com sucesso!
                </Alert>
                <h1 style={{ textDecoration: 'underline', textDecorationColor: 'blue' }}>Lista de Clientes</h1>
            </Row>


            <Row style={{ paddingTop: 20, margin: '1%' }}>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        id="search"
                        name="searchQuery"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar"
                        type="search"
                    />
                    <Button style={{ marginLeft: 10 }} color='primary'><BiSearch /></Button>

                </Col>
                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                    <Button color='primary' onClick={toggleCadastro}><BiPlus /> Cadastrar cliente</Button>
                </Col>


            </Row>


            <Row style={{ paddingTop: 10, margin: '1%' }}>
                <Card >

                    <TableClient data={tableData} />
                    {isLoading ? <Spinner color="primary" style={{ alignSelf: 'center' }} /> : <></>}
                </Card>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} close={<></>} style={{ backgroundColor: '#0a58ca', color: 'white' }} >Cadastrar Cliente</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <Row style={{ paddingBottom: 10 }}>
                                <Col>
                                    <Label for="nome">Nome*</Label>
                                    <Input
                                        id="nome"
                                        name="nome"
                                        placeholder="Nome"
                                        type="text"
                                        value={formData.nome}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: 10 }}>
                                <Col>
                                    <Label for="cnpj">CNPJ*</Label>
                                    <Input

                                        name="cnpj"
                                        placeholder="CNPJ"
                                        type="text"
                                        value={formatCnpj(formData.cnpj)}
                                        onChange={handleChange}
                                        required
                                        minLength={14}
                                        maxLength={14}
                                        className={formData.cnpj.length === 14 ? 'is-valid' : 'is-invalid'}
                                    />
                                </Col>
                                <Col>
                                    <Label for="telefone">Telefone*</Label>
                                    <Input

                                        name="telefone"
                                        id="telefone"
                                        value={formatTelefone(formData.telefone)}
                                        onChange={handleChange}
                                        placeholder="(35) 9 9202-5205"
                                        required
                                        minLength={11}
                                        maxLength={11}
                                        className={formData.telefone.length === 11 ? 'is-valid' : 'is-invalid'}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label for="exampleUF">UF*</Label>
                                    {isLoadingUfOptions ? (
                                        <Spinner color="primary" style={{ alignSelf: 'center' }} />
                                    ) : (
                                        <Input
                                            id="exampleUF"
                                            name="uf"
                                            placeholder="UF"
                                            type="select"
                                            value={formData.uf}
                                            onChange={handleChange}

                                        >
                                            {ufOptions.map((option) => (
                                                <option key={option.id}>{option}</option>
                                            ))}
                                        </Input>
                                    )}
                                    <Button onClick={() => renderCidades(formData.uf)}>teste cidades</Button>
                                </Col>
                                <Col>
                                    <Label for="exampleEmail">E-mail*</Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="E-mail"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={formData.email !== '' && !emailRegex.test(formData.email) ? 'is-invalid' : 'valid'}
                                    />
                                </Col>
                            </Row>
                            <ModalFooter>
                                <Button color="secondary" onClick={toggleCadastro}>
                                    Cancelar
                                </Button>
                                <Button type="submit" color="primary">
                                    Salvar
                                </Button>
                                {isSaveLoading && (
                                    <Label>
                                        Carregando Dados<Spinner color="primary" style={{ alignSelf: 'center' }} />
                                    </Label>
                                )}
                            </ModalFooter>
                        </Form>
                    </ModalBody>

                </Modal>
            </Row>
        </Container >
    );
};
export default Home;