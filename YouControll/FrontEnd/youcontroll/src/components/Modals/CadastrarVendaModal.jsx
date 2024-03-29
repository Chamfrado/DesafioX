import React, { useEffect, useState } from "react";
import {
	Button,
	Col,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	InputGroup,
	InputGroupText,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
	Spinner,
} from "reactstrap";
import YCapi from "../../services/YouControllApi";
import { BiSearch } from "react-icons/bi";

import PesquisarCliente from "./PesquisarCliente";

import PropTypes from "prop-types";


//FormatDate
function formatDate(dateString) {
	const [year, month, day] = dateString.split("-");
	return `${day}/${month}/${year}`;
}


const CadastrarVendaModal = ({ state, onChangeState, Sucess }) => {
	const [modal, setModal] = useState(false);
	const [formData, setFormData] = useState({
		cliente_id: -1,
		nome: "",
		data: "",
		status: "",
		valor: "",
	});
	// eslint-disable-next-line no-unused-vars
	const [errorForm, setErrorForm] = useState({
		nome: "",
		data: "",
		status: "",
		valor: "",
	});
	const [isClienteValid, setIsClienteValid] = useState(false);
	const [isDateValid, setIsDateValid] = useState(false);
	const [isStatusValid, setIsStatusValid] = useState(false);
	const [isValueValid, setIsValueValid] = useState(false);
	const [isSaveLoading, setIsSaveLoading] = useState(false);
	const [pesquisaModal, setPesquisaModal] = useState(false);

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

	const handleSelectedCliente = (cliente) => {
		setFormData((prevForm) => ({
			...prevForm,
			cliente_id: cliente.id,
			nome: cliente.nome,
		}));
	};

	useEffect(() => {
		verifyCliente();
		verifyData();
		verifyValor();
		verifyStatus();

		
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		verifyCliente();
		verifyData();
		verifyValor();
		verifyStatus();

		

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSaveSucess = () => {
		Sucess();
	};

	const save = async () => {
		try {
			await YCapi.post("vendas/add", {
				clienteId: formData.cliente_id,
				data: formatDate(formData.data),
				status: formData.status,
				valor: formData.valor,
			});
			handleSaveSucess();
			setFormData({
				cliente_id: -1,
				nome:"",
				data: "",
				status: "",
				valor: "",
			});
			setIsSaveLoading(false);
			setModal(false);
		} catch (error) {
			alert("Error saving venda:", error);
			setIsSaveLoading(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		
		
		if (!(isClienteValid && isDateValid && isStatusValid && isValueValid)) {
			return;
		}

		setIsSaveLoading(true);
		save();
	};

	const handlePesquisaModal = () => {
		setPesquisaModal(!pesquisaModal);
	};

	const verifyCliente = () => {
		if (formData.nome === "") {
			setIsClienteValid(false);
			setErrorForm((prevErrorForm) => ({
				...prevErrorForm,
				nome: "Selecione um Cliente! Clique na lupa para procurar.",
			}));
		} else {
			setIsClienteValid(true);
			setErrorForm((prevErrorForm) => ({
				...prevErrorForm,
				nome: "",
			}));
		}	  
	};

	const verifyData = () => {
		formData.data.length === 10
			? setIsDateValid(true)
			: setIsDateValid(false);
		setErrorForm((prevErrorForm) => ({
			...prevErrorForm,
			data: "Coloque uma data válida!"
		}));
	};

	const verifyValor = () => {
		if(formData.valor === ""){
			setIsValueValid(false);
			setErrorForm((prevErrorForm) => ({
				...prevErrorForm,
				valor: "Valor é obrigatório!"
			}));
		}
		else if(formData.valor < 0){
			setIsValueValid(false);
			setErrorForm((prevErrorForm) => ({
				...prevErrorForm,
				valor: "Não é permitido valor negativo!"
			}));
		}else{
			const absoluteValue = Math.abs(formData.valor);
			const maxAllowedValue = Math.pow(10, 8);
			const roundedValue = Math.round(absoluteValue * 100) / 100;

			roundedValue < maxAllowedValue? setIsValueValid(true)
				:setIsValueValid(false);
			setErrorForm((prevErrorForm) => ({
				...prevErrorForm,
				valor: "Valor muito alto!"
			}));
		}
		
	};

	const verifyStatus = () => {
		statusOptions.includes(formData.status)
			? setIsStatusValid(true)
			: setIsStatusValid(false);
		setErrorForm((prevErrorForm) => ({
			...prevErrorForm,
			status: "Situação errada!"
		}));
	};

	const statusOptions = [
		"Aguardando Pagamento",
		"Pagamento Aprovado",
		"Aguardando Envio",
		"À caminho",
		"Finalizado",
	];

	return (
		<Modal id="CadastrarVenda" isOpen={modal} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle} close={toggle} onClosed={handleDismiss}>
        Cadastrar Venda
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<FormGroup>
								<Label for="clienteNome">Cliente*</Label>
								<InputGroup>
									<Input
										disabled
										id="clienteNome"
										name="nome"
										placeholder="Selecione o Cliente"
										type="text"
										value={formData.nome}
										onChange={handleChange}
										onBlur={handlePesquisaModal}
										onClick={handlePesquisaModal}
										required
										className={isClienteValid ? "is-valid" : "is-invalid"}
									/>
									
									<Button 
										color="primary" 
										style={{borderTopRightRadius: 8, borderBottomRightRadius: 8}} 
										onClick={handlePesquisaModal}>
										<BiSearch />
									</Button>
									{errorForm.valor && (
										<FormFeedback>{errorForm.nome}</FormFeedback>
									)}
								</InputGroup>

								{errorForm.valor && (
									<FormFeedback>{errorForm.nome}</FormFeedback>
								)}
								
							</FormGroup>
						</Col>
					</Row>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="data">Data*</Label>
							<Input
								type="date"
								id="data"
								name="data"
								onChange={handleChange}
								value={formData.data}
								className={isDateValid ? "is-valid" : "is-invalid"}
							/>
							{errorForm.valor && (
								<FormFeedback>{errorForm.data}</FormFeedback>
							)}
						</Col>
						<Col>
							<Label for="status">Situação*</Label>
							<Input
								id="status"
								name="status"
								placeholder="Selecione a Situação."
								type="select"
								value={formData.status}
								onChange={handleChange}
								className={isStatusValid ? "is-valid" : "is-invalid"}
							>
								<option>Selecione a Situação</option>
								{statusOptions.map((option, index) => (
									<option key={index}>{option}</option>
								))}
							</Input>
							{errorForm.valor && (
								<FormFeedback>{errorForm.status}</FormFeedback>
							)}
							
						</Col>
					</Row>
					<Row style={{ paddingBottom: 10 }}>
						<Col xl={6}>
							<Label for="valor">Valor da Venda*</Label>
							<InputGroup  >
								
								<InputGroupText>R$</InputGroupText>
								<Input
									style={{borderTopRightRadius: 8, borderBottomRightRadius: 8}}
									id="valor"
									name="valor"
									placeholder="0,00"
									type="number"
									value={formData.valor}
									onChange={handleChange}
									valid={isValueValid}
									invalid={!isValueValid} // Add the invalid prop based on validation state
								/>
								{errorForm.valor && (
									<FormFeedback>{errorForm.valor}</FormFeedback>
								)}
								
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
			<PesquisarCliente
				state={pesquisaModal}
				onChangeState={handlePesquisaModal}
				onClienteSelected={handleSelectedCliente}
				searchState={formData.nome}
			/>
		</Modal>
	);
};

CadastrarVendaModal.propTypes = {
	state: PropTypes.bool.isRequired, 
	onChangeState: PropTypes.func.isRequired, 
	Sucess: PropTypes.func.isRequired
};

export default CadastrarVendaModal;
