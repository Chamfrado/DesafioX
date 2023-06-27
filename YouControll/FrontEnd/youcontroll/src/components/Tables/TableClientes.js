import React, { useEffect, useState } from 'react'
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Row, Col, Pagination, PaginationItem, ModalHeader, ModalBody, ModalFooter, PaginationLink, Container, Spinner, Alert, Modal, Button, Form, FormGroup, Input } from 'reactstrap';
import { BiPencil, BiTrash } from 'react-icons/bi';
import YCapi from '../../services/YouControllApi';
import MapClienteCadastro from '../Maps/MapaClienteCadatro';
import axios from 'axios';
import CadastrarClienteModal from '../Modals/CadastrarClienteModal'
import { BiSearch, BiPlus } from "react-icons/bi";


const TableCliente = ({onSaveSucess}) => {

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [error, setError] = useState();
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editSpin, setEditSpin] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    uf: '',
    email: '',
    logradouro: '',
    lat: '',
    lng: '',
    bairro: '',
    cidade: '',
    cep: '',
    id: ''
  })

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    alert(updateForm.logradouro);
  }, [updateForm.logradouro]);




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

  const fetchTableData = () => {
    const url = searchQuery ? `clientes?search=${encodeURIComponent(searchQuery)}` : 'clientes';

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

  useEffect(() => {
    fetchTableData();
  }, [searchQuery]);


  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };




  const [clienteCadastroModal, setClienteCadastroModal] = useState(false);
  const handleToggleClienteCadastroModal = () => {
    setClienteCadastroModal(!clienteCadastroModal)
  }


  const handleOnSaveSucess = () => {
    onSaveSucess(true)
  }



  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <Container fluid>
      <Row style={{ paddingTop: 20, marginBottom: 10 }}>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            id="search"
            name="searchQuery"
            placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar"
            onChange={handleSearchChange}
            type="search"
          />
          <Button style={{ marginLeft: 10 }} color='primary'><BiSearch /></Button>

        </Col>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

          <Button onClick={handleToggleClienteCadastroModal} color='primary' ><BiPlus /> Cadastrar Cliente</Button>
          <CadastrarClienteModal state={clienteCadastroModal} Sucess={handleOnSaveSucess} onChangeState={handleToggleClienteCadastroModal}></CadastrarClienteModal>

        </Col>


      </Row>

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
                <Dropdown isOpen={dropdownOpen === item.id} toggle={() => toggle(item.id)} direction="down" size="medium">
                  <DropdownToggle color='primary' caret>Ações</DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem onClick={() => alert(item.id)}>
                      <BiPencil />
                      <Label style={{ paddingLeft: 10, paddingRight: 10 }}>Alterar</Label>
                      {editSpin ? <Spinner size="sm" color="primary" style={{ alignSelf: 'center' }} /> : <></>}
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
      {isLoading ? <Spinner color="primary" style={{ alignSelf: 'center' }} /> : <></>}
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