import { Container } from "reactstrap";
import React, { useEffect, useState } from "react";
import YCapi from "../../services/YouControllApi";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

//Register the required chart.js scales and elements
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const YearChart = () => {
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

		valorPorMes.forEach(([month,]) => {
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
					label: "Vendas",
					data: data,
					backgroundColor: "#0d6efd", // Customize the background color
				},
			],
		};

		return chartData;
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		YCapi.get("/vendas")
			.then(({ data }) => {
				let faturamentoMes = [];

				data.map((item) => {
					const [, mes,] = item[2].split("/");

					faturamentoMes.push([Meses[mes - 1], item[4]]);
					setValorPorMes(faturamentoMes);
				});
			})
			.catch(() => {
				alert("deu ruim");
			});
	};


	return (
		<Container fluid >
			{valorPorMes.length > 0 && <Bar  data={arrumarDados()} />}
		</Container>
	);
};

export default YearChart;