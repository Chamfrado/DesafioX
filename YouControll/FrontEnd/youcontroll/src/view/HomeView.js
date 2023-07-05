/* eslint-disable no-unused-vars */
import React, {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Test from "../components/component_teste/teste";
import { Button, Label } from "reactstrap";
import MapaTodosClientes from "../components/Maps/MapaTodosClientes";
import YCapi from "../services/YouControllApi";



const Home = () => {
	const Meses = [
		"Janeiro",
		"fevereiro",
		"marco",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro"
	];
	const [teste, setTeste] = useState();
	const [valorPorMes, setValorPorMes] = useState();
	const handleOi = () => {
		YCapi.get("/vendas").then(({data}) => {
			let faturamentoMes = new Array;
			alert(JSON.stringify(data));
				
			data.map((item) => {
				const [dia, mes, ano] = item[2].split("/");
				faturamentoMes.push([Meses[mes - 1], item[4]]);
				setValorPorMes(faturamentoMes);
			});

			
			
		}).catch(() =>{
			alert("deu ruim");
		});
	};
	

	const handleteste = (newTeste) => {
		setTeste(newTeste);
	};

	

	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<p>This is the home page of our website.</p>
			<Link to="/Clientes">
				<button>Table view</button>
			</Link>
			<Test onChangeTeste={handleteste}></Test>
			<Label>VALOR DO TESTE: {teste}</Label>
			<MapaTodosClientes />
			<Button onClick={handleOi}></Button>
			<Button onClick={() => alert(valorPorMes)}>teste</Button>
		</div>
	);
};

export default Home;