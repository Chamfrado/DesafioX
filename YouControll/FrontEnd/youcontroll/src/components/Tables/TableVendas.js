/* eslint-disable react/prop-types */
import { Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Spinner, Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import { BiPencil, BiPlus, BiSearch, BiTrash } from "react-icons/bi";
import { BsChevronDoubleDown, BsDashLg } from "react-icons/bs";
import YCapi from "../../services/YouControllApi";
import CadastrarVendaModal from "../Modals/CadastrarVendaModal";


const TableVendas = ({onSaveSucess}) => {

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
		const url = searchQuery ? `vendas?orderBy=${encodeURIComponent(orderBy)}&search=${encodeURIComponent(searchQuery)}` : `vendas?orderBy=${encodeURIComponent(orderBy)}` ;
		YCapi.get(url)
			.then(( data ) => {
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
	const [itemsPerPage] = useState(8);
	const totalPages = Math.ceil(tableData.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentData = tableData.slice(indexOfFirstItem, indexOfLastItem);
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	//Ativação do Dropdown Ações
	const [dropdownOpen, setDropdownOpen] = useState(null);
	const toggle = (index) => {
		setDropdownOpen((prevState) => (prevState === index ? null : index));
	};

	//Abrir Modal de Atualizar Cadastro
	//const [selectedVenda, setSelectedVenda] = useState(-1);
	//const [deleteVenda, setDeleteVenda] = useState({
	//	id: -1,
	//	nome: ""
	//});

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

	////Confirmando o update do venda
	//const handleOnUpdateSucess = () => {
	//	onUpdateSucess(true);
	//	fetchTableData();
	//};

	////Confirmando o delete do venda
	//const handleOnDeleteSucess = () => {
	//	onDeleteSucess(true);
	//	fetchTableData();
	//};

	if (error) {
		return <p>Error: {error}</p>;
	}


	return (
		<Container fluid>
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

			<Table hover>
				<thead>
					<tr>
						<th>
							<Button style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("nome")}><strong>Venda</strong></Button>
							{orderBy === "nome" ? <BsChevronDoubleDown/> : <BsDashLg/>}
						</th>
						<th>
							<Button style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("data")}><strong>Data</strong></Button>
							{orderBy === "data" ? <BsChevronDoubleDown/> : <BsDashLg/>}
						</th>
						<th>
							<Button style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("status")}><strong>Status</strong></Button>
							{orderBy === "status" ? <BsChevronDoubleDown/> : <BsDashLg/>}
						</th>
						<th>
							<Button style={{backgroundColor: "white", borderWidth:0, color: "black"}} onClick={() => handleChangeFiltro("valor")}><strong>Valor</strong></Button>
							{orderBy === "valor" ? <BsChevronDoubleDown/> : <BsDashLg/>}
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
										<DropdownItem onClick={() => { alert("selectedId"); }}>
											<BiPencil />
											<Label style={{ paddingLeft: 10, paddingRight: 10 }}>Alterar</Label>
										</DropdownItem>
										<DropdownItem>
											<BiTrash />
											<Label style={{ paddingLeft: 10 }} onClick={() => alert("SelectedId")}>Excluir</Label>
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
			
			<CadastrarVendaModal state={vendaCadastroModal} Sucess={handleOnSaveSucess} onChangeState={handleToggleVendaCadastroModal} />
		</Container>

	);
};

export default TableVendas;