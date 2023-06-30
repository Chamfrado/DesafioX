import { Button, Card, Col, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink, Row, Spinner, Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown, BsDashLg } from "react-icons/bs";
import YCapi from "../../services/YouControllApi";
import { BiSearch } from "react-icons/bi";

// eslint-disable-next-line react/prop-types, no-unused-vars
const PesquisarCliente = ({onClienteSelected, searchState, state, onChangeState }) => {
	const [modal,setModal] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [selectedCliente, setSelectedCliente] = useState({
		id: -1,
		nome: "",
	});
    

	const handleClienteSelected = () => {
		onClienteSelected(selectedCliente);
		toggle();
	};

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


	const [error, setError] = useState();

	//Cuidando da pesquisa 
	const [searchQuery, setSearchQuery] = useState("");
	const handleSearchChange = (event) => {
		const { value } = event.target;
		setSearchQuery(value);
	};

	//Filtro
	const[orderBy,setOrderBy] = useState("nome");
	// eslint-disable-next-line no-unused-vars
	const[isDesc, setIsDesc] = useState("false");

	const handleChangeFiltro = (index) => {
		if(orderBy === index){
			setIsDesc(!isDesc);
		}
		setOrderBy(index);

	};


	//Pegando os dados da API
	const [tableData, setTableData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const fetchTableData = () => {
		const url = searchQuery ? `clientes?orderBy=${encodeURIComponent(orderBy)}&search=${encodeURIComponent(searchQuery)}` : `clientes?orderBy=${encodeURIComponent(orderBy)}` ;
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

	//Inicialização da tabela e Promover pesquisa
	useEffect(() => {
		fetchTableData();
	}, [searchQuery, orderBy, isDesc]);


	//Paginação
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(8);
	const totalPages = Math.ceil(tableData.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentData = tableData.slice(indexOfFirstItem, indexOfLastItem);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};


	//Formatação de dados
	const formatCnpj = (value) => {
		// Remove all non-digit characters
		const digitsOnly = value.replace(/\D/g, "");

		// Apply the formatting mask
		const cnpj = digitsOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

		return cnpj;
	};

	const formatTelefone = (value) => {
		// Remove all non-digit characters
		const digitsOnly = value.replace(/\D/g, "");

		// Apply the formatting mask
		let telefone = digitsOnly.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");

		// Add an extra digit space for numbers with 9 digits
		if (digitsOnly.length > 10) {
			telefone = telefone.replace(/(\d{2}) (\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
		}

		return telefone;
	};


	const handleSelectedCliente = (id, nome) => {
		setSelectedCliente({
			id: id,
			nome:nome
		});

	};
	if (error) {
		return <p>Error: {error}</p>;
	}


	return(
		<Modal isOpen={modal} toggle={toggle} size="xl">
			<ModalHeader toggle={toggle} close={toggle} onClosed={handleDismiss}>Pesquisar Cliente</ModalHeader>
			<ModalBody>
				
				<Row style={{paddingBottom: 10}}>
					<Col style={{ display: "flex", alignItems: "center" }}>
						<InputGroup>
							<InputGroupText>
								<BiSearch/>
							</InputGroupText>
							<Input
								id="search"
								name="searchQuery"
								placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar"
								onChange={handleSearchChange}
								type="search"
							/>
						</InputGroup>
						

					</Col>
				</Row>
				<Card>
					<Table hover>
						<thead>
							<tr>
								<th>
									<Button style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("nome")}><strong>Nome</strong></Button>
									{orderBy === "nome" ? <BsChevronDoubleDown/> : <BsDashLg/>}
								</th>
								<th>
									<Button style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("cnpj")}><strong>Cnpj</strong></Button>
									{orderBy === "cnpj" ? <BsChevronDoubleDown/> : <BsDashLg/>}
								</th>
								<th>
									<Button style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("email")}><strong>Email</strong></Button>
									{orderBy === "email" ? <BsChevronDoubleDown/> : <BsDashLg/>}
								</th>
								<th>
									<Button style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("telefone")}><strong>telefone</strong></Button>
									{orderBy === "telefone" ? <BsChevronDoubleDown/> : <BsDashLg/>}
								</th>
							</tr>
						</thead>
						<tbody>
							{currentData.map(item => (
								<tr key={item.id} style={selectedCliente.id === item.id ? {backgroundColor: "#6c757d"} : {backgroundColor: "#FFFFFF"} } onClick={() => handleSelectedCliente(item.id, item.nome)}>
									<td>{item.nome}</td>
									<td>{formatCnpj(item.cnpj)}</td>
									<td>{item.email}</td>
									<td>{formatTelefone(item.telefone)}</td>
								</tr>
							))}
						</tbody>
					</Table>
					{isLoading ? <Spinner color="primary" style={{ alignSelf: "center" }} /> : <></>}
					<Row>
						<Col className='d-flex align-items-end justify-content-end'>
							{/* Pagination */}

							<Pagination aria-label="Page navigation example" size="sm">
								<PaginationItem disabled={currentPage === 1}>
									<PaginationLink first onClick={() => handlePageChange(1)} />
								</PaginationItem>
								<PaginationItem disabled={currentPage === 1}>
									<PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
								</PaginationItem>
								{Array.from({ length: totalPages }, (_, index) => (
									<PaginationItem key={index} active={currentPage === index + 1}>
										<PaginationLink onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem disabled={currentPage === totalPages}>
									<PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
								</PaginationItem>
								<PaginationItem disabled={currentPage === totalPages}>
									<PaginationLink last onClick={() => handlePageChange(totalPages)} />
								</PaginationItem>
							</Pagination>
						</Col>
					</Row>
				</Card>
				
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={toggle}>
					Cancelar
				</Button>
				<Button color="primary" onClick={handleClienteSelected} className={selectedCliente.id === -1? "disabled": "active"}> Selecionar </Button>
			</ModalFooter>
			
		</Modal>
	);
};

export default PesquisarCliente;