import { useEffect, useState, React } from "react";
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import EstadosApi from "../../services/EstadosApi";
import ViaCepApi from "../../services/ViaCepApi";
import YCapi from "../../services/YouControllApi";
import MapClienteCadastro from "../Maps/MapaClienteCadastro";

// eslint-disable-next-line react/prop-types
const CadastarClienteModal = ({ state, onChangeState, Sucess }) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	//Configuração para Mostrar ou esconder o Modal
	const [modal, setModal] = useState(false);

	//hook do modal
	useEffect(() => {
		setModal(state);
	}, [state]);


	//Controle do modal
	const toggle = () => {
		setModal(!modal);
		onChangeState(modal);
	};

	const handleDismiss = () => {
		onChangeState(false);
	};


	//Configuração do Form
	const [formData, setFormData] = useState({
		nome: "",
		cnpj: "",
		telefone: "",
		uf: "",
		email: "",
		logradouro: "",
		bairro: "",
		cidade: "",
		cep: "",
		lat: "",
		lng: ""
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

	const confirmarCEP = (cep) =>{
		ViaCepApi.get(cep + "/json")
			.then(() => {
				return true;
			}).catch(() => {
				return false;
			});
	};


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

		if(formData.nome === ""){
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

		if(formData.cnpj === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cnpj: "Preencher o CNPJ é obrigatório!"
			}));
			isCnpjValid = false;
		}else if((!formData.cnpj.length === 14)){
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

		if(formData.telefone === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				telefone: "Preencher o telefone é obrigatório!"
			}));
			isTelefoneValid = false;
		}else if((!formData.telefone.length === 11)){
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

		if(formData.email === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				email: "Preencher o email é obrigatório!"
			}));
			isEmailValid = false;
		}else if(!emailRegex.test(formData.email)){
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

		if(formData.cep === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cep: "Preencher o CEP é obrigatório!"
			}));
			isCEPValid = false;
		}else if((formData.cep.replace(/\D/g, "").length !== 8)){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				cep: "O CEP precisa conter 8 caracteres"
			}));
			isCEPValid = false;
		}else if(confirmarCEP(formData.cep)){
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

		if(formData.uf === ""){
			setErrorForm((prevErrorForm) =>({
				...prevErrorForm,
				uf: "Selecione a UF"
			}));
			isUFValid = false;
		}else if(!ufOptions.includes(formData)){
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

		if(formData.uf === ""){
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

		if(formData.logradouro === ""){
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

		if(formData.bairro === ""){
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

		if(formData.cidade === ""){
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

		if(formData.lat && formData.lng){
			isLocalizacaoValid = true;
		}else{
			isLocalizacaoValid = false;
		}

		

		setIsFormValid(isEmailValid&& isLocalizacaoValid && isUFValid && isCnpjValid && isTelefoneValid && isBairroValid && isCEPValid && isNomeValido && isCidadeValid && isLogradouroValid);
	}, [formData]);




	//Handle quando algum form é alterado
	const handleChange = (event) => {
		const { name, value } = event.target;

		if(name === "cnpj" || name=== "telefone"){
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value.replace(/\D/g, "")
			}));
		}else if(name === "cep" && value.length === 8){
			handleChangeCEP(value);
		}else{
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value
			}));
		}
		
	};

	//Quando o CEP é alterado
	// eslint-disable-next-line no-unused-vars
	const handleChangeCEP = (value) => {
		
		const url = value + "/json/?callback=callback_name";

		ViaCepApi.get(url)
			.then(({ data }) => {
				// Remover a função de retorno de chamada da resposta
				const jsonString = data.replace("callback_name(", "").replace(");", "");

				// Converter a string JSON em objeto
				const responseObject = JSON.parse(jsonString);

				// Extrair o logradouro do objeto
				const { logradouro, bairro, localidade, uf } = responseObject;

				setFormData((prevFormData) => ({
					...prevFormData,
					uf: uf,
					logradouro: logradouro,
					bairro: bairro,
					cidade: localidade,
					cep: value
				}));



			})
			.catch(() => {
				setFormData((prevFormData) => ({
					...prevFormData,
					cep: value
				}));
			});
	};


	const handleSaveSucess = () => { Sucess(); };

	//Salvar Usuario
	const [isSaveLoading, setIsSaveLoading] = useState(false);

	///FUNÇÃO PARA SALVAR USUARIO
	async function save() {
		try {
			await YCapi.post("clientes", {
				nome: formData.nome,
				cnpj: formData.cnpj,
				email: formData.email,
				telefone: formData.telefone,
				uf: formData.uf,
				lat: formData.lat,
				lng: formData.lng
			});
			handleSaveSucess();
			setFormData({ // Reset form data to empty values
				nome: "",
				cnpj: "",
				telefone: "",
				uf: "",
				cep:"",
				email: "",
				lat: "",
				lng: "",
			});
			setIsSaveLoading(false);
			setModal(false);
		} catch (error) {
			console.error("Error saving cliente:", error);
		}
	}


	//Handle para completar o Form
	const handleSubmit = (event) => {
		event.preventDefault();
		alert(isFormValid);
		if (!isFormValid) {
			return;
		}

		setIsSaveLoading(true);

		// Convert form data to JSON
		save();
	};

	//######################################################### COMPONENTES

	const handleChangeLocation = (location) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			logradouro: location.logradouro,
			lat: location.lat,
			lng: location.lng,
			cep: location.cep,
			cidade: location.cidade,
			bairro: location.bairro,
			uf: location.uf

		}));
	};

	return (
		<Modal isOpen={modal} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle} close={toggle} onClosed={handleDismiss}>Cadastrar Cliente</ModalHeader>
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
									value={formData.nome}
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
								value={formatCnpj(formData.cnpj)}
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
								value={formatTelefone(formData.telefone)}
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
								value={formData.email}
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
								value={formData.cep}
								onChange={handleChange}
								placeholder="Insira o CEP"
								required
								minLength={9}
								maxLength={9}
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
									value={formData.uf}
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
								value={formData.logradouro}
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
								value={formData.bairro}
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
								value={formData.cidade}
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
						<MapClienteCadastro endereco={formData} onChangeLocation={handleChangeLocation} />
					</Col>
				</Row>
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
		</Modal>
	);
};

export default CadastarClienteModal;
