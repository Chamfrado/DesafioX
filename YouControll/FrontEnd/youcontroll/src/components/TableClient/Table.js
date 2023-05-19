import React, { useEffect, useState } from 'react'
import { FiArrowDown } from "react-icons/fi";


const Table = ({data, indexSelection}) => {

  
  function handleIndexClick(index){
    indexSelection(index)
  }

  return (
    <div style={{ backgroundColor: 'black', padding: 100 }}>
      <table className='table'>
        <thead>
          <tr className='table-tr'>
            <th>
              <button onClick={() => handleIndexClick('nome')} className='table-btn' >Nome<FiArrowDown/></button>
            </th>
            <th>
            <button onClick={() => handleIndexClick('cnpj')} className='table-btn' >CNPJ<FiArrowDown/></button>
            </th>
            <th>
            <button onClick={() => handleIndexClick('email')} className='table-btn' >Email<FiArrowDown/></button>
            </th>
            <th>
            <button onClick={() => handleIndexClick('telefone')} className='table-btn' >Telefone<FiArrowDown/></button>
            </th>
            <th>
            <button onClick={() => handleIndexClick('uf')} className='table-btn' >UF<FiArrowDown/></button>
            </th>
            <th>
            <button onClick={() => handleIndexClick('localizacao')} className='table-btn' >Localização<FiArrowDown/></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.cnpj}</td>
              <td>{item.email}</td>
              <td>{item.telefone}</td>
              <td>{item.uf}</td>
              <td>{item.localizacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Table