import React, { useEffect, useState } from "react";
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Row, Col, Pagination, PaginationItem, PaginationLink, Container, Spinner, Button, Input } from "reactstrap";
import { BiPencil, BiTrash } from "react-icons/bi";
import YCapi from "../../services/YouControllApi";
import CadastrarClienteModal from "../Modals/CadastrarClienteModal";
import { BiSearch, BiPlus } from "react-icons/bi";
import PropTypes from "prop-types";
import AtualizarClienteModal from "../Modals/AtualizarClienteModal";
import DeletarClienteModal from "../Modals/DeletarClienteModal";

import{BsChevronDoubleDown,BsDashLg} from "react-icons/bs";


const TableCliente = ({ onSaveSucess, onUpdateSucess, onDeleteSucess }) => {

	
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
		if (pageNumber < 1) {
			setCurrentPage(1);
		} else if (pageNumber > totalPages) {
			setCurrentPage(totalPages);
		} else {
			setCurrentPage(pageNumber);
		}
	};

	const getPageRange = () => {
		let pageRange = [];

		if (totalPages <= 5) {
			// Display all pages if there are 5 or less
			pageRange = Array.from({ length: totalPages }, (_, index) => index + 1);
		} else {
			// Display the current page, last 2 pages, and next 2 pages
			pageRange = [currentPage];
			const remainingPages = 4 - pageRange.length;

			// Add pages before the current page
			for (let i = currentPage - 1; i > 0 && i >= currentPage - remainingPages; i--) {
				pageRange.unshift(i);
			}

			// Add pages after the current page
			for (let i = currentPage + 1; i <= totalPages && i <= currentPage + remainingPages; i++) {
				pageRange.push(i);
			}

			// Add ellipsis if there are more pages before the current page
			if (pageRange[0] > 1) {
				pageRange.unshift("...");
			}

			// Add ellipsis if there are more pages after the current page
			if (pageRange[pageRange.length - 1] < totalPages) {
				pageRange.push("...");
			}
		}

		return pageRange;
	};
	//Ativação do Dropdown Ações
	const [dropdownOpen, setDropdownOpen] = useState(null);
	const toggle = (index) => {
		setDropdownOpen((prevState) => (prevState === index ? null : index));
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

	//Abrir Modal de Atualizar Cadastro
	const [selectedCliente, setSelectedCliente] = useState(-1);
	//Abrir Modal de Deletar Cliente
	const [deleteCliente, setDeleteCliente] = useState({
		id: -1,
		nome: ""
	});

	//Chamando modal de Cadastro
	const [clienteCadastroModal, setClienteCadastroModal] = useState(false);
	const handleToggleClienteCadastroModal = () => {
		setClienteCadastroModal(!clienteCadastroModal);
	};

	//Confirmando O save do cliente
	const handleOnSaveSucess = () => {
		onSaveSucess(true);
		fetchTableData();
	};

	//Confirmando o update do cliente
	const handleOnUpdateSucess = () => {
		onUpdateSucess(true);
		fetchTableData();
	};

	//Confirmando o delete do cliente
	const handleOnDeleteSucess = () => {
		onDeleteSucess(true);
		fetchTableData();
	};

	if (error) {
		return <p>Error: {error}</p>;
	}


	return (
		<Container id="TableClientes" fluid>
			<Row style={{ paddingTop: 20, marginBottom: 10 }}>
				<Col style={{ display: "flex", alignItems: "center" }}>
					<Input
						id="search"
						name="searchQuery"
						placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar"
						onChange={handleSearchChange}
						type="search"
					/>
					<Button style={{ marginLeft: 10 }} color='primary'><BiSearch /></Button>

				</Col>
				<Col style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

					<Button id="cadastrar" onClick={handleToggleClienteCadastroModal} color='primary' ><BiPlus /> Cadastrar Cliente</Button>


				</Col>


			</Row>
			<Row >
				<Table hover responsive>
					<thead>
						<tr>
							<th>
								<Button id="nome" style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("nome")}><strong>Nome</strong></Button>
								{orderBy === "nome" ? <BsChevronDoubleDown/> : <BsDashLg/>}
							</th>
							<th>
								<Button id="cnpj" style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("cnpj")}><strong>Cnpj</strong></Button>
								{orderBy === "cnpj" ? <BsChevronDoubleDown/> : <BsDashLg/>}
							</th>
							<th>
								<Button id="email" style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("email")}><strong>Email</strong></Button>
								{orderBy === "email" ? <BsChevronDoubleDown/> : <BsDashLg/>}
							</th>
							<th>
								<Button id="telefone" style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("telefone")}><strong>telefone</strong></Button>
								{orderBy === "telefone" ? <BsChevronDoubleDown/> : <BsDashLg/>}
							</th>
							<th>

							</th>
						</tr>
					</thead>
					<tbody>
						{currentData.map(item => (
							<tr key={item.id}>
								<td>{item.nome}</td>
								<td>{formatCnpj(item.cnpj)}</td>
								<td>{item.email}</td>
								<td>{formatTelefone(item.telefone)}</td>
								<td>
									<Dropdown isOpen={dropdownOpen === item.id} toggle={() => toggle(item.id)} direction="down" size="medium">
										<DropdownToggle color='primary' caret>Ações</DropdownToggle>
										<DropdownMenu >
											<DropdownItem id="alterar" onClick={() => { setSelectedCliente(item.id); }}>
												<BiPencil />
												<Label style={{ paddingLeft: 10, paddingRight: 10 }}>Alterar</Label>
											</DropdownItem>
											<DropdownItem id="deletar">
												<BiTrash />
												<Label style={{ paddingLeft: 10 }} onClick={() => setDeleteCliente({ id: item.id, nome: item.nome })}>Excluir</Label>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				{isLoading ? <Spinner color="primary" style={{ alignSelf: "center" }} /> : <></>}
			</Row>

			
			<Row>
				<Col>
					<Label size="sm">Exibindo {currentPage*10 - 9} a {currentPage === totalPages? tableData.length : currentPage*10 }  dos {tableData.length} itens.</Label>
				</Col>
				<Col className="d-flex align-items-end justify-content-end">
					{/* Pagination */}
					<Pagination aria-label="Page navigation example" size="sm">
						<PaginationItem disabled={currentPage === 1}>
							<PaginationLink first onClick={() => handlePageChange(1)} />
						</PaginationItem>
						<PaginationItem disabled={currentPage === 1}>
							<PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
						</PaginationItem>
						{getPageRange().map((page, index) => (
							<PaginationItem key={index} active={currentPage === page}>
								<PaginationLink onClick={() => handlePageChange(page)}>{page}</PaginationLink>
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
			<AtualizarClienteModal ClienteId={selectedCliente} Sucess={handleOnUpdateSucess} />
			<CadastrarClienteModal state={clienteCadastroModal} Sucess={handleOnSaveSucess} onChangeState={handleToggleClienteCadastroModal} />
			<DeletarClienteModal Cliente={deleteCliente} Sucess={handleOnDeleteSucess} />
		</Container>


	);
};

TableCliente.propTypes = {
	onSaveSucess: PropTypes.func.isRequired,
	onUpdateSucess: PropTypes.func.isRequired, 
	onDeleteSucess: PropTypes.func.isRequired
};

export default TableCliente;