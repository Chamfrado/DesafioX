import React, { useEffect, useState } from 'react'
import Table from '../components/TableClient/Table'
import { Link } from 'react-router-dom';

import api from '../services/YouControllApi'


const TableView = () => {
  const [nome, setNome] = useState('TESTEE')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [uf, setUf] = useState('')
  const [local, setLocal] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('cliente')


  const indexSelection = (index) => {
    setSelectedIndex(index);
    const sortedData = sortTableData(index); // Sort the table data
    setTableData(sortedData); // Update the sorted table data
  };

  //FUNÇÃO PARA CARREGAR OS DADOS DA TABELA

  const sortTableData = (selectedIndex) => {
    // Sort the tableData array based on the selected index
    const sortedData = [...tableData].sort((a, b) => {
      const valueA = a[selectedIndex] || ''; // Handle undefined values
      const valueB = b[selectedIndex] || ''; // Handle undefined values
      return valueA.localeCompare(valueB);
    });
    return sortedData;
  };


  const fetchTableData = () => {
    api.get('clientes')
      .then(({ data }) => {
        setTableData(data)
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }






  //FUNÇÃO PARA SALVAR USUARIO
  function save() {
    api.post('clientes',
      {
        nome: nome,
        cnpj: cnpj,
        email: email,
        telefone: telefone,
        uf: uf,
        localizacao: local
      }).then(() => {
        alert('Cliente adicionado com sucesso!')
        fetchTableData(); // Refresh table data
      })

  }

  return (
    <div style={{backgroundColor:'Black', justifyContent:"flex-start"}}>

        <Table indexSelection={indexSelection} data={tableData} />

        <div style={{ alignItems: 'center' }}>
          <div style={{ flexDirection: 'row', padding: 10 }}>
            <text style={{ paddingRight: 10 }} >nome:</text>
            <input onChange={(event) => setNome(event.target.value)} className='input'></input>
          </div>
          <div style={{ flexDirection: 'row', padding: 10 }}>
            <text style={{ paddingRight: 10 }} >CNPJ:</text>
            <input onChange={(event) => setCnpj(event.target.value)} className='input'></input>
          </div>
          <div style={{ flexDirection: 'row', padding: 10 }}>
            <text style={{ paddingRight: 10 }} >Email:</text>
            <input onChange={(event) => setEmail(event.target.value)} className='input'></input>
          </div>
          <div style={{ flexDirection: 'row', padding: 10 }}>
            <text style={{ paddingRight: 10 }} >Telefone:</text>
            <input onChange={(event) => setTelefone(event.target.value)} className='input'></input>
          </div>
          <div style={{ flexDirection: 'row', padding: 10 }}>
            <text style={{ paddingRight: 10 }} >UF:</text>
            <input onChange={(event) => setUf(event.target.value)} className='input'></input>
          </div>
          <div style={{ flexDirection: 'row', padding: 10 }}>
            <text style={{ paddingRight: 10 }} >Localização:</text>
            <input onChange={(event) => setLocal(event.target.value)} className='input'></input>
          </div>
        </div>
        <button className='btn' onClick={() => save()}>adicionar</button>
        <h1>{selectedIndex}</h1>
        <Link to="/Test">
        <button>Test view</button>
      </Link>
      

    </div>

  );
};

export default TableView;