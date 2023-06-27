import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Test from '../components/component_teste/teste';
import { Label } from 'reactstrap';



const Home = () => {

  const [teste,setTeste] = useState();

  const handleteste = (newTeste) => {
    setTeste(newTeste)
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our website.</p>
      <Link to="/Clientes">
        <button>Table view</button>
      </Link>
      <Test onChangeTeste={handleteste}></Test>
      <Label>VALOR DO TESTE: {teste}</Label>
    </div>
  );
};

export default Home;