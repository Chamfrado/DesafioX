import { useEffect, useState, React } from "react";
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import EstadosApi from "../../services/EstadosApi";
import ViaCepApi from "../../services/ViaCepApi";
import YCapi from "../../services/YouControllApi";
import MapClienteCadastro from "../Maps/MapaClienteCadastro";

// eslint-disable-next-line react/prop-types
const CadastarClienteModal = ({ state, onChangeState, Sucess }) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
		const isEmailValid = emailRegex.test(formData.email);
		const isCnpjValid = formData.cnpj.length === 14;
		const isTelefoneValid = formData.telefone.length === 11;

		setIsFormValid(isEmailValid && isCnpjValid && isTelefoneValid);
	}, [formData]);




	//Handle quando algum form é alterado
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	};

	//Quando o CEP é alterado
	const handleChangeCEP = (event) => {
		const { value } = event.target;
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

				alert(JSON.stringify(responseObject));

			})
			.catch((error) => {
				alert(error);
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
				email: "",
			});
			setIsSaveLoading(false);
			setModal(false);
		} catch (error) {
			console.error("Error saving cliente:", error);
		}
	}



	const handleSubmit = (event) => {
		event.preventDefault();

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
								type="number"
								value={formatCnpj(formData.cnpj)}
								onChange={handleChange}
								required
								minLength={14}
								maxLength={14}
								className={formData.cnpj.length === 14 ? "is-valid" : "is-invalid"}
							/>
						</Col>
						<Col>
							<Label for="telefone">Telefone*</Label>
							<Input

								name="telefone"
								id="telefone"
								value={formatTelefone(formData.telefone)}
								type="number"
								onChange={handleChange}
								placeholder="(35) 9 9202-5205"
								required
								minLength={11}
								maxLength={11}
								className={formData.telefone.length === 11 ? "is-valid" : "is-invalid"}
							/>
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
								className={formData.email !== "" && !emailRegex.test(formData.email) ? "is-invalid" : "valid"}
							/>
						</Col>

					</Row>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="idCEP">CEP*</Label>

							<Input
								id="IdCEP"
								name="cep"
								placeholder="CEP"
								onChange={handleChangeCEP}
								minLength={8}
								maxLength={8}

							/>

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


								>
									{ufOptions.map((option) => (
										<option key={option.id}>{option}</option>
									))}
								</Input>
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

							/>
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

							/>

						</Col>
						<Col>
							<Label for="IdCidade">Cidade*</Label>
							<Input
								id="IdCidade"
								name="cidade"
								placeholder="Cidade"
								value={formData.cidade}
								onChange={handleChange}
							/>
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
