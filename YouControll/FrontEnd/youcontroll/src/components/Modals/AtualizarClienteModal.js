/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import YCapi from "../../services/YouControllApi";
import MapaClienteAtualizar from "../Maps/MapaClienteAtualizar";
import EstadosApi from "../../services/EstadosApi";
import ViaCepApi from "../../services/ViaCepApi";

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
		const isEmailValid = emailRegex.test(updateForm.email);
		const isCnpjValid = updateForm.cnpj.length === 14;
		const isTelefoneValid = updateForm.telefone.length === 11;

		setIsFormValid(isEmailValid && isCnpjValid && isTelefoneValid);
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
		const { value } = event.target;
		const url = value + "/json/?callback=callback_name";
		setUpdateForm(((prevUpdateForm) =>({
			...prevUpdateForm,
			cep: value
		})));
		ViaCepApi.get(url)
			.then(({ data }) => {
				// Remover a função de retorno de chamada da resposta
				const jsonString = data.replace("callback_name(", "").replace(");", "");

				// Converter a string JSON em objeto
				const responseObject = JSON.parse(jsonString);

				// Extrair o logradouro do objeto
				const { logradouro, bairro, localidade, uf } = responseObject;
        
				setUpdateForm((prevUpdateForm) => ({
					...prevUpdateForm,
					uf: uf,
					logradouro: logradouro,
					bairro: bairro,
					cidade: localidade,
					cep: value
				}));
        

			})
			.catch((error) => {
				console.log(error);
			});
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
			cep: location.cep,
			cidade: location.cidade,
			bairro: location.bairro,
			uf: location.uf

		}));
	};

	//Handle quando algum form é alterado
	const handleChange = (event) => {
		const { name, value } = event.target;

		setUpdateForm((prevUpdateForm) => ({
			...prevUpdateForm,
			[name]: value
		}));
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

	const handleUpdateSucess = () => {Sucess();};

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
			cnpj: "",
			telefone: "",
			uf: "",
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
								value={formatCnpj(updateForm.cnpj)}
								onChange={handleChange}
								required
								minLength={14}
								maxLength={14}
								className={updateForm.cnpj.length === 14 ? "is-valid" : "is-invalid"}
							/>
						</Col>
						<Col>
							<Label for="telefone">Telefone*</Label>
							<Input

								name="telefone"
								id="telefone"
								value={formatTelefone(updateForm.telefone)}
								onChange={handleChange}
								placeholder="(35) 9 9202-5205"
								required
								minLength={11}
								maxLength={11}
								className={updateForm.telefone.length === 11 ? "is-valid" : "is-invalid"}
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
								value={updateForm.email}
								onChange={handleChange}
								className={updateForm.email !== "" && !emailRegex.test(updateForm.email) ? "is-invalid" : "valid"}
							/>
						</Col>

					</Row>
					<Row style={{ paddingBottom: 10 }}>
						<Col>
							<Label for="idCEP">CEP*</Label>

							<Input
								id="IdCEP"
								name="cep"
								value={updateForm.cep}
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
									value={updateForm.uf}
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
								value={updateForm.logradouro}
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
								value={updateForm.bairro}
								onChange={handleChange}

							/>

						</Col>
						<Col>
							<Label for="IdCidade">Cidade*</Label>
							<Input
								id="IdCidade"
								name="cidade"
								placeholder="Cidade"
								value={updateForm.cidade}
								onChange={handleChange}
							/>
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
				<Button onClick={handleSubmit} color="primary">
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

export default AtualizarClienteModal;