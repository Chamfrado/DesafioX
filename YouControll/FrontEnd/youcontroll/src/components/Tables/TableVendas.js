import React, {  useState } from "react";
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Row, Col, Pagination, PaginationItem, PaginationLink, Container } from "reactstrap";
import { BiPencil, BiTrash } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const TableVenda = ({ data }) => {
	const [dropdownOpen, setDropdownOpen] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	// eslint-disable-next-line react/prop-types
	const totalPages = Math.ceil(data.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	// eslint-disable-next-line react/prop-types
	const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const toggle = (index) => {
		setDropdownOpen((prevState) => (prevState === index ? null : index));
	};





	return (
		<Container fluid>
			<Table hover>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Data</th>
						<th>Status</th>
						<th>Valor</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{currentData.map((item) => (
						<tr key={item.id}>
							<td>{item.nome}</td>
							<td>{item.data}</td>
							<td>{item.status}</td>
							<td>{item.valor}</td>
							<td>
								<Dropdown isOpen={dropdownOpen === item.id} toggle={() => toggle(item.id)} direction="down" size="medium">
									<DropdownToggle color="primary" caret>
                    Ações
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem>
											<BiPencil />
											<Label style={{ paddingLeft: 10 }}>Alterar</Label>
										</DropdownItem>
										<DropdownItem>
											<BiTrash />
											<Label style={{ paddingLeft: 10 }}>Excluir</Label>
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</td>
						</tr>
					))}
				</tbody>
			</Table>


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



		</Container>
	);
};

export default TableVenda;
