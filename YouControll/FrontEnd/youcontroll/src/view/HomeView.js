/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Label } from "reactstrap";
import MapaTodosClientes from "../components/Maps/MapaTodosClientes";
import YCapi from "../services/YouControllApi";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the required chart.js scales and elements
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
	const Meses = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	const [valorPorMes, setValorPorMes] = useState([]);

	const arrumarDados = () => {
		const labels = [];
		const data = [];

		valorPorMes.forEach(([month, ]) => {
			if (!labels.includes(month)) {
				labels.push(month);
			}
		});

		labels.forEach((month) => {
			const monthSales = valorPorMes.filter(([m]) => m === month);
			const salesSum = monthSales.reduce((acc, [, sale]) => acc + sale, 0);
			data.push(salesSum);
		});

		const chartData = {
			labels: labels,
			datasets: [
				{
					label: "Sales",
					data: data,
					backgroundColor: "rgba(75, 192, 192, 0.6)", // Customize the background color
				},
			],
		};

		return chartData;
	};

	useEffect(() => {
		handleOi();
	}, []);

	const handleOi = () => {
		YCapi.get("/vendas")
			.then(({ data }) => {
				let faturamentoMes = [];

				data.map((item) => {
					const [dia, mes, ano] = item[2].split("/");
					faturamentoMes.push([Meses[mes - 1], item[4]]);
					setValorPorMes(faturamentoMes);
				});
			})
			.catch(() => {
				alert("deu ruim");
			});
	};



	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<p>This is the home page of our website.</p>
			<Link to="/Clientes">
				<button>Table view</button>
			</Link>
			<h1>{valorPorMes.length}</h1>
			<MapaTodosClientes />
			<Button onClick={handleOi}></Button>
			<Button onClick={arrumarDados}>OOOI</Button>
			{valorPorMes.length > 0 && <Bar  data={arrumarDados()} />}
		</div>
	);
};

export default Home;
