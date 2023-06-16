import React, {  useState } from 'react'
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';
import { BiPencil, BiTrash } from 'react-icons/bi';

const TableCliente = ({ data }) => {

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const toggle = (index) => {
    setDropdownOpen((prevState) => (prevState === index ? null : index));
  };

  const formatCnpj = (value) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');

    // Apply the formatting mask
    const cnpj = digitsOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

    return cnpj;
};

  const formatTelefone = (value) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
  
    // Apply the formatting mask
    let telefone = digitsOnly.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    
    // Add an extra digit space for numbers with 9 digits
    if (digitsOnly.length > 10) {
      telefone = telefone.replace(/(\d{2}) (\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    }
  
    return telefone;
  };

  return (
    <Container fluid>
      <Table hover>
        <thead>
          <tr>
            <th>
              Nome
            </th>
            <th>
              CNPJ
            </th>
            <th>
              Email
            </th>
            <th>
              Telefone
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
              <Dropdown  isOpen={dropdownOpen === item.id} toggle={() => toggle(item.id)} direction="down" size="medium">
                  <DropdownToggle color='primary' caret>Ações</DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem >
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

export default TableCliente