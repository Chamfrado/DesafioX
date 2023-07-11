
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import YCapi from "../../services/YouControllApi";
import MapaClienteAtualizar from "../Maps/MapaClienteAtualizar";
import EstadosApi from "../../services/EstadosApi";
import ViaCepApi from "../../services/ViaCepApi";
import PropTypes from "prop-types";

const AtualizarClienteModal = ({ ClienteId, Sucess }) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	//Inicialização do Form de Atualização
	const [startLocation, setStartLocation] = useState({
		lat: 0,
		lng: 0
	});
	const [updateForm, setUpdateForm] = useState({
		id: "",
		nome: "",
		cnpj: "",
		cep: "",
		telefone: "",
		uf: "",
		email: "",
		logradouro: "",
		bairro: "",
		cidade: "",
		lat: 0,
		lng: 0
	});
		//Configuração do Form de Erro
	const [errorForm, setErrorForm] = useState({
		nome: "",
		cnpj: "",
		telefone: "",
		uf: "",
		email: "",
		logradouro: "",
		bairro: "",
		cidade: "",
		cep: "",
	});
	//Puxando a API de UF para configurar o dropdown
	const [ufOptions, setUfOptions] = useState([]);
	const [isLoadingUfOptions, setIsLoadingUfOptions] = useState(true);

	useEffect(() => {
		setIsLoadingUfOptions(true);

		EstadosApi.get("")
			.then(({ data }) => {
				// eslint-disable-next-line react/prop-types
				const options = data.map((state) => state.sigla);
				setUfOptions(options);
				setIsLoadingUfOptions(false);
			})
			.catch((error) => {
				alert("Error fetching UF options:", error);
				setIsLoadingUfOptions(false);
			});
	}, []);

	const confirmarCEP = (cep) =>{
		ViaCepApi.get(cep + "/json")
			.then(() => {
				return true;
			}).catch(() => {
				return false;
			});
	};

	//Validator do formulario
	const [isFormValid, setIsFormValid] = useState(false);
	useEffect(() => {
		let isNomeValido = false;
		let isCnpjValid = false;
		let isTelefoneValid = false;
		let isEmailValid = false;
		let isCEPValid = false;
		let isUFValid = false;
		let isLogradouroValid = false;
		let isBairroValid = false;
		let isCidadeValid = false;
		let isLocalizacaoValid= false;

		if(updateForm.nome === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				nome: "Preencher o nome é obrigatório!"
			}));
			isNomeValido = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				nome: ""
			}));
			isNomeValido = true;
		}

		if(updateForm.cnpj === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cnpj: "Preencher o CNPJ é obrigatório!"
			}));
			isCnpjValid = false;
		}else if((!updateForm.cnpj.length === 14)){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cnpj: "CNPJ precisa conter 14 caracteres!"
			}));
			isCnpjValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cnpj: ""
			}));
			isCnpjValid = true;
		}

		if(updateForm.telefone === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				telefone: "Preencher o telefone é obrigatório!"
			}));
			isTelefoneValid = false;
		}else if((!updateForm.telefone.length === 11)){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				telefone: "telefone precisa conter 11 caracteres!"
			}));
			isTelefoneValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				telefone: ""
			}));
			isTelefoneValid = true;
		}

		if(updateForm.email === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				email: "Preencher o email é obrigatório!"
			}));
			isEmailValid = false;
		}else if(!emailRegex.test(updateForm.email)){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				email: "Entrar com um e-mail valido!"
			}));
			isEmailValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				email: ""
			}));
			isEmailValid = true;
		}

		if(updateForm.cep === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cep: "Preencher o CEP é obrigatório!"
			}));
			isCEPValid = false;
		}else if((updateForm.cep.replace(/\D/g, "").length !== 8)){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cep: "O CEP precisa conter 8 caracteres"
			}));
			isCEPValid = false;
		}else if(confirmarCEP(updateForm.cep)){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cep: "Digite um CEP válido"
			}));
			isCEPValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cep: ""
			}));
			isCEPValid = true;
		}

		if(updateForm.uf === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				uf: "Selecione a UF"
			}));
			isUFValid = false;
		}else if(!ufOptions.includes(updateForm)){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				uf: "Selecione uma UF válida"
			}));
			isUFValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				uf: ""
			}));
			isUFValid = true;
		}

		if(updateForm.uf === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				uf: "Selecione a UF"
			}));
			isUFValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				uf: ""
			}));
			isUFValid = true;
		}

		if(updateForm.logradouro === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				logradouro: "Logradouro Obrigatório!"
			}));
			isLogradouroValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				logradouro: ""
			}));
			isLogradouroValid = true;
		}

		if(updateForm.bairro === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				bairro: "bairro Obrigatório!"
			}));
			isBairroValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				bairro: ""
			}));
			isBairroValid = true;
		}

		if(updateForm.cidade === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cidade: "Cidade Obrigatória!"
			}));
			isCidadeValid = false;
		}else{
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cidade: ""
			}));
			isCidadeValid = true;
		}

		if(updateForm.lat && updateForm.lng){
			isLocalizacaoValid = true;
		}else{
			isLocalizacaoValid = false;
		}

		

		setIsFormValid(isEmailValid&& isLocalizacaoValid && isUFValid && isCnpjValid && isTelefoneValid && isBairroValid && isCEPValid && isNomeValido && isCidadeValid && isLogradouroValid);
	}, [updateForm]);

	//Formatação Dos Dados do Form
	const formatCnpj = (value) => {
		const digitsOnly = value.replace(/\D/g, "");

		const cnpj = digitsOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

		return cnpj;
	};

	const formatTelefone = (value) => {
		const digitsOnly = value.replace(/\D/g, "");
		let telefone = digitsOnly.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
		if (digitsOnly.length > 10) {
			telefone = telefone.replace(/(\d{2}) (\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
		}

		return telefone;
	};

	//Quando o CEP é alterado
	const handleChangeCEP = (event) => {
		const {  value } = event.target;
		const url = value + "/json/?callback=callback_name";
		if(value.length === 8){
			ViaCepApi.get(url)
				.then(({ data }) => {
				// Remover a função de retorno de chamada da resposta
					const jsonString = data.replace("callback_name(", "").replace(");", "");

					// Converter a string JSON em objeto
					const responseObject = JSON.parse(jsonString);

					// Extrair o logradouro do objeto
					const { logradouro, bairro, localidade, uf } = responseObject;
					setUpdateForm((prevFormData) => ({
						...prevFormData,
						uf: uf,
						logradouro: logradouro,
						bairro: bairro,
						cidade: localidade,
						cep: value
					}));



				})
				.catch(() => {
					setUpdateForm((prevFormData) => ({
						...prevFormData,
						cep: value
					}));
				});
		}else{
			setUpdateForm((prevFormData) => ({
				...prevFormData,
				cep: value
			}));
		}
			
		
	};
	//Atualizando Cliente Selecionado
	useEffect(() => {
		if (ClienteId != -1)
			YCapi.get("/clientes/" + ClienteId)
				.then(({ data }) => {
					const { id, nome, cnpj, email, telefone, uf, lat, lng } = data;
					setUpdateForm((prevForm) => ({
						...prevForm,
						id: id,
						nome: nome,
						cnpj: cnpj,
						email: email,
						telefone: telefone,
						uf: uf,
						lat: lat,
						lng: lng

					}));
					setStartLocation({
						lat: lat,
						lng: lng
					});
					setModal(!modal);
					
				}).finally(() => {
				});

	}, [ClienteId]);

	//Funções de controle do Modal
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};


	const handleChangeLocation = (location) => {
		setUpdateForm((prevUpdateForm) => ({
			...prevUpdateForm,
			logradouro: location.logradouro,
			lat: location.lat,
			lng: location.lng,
			cep: location.cep.replace(/\D/g, ""),
			cidade: location.cidade,
			bairro: location.bairro,
			uf: location.uf

		}));
	};

	//Handle quando algum form é alterado
	const handleChange = (event) => {
		const { name, value } = event.target;

		if(name === "cnpj" || name=== "telefone"){
			setUpdateForm((prevFormData) => ({
				...prevFormData,
				[name]: value.replace(/\D/g, "")
			}));
		}else{
			setUpdateForm((prevFormData) => ({
				...prevFormData,
				[name]: value
			}));
		}
		
	};

	const [isUpdateLoading, setIsUpdateLoading] = useState(false);
	const handleSubmit = (event) => {
		event.preventDefault();

		if (!isFormValid) {
			return;
		}

		setIsUpdateLoading(true);

		// Convert form data to JSON
		update();
	};

	const handleUpdateSucess = () => { Sucess(); };

	//Save update
	const update = () => {
		try {
			YCapi.put("clientes/update", {
				id: updateForm.id,
				nome: updateForm.nome,
				cnpj: updateForm.cnpj,
				email: updateForm.email,
				telefone: updateForm.telefone,
				uf: updateForm.uf,
				lat: updateForm.lat,
				lng: updateForm.lng
			});
			handleUpdateSucess();
			setUpdateForm({
				id: "",
				nome: "",
				cnpj: "",
				telefone: "",
				uf: "",
				cep: "",
				email: "",
				logradouro: "",
				bairro: "",
				cidade: "",
				lat: 0,
				lng: 0
			});
			setIsUpdateLoading(false);
			setModal(false);
		} catch (error) {
			alert("Error saving cliente:", error);
		}
	};
	//Quando fecha o modal apaga todos os dados
	const handleDismiss = () => {
		setUpdateForm({
			id: "",
			nome: "",
			cnpj: " ",
			telefone: " ",
			uf: "",
			cep: " ",
			email: "",
			logradouro: "",
			bairro: "",
			cidade: "",
			lat: 0,
			lng: 0
		});
	};
	return (
		<Modal isOpen={modal} toggle={toggle} onClosed={handleDismiss} size="xl" >
			<ModalHeader toggle={toggle} close={toggle} >Atualizar Cliente</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Row style={{ paddingBottom: 10 }}>
							<Col>
							
								<Label for="nome">Nome*</Label>
								<Input
									id="nome"
									name="nome"
									placeholder="Nome"
									type="text"
									value={updateForm.nome}
									onChange={handleChange}
									className={errorForm.nome? "is-invalid" : "is-valid"}
								/>
								{errorForm.nome && (
									<FormFeedback>{errorForm.nome}</FormFeedback>
								)}
								
							
							
							</Col>
						</Row>
					</FormGroup>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="cnpj">CNPJ*</Label>
							<Input

								name="cnpj"
								placeholder="CNPJ"
								type="text"
								value={formatCnpj(updateForm.cnpj)}
								onChange={handleChange}
								required
								minLength={14}
								maxLength={14}
								className={errorForm.cnpj? "is-invalid" : "is-valid"}
							/>
							{errorForm.cnpj && (
								<FormFeedback>{errorForm.cnpj}</FormFeedback>
							)}
						</Col>
						<Col>
							<Label for="telefone">Telefone*</Label>
							<Input

								name="telefone"
								id="telefone"
								type="text"
								value={formatTelefone(updateForm.telefone)}
								onChange={handleChange}
								placeholder="(35) 9 9202-5205"
								required
								minLength={11}
								maxLength={11}
								className={errorForm.telefone? "is-invalid" : "is-valid"}
							/>
							{errorForm.telefone && (
								<FormFeedback>{errorForm.telefone}</FormFeedback>
							)}
						</Col>
					</Row>

					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="IdEmail">E-mail*</Label>
							<Input
								id="IdEmail"
								name="email"
								placeholder="E-mail"
								type="email"
								value={updateForm.email}
								onChange={handleChange}
								className={errorForm.email? "is-invalid" : "is-valid"}
							/>
							{errorForm.email && (
								<FormFeedback>{errorForm.email}</FormFeedback>
							)}
						</Col>

					</Row>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="idCEP">CEP*</Label>

							<Input
								name="cep"
								id="cep"
								type="text"
								value={updateForm.cep}
								onChange={handleChangeCEP}
								placeholder="Insira o CEP"
								required
								minLength={8}
								maxLength={8}
								className={errorForm.cep? "is-invalid" : "is-valid"}
							/>
							{errorForm.cep && (
								<FormFeedback>{errorForm.cep}</FormFeedback>
							)}

						</Col>
						<Col>
							<Label for="IdUF">UF*</Label>
							{isLoadingUfOptions ? (
								<Spinner color="primary" style={{ alignSelf: "center" }} />
							) : (
								<Input
									id="IdUF"
									name="uf"
									placeholder="UF"
									type="select"
									value={updateForm.uf}
									onChange={handleChange}
									className={errorForm.uf? "is-invalid" : "is-valid"}

								>
									{ufOptions.map((option) => (
										<option key={option.id}>{option}</option>
									))}
								</Input>
								
								
							)}
							{errorForm.uf && (
								<FormFeedback>{errorForm.uf}</FormFeedback>
							)}
						</Col>
					</Row>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="IdLogradouro">Logradouro*</Label>
							<Input
								id="IdLogradouro"
								name="logradouro"
								placeholder="Logradouro"
								value={updateForm.logradouro}
								onChange={handleChange}
								className={errorForm.logradouro? "is-invalid" : "is-valid"}
							/>
							{errorForm.logradouro && (
								<FormFeedback>{errorForm.logradouro}</FormFeedback>
							)}
						</Col>

					</Row>
					<Row style={{ paddingBottom: 10 }}>
						<Col xs="4">
							<Label for="IdBairro">Bairro*</Label>

							<Input
								id="IdBairro"
								name="bairro"
								placeholder="Bairro"
								value={updateForm.bairro}
								onChange={handleChange}
								className={errorForm.bairro? "is-invalid" : "is-valid"}
							/>
							{errorForm.bairro && (
								<FormFeedback>{errorForm.bairro}</FormFeedback>
							)}

						</Col>
						<Col>
							<Label for="cidade">Cidade*</Label>
							<Input
								id="cidade"
								name="cidade"
								placeholder="Cidade"
								value={updateForm.cidade}
								onChange={handleChange}
								className={errorForm.cidade? "is-invalid" : "is-valid"}
							/>
							{errorForm.cidade && (
								<FormFeedback>{errorForm.cidade}</FormFeedback>
							)}
						</Col>
					</Row>

				</Form>
				<Row>
					<Col>
						<MapaClienteAtualizar StartLocation={startLocation} onChangeLocation={handleChangeLocation} ClientCoordinates={updateForm} />
					</Col>
				</Row>
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={toggle}>
					Cancel
				</Button>
				<Button disabled={!isFormValid} onClick={handleSubmit} id="salvar" color="primary">
					Salvar
				</Button>
				{isUpdateLoading && (
					<Label>
						Carregando Dados<Spinner color="primary" style={{ alignSelf: "center" }} />
					</Label>
				)}

			</ModalFooter>
		</Modal>
	);
};


AtualizarClienteModal.propTypes = {
	ClienteId: PropTypes.number.isRequired,
	Sucess: PropTypes.func.isRequired
};
  
export default AtualizarClienteModal;