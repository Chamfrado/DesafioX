/* eslint-disable react/prop-types */
import { Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Spinner, Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { BiPencil, BiPlus, BiSearch, BiTrash } from "react-icons/bi";
import { BsChevronDoubleDown, BsDashLg } from "react-icons/bs";
import YCapi from "../../services/YouControllApi";
import CadastrarVendaModal from "../Modals/CadastrarVendaModal";
import AtualizarVendaModal from "../Modals/AtualizarVendaModal";
import DeletarVendaModal from "../Modals/DeletarVendaModal";


const TableVendas = ({ onSaveSucess, onUpdateSucess, onDeleteSucess }) => {

	const [error, setError] = useState();

	//Cuidando da pesquisa 
	const [searchQuery, setSearchQuery] = useState("");
	const handleSearchChange = (event) => {
		const { value } = event.target;
		setSearchQuery(value);
	};

	//Filtro
	const [orderBy, setOrderBy] = useState("nome");
	// eslint-disable-next-line no-unused-vars
	const [isDesc, setIsDesc] = useState("false");

	const handleChangeFiltro = (index) => {
		if (orderBy === index) {
			setIsDesc(!isDesc);
		}
		setOrderBy(index);

	};


	//Pegando os dados da API
	const [tableData, setTableData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const fetchTableData = () => {
		const url = searchQuery ? `vendas?orderBy=${encodeURIComponent(orderBy)}&search=${encodeURIComponent(searchQuery)}` : `vendas?orderBy=${encodeURIComponent(orderBy)}`;
		YCapi.get(url)
			.then((data) => {
				setTableData(data.data);
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
	const [itemsPerPage] = useState(10);
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

	//Abrir Modal de Atualizar Cadastro
	const [selectedVenda, setSelectedVenda] = useState(-1);
	// eslint-disable-next-line no-unused-vars
	const [deleteVenda, setDeleteVenda] = useState(-1);

	//Chamando modal de Cadastro
	const [vendaCadastroModal, setVendaCadastroModal] = useState(false);
	const handleToggleVendaCadastroModal = () => {
		setVendaCadastroModal(!vendaCadastroModal);
	};

	//Confirmando O save do venda
	const handleOnSaveSucess = () => {
		onSaveSucess(true);
		fetchTableData();
	};

	//Confirmando o update do venda
	const handleOnUpdateSucess = () => {
		onUpdateSucess(true);
		fetchTableData();
	};

	//Confirmando o delete do venda
	const handleOnDeleteSucess = () => {
		onDeleteSucess(true);
		fetchTableData();
	};

	if (error) {
		return <p>Error: {error}</p>;
	}


	return (
		<Container fluid >
			<Row style={{ paddingTop: 20, marginBottom: 10 }}>
				<Col style={{ display: "flex", alignItems: "center" }}>
					<Input
						id="search"
						name="searchQuery"
						placeholder="Digite o nome do que deseja pesquisar"
						onChange={handleSearchChange}
						type="search"
					/>
					<Button style={{ marginLeft: 10 }} color='primary'><BiSearch /></Button>

				</Col>
				<Col style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

					<Button onClick={handleToggleVendaCadastroModal} color='primary' ><BiPlus /> Cadastrar Venda</Button>


				</Col>


			</Row>

			<Table responsive hover>
				<thead>
					<tr>
						<th>
							<Button style={{ backgroundColor: "white", borderWidth: 0, color: "black" }} onClick={() => handleChangeFiltro("nome")}><strong>Venda</strong></Button>
							{orderBy === "nome" ? <BsChevronDoubleDown /> : <BsDashLg />}
						</th>
						<th>
							<Button style={{ backgroundColor: "white", borderWidth: 0, color: "black" }} onClick={() => handleChangeFiltro("data")}><strong>Data</strong></Button>
							{orderBy === "data" ? <BsChevronDoubleDown /> : <BsDashLg />}
						</th>
						<th>
							<Button style={{ backgroundColor: "white", borderWidth: 0, color: "black" }} onClick={() => handleChangeFiltro("status")}><strong>Status</strong></Button>
							{orderBy === "status" ? <BsChevronDoubleDown /> : <BsDashLg />}
						</th>
						<th>
							<Button style={{ backgroundColor: "white", borderWidth: 0, color: "black" }} onClick={() => handleChangeFiltro("valor")}><strong>Valor</strong></Button>
							{orderBy === "valor" ? <BsChevronDoubleDown /> : <BsDashLg />}
						</th>
						<th>

						</th>
					</tr>
				</thead>
				<tbody>
					{currentData.map(item => (
						<tr key={item[0]}>
							<td>{item[1]}</td>
							<td>{item[2]}</td>
							<td>{item[3]}</td>
							<td>R$ {item[4]}</td>
							<td>
								<Dropdown isOpen={dropdownOpen === item[0]} toggle={() => toggle(item[0])} direction="down" size="medium">
									<DropdownToggle color='primary' caret>Ações</DropdownToggle>
									<DropdownMenu >
										<DropdownItem onClick={() => setSelectedVenda(item[0])}>
											<BiPencil />
											<Label style={{ paddingLeft: 10, paddingRight: 10 }}>Alterar</Label>
										</DropdownItem>
										<DropdownItem>
											<BiTrash />
											<Label style={{ paddingLeft: 10 }} onClick={() => setDeleteVenda(item[0])}>Excluir</Label>
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{isLoading ? <Spinner color="primary" style={{ alignSelf: "center" }} /> : <></>}
			<Row>
				<Col>
					<Label size="sm">Exibindo {currentPage*10 - 9} a {currentPage*10} dos {tableData.length} itens.</Label>
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
			<AtualizarVendaModal VendaId={selectedVenda} Sucess={handleOnUpdateSucess} />
			<CadastrarVendaModal state={vendaCadastroModal} Sucess={handleOnSaveSucess} onChangeState={handleToggleVendaCadastroModal} />
			<DeletarVendaModal VendaId={deleteVenda} Sucess={handleOnDeleteSucess} />
		</Container>

	);
};

export default TableVendas;