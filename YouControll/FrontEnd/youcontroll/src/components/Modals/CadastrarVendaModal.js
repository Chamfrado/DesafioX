import { useEffect, useState, React } from "react";
import { Button, Col, Form, Input, InputGroup, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import YCapi from "../../services/YouControllApi";
import { BiSearch } from "react-icons/bi";

import PesquisarCliente from "./PesquisarCliente";


// eslint-disable-next-line react/prop-types
const CadastrarVendaModal = ({ state, onChangeState, Sucess }) => {




	//Configuração para Mostrar ou esconder o Modal
	const [modal, setModal] = useState(false);

	useEffect(() => {
		setModal(state);
	}, [state]);

	const toggle = () => {
		setModal(!modal);
		onChangeState(modal);
	};

	const handleDismiss = () => {
		onChangeState(false);
	};


	//Configuração do Form
	const [formData, setFormData] = useState({
		cliente_id: -1,
		nome: "",
		data: "",
		status: "",
		valor: ""
	});
	const statusOptions = ["Aguardando Pagamento", "Pagamento Aprovado", "Aguardando Envio", "À caminho", "Finalizado"];

	
	//Validator do formulario
	const [isClienteValid, setIsClienteValid] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [isDateValid, setIsDateValid] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [isStatusValid, setIsStatusValid] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [isValueValid, setIsValueValid] = useState(true);
	const [isFormValid, setIsFormValid] = useState(false);
	useEffect(() => {
		verifyCliente();
		verifyData();
		verifyValor();
		verifyStatus();

		setIsFormValid( isClienteValid && isDateValid && isStatusValid && isValueValid);
	}, [formData]);


	const handleSelectedCliente = (cliente) => {
		setFormData((prevForm) => ({
			...prevForm,
			cliente_id: cliente.id,
			nome: cliente.nome
		})

		);
	};

	//Handle quando algum form é alterado
	const handleChange = (event) => {
		const { name, value } = event.target;


		
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
		

		
	};


	const handleSaveSucess = () => { Sucess(); };

	//Salvar Venda
	const [isSaveLoading, setIsSaveLoading] = useState(false);

	///FUNÇÃO PARA SALVAR USUARIO
	// eslint-disable-next-line no-unused-vars
	async function save() {
		
		try {
			await YCapi.post("vendas/add", {
				clienteId: formData.cliente_id,
				data: formData.data,
				status: formData.status,
				valor: formData.valor
			});
			handleSaveSucess();
			setFormData({ // Reset form data to empty values
				cliente_id: -1,
				data: "",
				status: "",
				valor: ""
			});
			setIsSaveLoading(false);
			setModal(false);
		} catch (error) {
			alert("Error saving venda:", error);
			setIsSaveLoading(false);
		}
	}


	const handleSubmit = (event) => {
		event.preventDefault();

		if (!isFormValid) {
			return;
		}

		
		setIsSaveLoading(true);

		
		// Convert form data to JSON
		//save();
	};

	const [pesquisaModal, setPesquisaModal] = useState(false);
	const handlePesquisaModal = () => {
		setPesquisaModal(!pesquisaModal);
	};



	//Analizadores de Form
	const verifyCliente = () => {
		const url = "vendas/" + formData.cliente_id;
		YCapi.get(url)
			.then(() => {
				setIsClienteValid(true);
				
			})
			.catch(() => {
				setIsClienteValid(false);
			});
	};

	const verifyData = () => {formData.data.length === 10 ? setIsDateValid(true) : setIsDateValid(false);};

	const verifyValor = () => { formData.valor > 0 && formData.valor !== ""? setIsValueValid(true) : setIsValueValid(false); };

	const verifyStatus = () => {formData.status === "Aguardando Pagamento" || formData.status === "Aguardando Pagamento" || formData.status === "Aguardando Envio" || formData.status === "À caminho" || formData.status === "Pagamento Aprovado"? setIsStatusValid(true):setIsStatusValid(false);  };
	//######################################################### COMPONENTES

	return (
		<Modal isOpen={modal} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle} close={toggle} onClosed={handleDismiss}>Cadastrar Venda</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="nome">Cliente*</Label>
							<InputGroup>
								
								<Input

									name="nome"
									placeholder="Selecione o Cliente"
									type="text"
									value={formData.nome}
									onChange={handleChange}
									onBlur={handlePesquisaModal}
									required
									className={isClienteValid? "is-valid" : "is-invalid"}
								/>
								<Button color="primary" onClick={handlePesquisaModal}><BiSearch/></Button>
							</InputGroup>
						</Col>
						
					</Row>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="status">Data*</Label>
							<Input 
								type="date"
								id="data"
								name="data"
								onChange={handleChange}
								value={formData.data}
								className={isDateValid? "is-valid" : "is-invalid"}
							></Input>
						</Col>
						<Col >
							<Label for="status">Situação*</Label>
							
							<Input
								id="status"
								name="status"
								placeholder="Selecione a Situação."
								type="select"
								value={formData.uf}
								onChange={handleChange}
								className={isStatusValid? "is-valid" : "is-invalid"}

							>
								{statusOptions.map((option) => (
									<option key={option.id}>{option}</option>
								))}
							</Input>
						</Col>
						
					</Row>
					<Row style={{ paddingBottom: 10 }}>
						
						
						
						
						<Col xl={6}>
						
							<Label for="valor">Valor da Venda*</Label>
							<InputGroup>
								<InputGroupText >
                                R$
								</InputGroupText>
								<Input
									id="valor"
									name="valor"
									placeholder="0,00"
									type="number"
									value={formData.valor}
									onChange={handleChange}
									className={isValueValid? "is-valid" : "is-invalid"}

								/>
							</InputGroup>
							
						</Col>
					</Row>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={toggle}>
					Cancelar
				</Button>
				<Button onClick={handleSubmit} color="primary">
					Salvar
				</Button>
				{isSaveLoading && (
					<Label>
						Carregando Dados<Spinner color="primary" style={{ alignSelf: "center" }} />
					</Label>
				)}
			</ModalFooter>
			<PesquisarCliente state={pesquisaModal} onChangeState={handlePesquisaModal} onClienteSelected={handleSelectedCliente} searchState={formData.nome}/>
		</Modal>
	);
};

export default CadastrarVendaModal;
