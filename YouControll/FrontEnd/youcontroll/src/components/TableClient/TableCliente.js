import React, {  useState } from 'react'
import {  Table,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from 'reactstrap'
import { BiPencil, BiTrash } from "react-icons/bi";

const TableCliente = ({ data }) => {

  const [dropdownOpen, setDropdownOpen] = useState(null);

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
    <div>
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
          {data.map(item => (
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
      
    </div>

  );
};

export default TableCliente