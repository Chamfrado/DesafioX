/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Label, Row, Table } from "reactstrap";
import YCapi from "../../services/YouControllApi";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";// Importe a biblioteca json2csv

// Register the required chart.js scales and elements
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);





const YearChart = ({ Ano }) => {
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
		const labels = Meses;
		const data = [];

		if (valorPorMes.length > 0) {
			valorPorMes.forEach(([month]) => {
				if (!labels.includes(month)) {
					labels.push(month);
				}
			});

			labels.forEach((month) => {
				const monthSales = valorPorMes.filter(([m]) => m === month);
				const salesSum = monthSales.reduce((acc, [, sale]) => acc + sale, 0);
				data.push(salesSum);
			});
		} else {
			labels.forEach(() => {
				data.push(0);
			});
		}

		const chartData = {
			labels: labels,
			datasets: [
				{
					label: "Vendas (R$)",
					data: data,
					backgroundColor: "#0d6efd", // Customize the background color
				},
			],
		};

		return chartData;
	};

	useEffect(() => {
		fetchData();
	}, [Ano]);

	useEffect(() => {
		arrumarDados();
	}, [valorPorMes]);

	const fetchData = () => {
		YCapi.get("/vendas")
			.then(({ data }) => {
				let faturamentoMes = [];

				data.map((item) => {
					const [, mes, ano] = item[2].split("/");
					if (ano === Ano) {
						faturamentoMes.push([Meses[mes - 1], item[4]]);

					}
					setValorPorMes(faturamentoMes);

				});
			})
			.catch(() => {
				alert("deu ruim");
			});
	};

	return (
		<Container fluid style={{ height: "100%" }}>
			<Row style={{ height: "100%" }}>
				<Col style={{ height: "100%" }}>
					<Bar data={arrumarDados()} />
				</Col>
			</Row>
		</Container>
	);
};

// eslint-disable-next-line react/prop-types
const TableRelacaoVendas = ({ onGetTable, Ano }) => {
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
	const [tableData, setTableData] = useState([]);

	const arrumarDados = () => {
		const labels = Meses;
		const data = [];
		if (valorPorMes.length > 0) {
			valorPorMes.forEach(([month]) => {
				if (!labels.includes(month)) {
					labels.push(month);
				}
			});

			labels.forEach((month) => {
				const monthSales = valorPorMes.filter(([m]) => m === month);
				const salesSum = monthSales.reduce((acc, [, sale]) => acc + sale, 0);
				const salesCount = monthSales.length; // Number of sales for the month
				data.push({ month, salesSum, salesCount });
			});
			setTableData(data);
		} else {
			const monthSales = [
				{ month: "janeiro", salesSum: 0, salesCount: 0 },
				{ month: "fevereiro", salesSum: 0, salesCount: 0 },
				{ month: "março", salesSum: 0, salesCount: 0 },
				{ month: "abril", salesSum: 0, salesCount: 0 },
				{ month: "maio", salesSum: 0, salesCount: 0 },
				{ month: "junho", salesSum: 0, salesCount: 0 },
				{ month: "julho", salesSum: 0, salesCount: 0 },
				{ month: "agosto", salesSum: 0, salesCount: 0 },
				{ month: "setembro", salesSum: 0, salesCount: 0 },
				{ month: "outubro", salesSum: 0, salesCount: 0 },
				{ month: "novembro", salesSum: 0, salesCount: 0 },
				{ month: "dezembro", salesSum: 0, salesCount: 0 },];
			setTableData(monthSales);

		}


	};

	useEffect(() => {
		onGetTable(tableData);
	}, [tableData]);


	useEffect(() => {
		fetchData();
	}, [Ano]);

	useEffect(() => {
		arrumarDados();
	}, [valorPorMes]);

	const fetchData = () => {
		YCapi.get("/vendas")
			.then(({ data }) => {
				let faturamentoMes = [];

				data.map((item) => {
					const [, mes, ano] = item[2].split("/");
					if (ano === Ano) {
						faturamentoMes.push([Meses[mes - 1], item[4]]);
						setValorPorMes(faturamentoMes);
					} else if (Ano === "Selecione um ano") {
						setValorPorMes([]);
					}

				});
				arrumarDados();
			})
			.catch(() => {
				alert("deu ruim");
			});
	};



	return (
		<Container fluid style={{ height: "100%" }}>
			<Row style={{ height: "100%" }}>
				<Col style={{ height: "100%" }}>
					{tableData.length > 0 && (
						<Table size="sm" striped bordered responsive style={{ height: "100%" }}>
							<thead  >
								<tr style={{ padding: 1 }}>
									<th style={{ padding: ".15rem .15rem" }}>Mês</th>
									<th style={{ padding: ".15rem .15rem" }}>Vendas</th>
									<th style={{ padding: ".15rem .15rem" }}>Total</th>
								</tr>
							</thead>
							<tbody>
								{tableData.map((item) => (
									<tr key={item.month}  >
										<td style={{ padding: ".10rem .10rem" }}>{item.month}</td>
										<td style={{ padding: ".10rem .10rem" }}>{item.salesCount}</td>
										<td style={{ padding: ".10rem .10rem" }}>{item.salesSum}</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}

				</Col>

			</Row>
		</Container>
	);
};

const VendasPorAno = ({ Ano }) => {
	const [tableData, setTableData] = useState([]);

	const exportToCSV = () => {
		const csvData = Papa.unparse(tableData);

		const element = document.createElement("a");
		const file = new Blob([csvData], { type: "text/csv" });
		element.href = URL.createObjectURL(file);
		element.download = "tableData.csv";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const handleGetTable = (data) => {
		setTableData(data);
	};

	return (
		<Container fluid style={{ height: "50vh", paddingTop: 5 }}>


			<Row style={{ height: "100%" }}>
				<Col style={{ height: "100%" }}>
					<Label className="d-flex align-items-center justify-content-center" for="yearChart" size="lg"><strong>Valor(R$) X Mês</strong></Label>
					<YearChart Ano={Ano} key={"yearChart"} />
				</Col>
				<Col style={{ height: "100%" }}>

					<TableRelacaoVendas Ano={Ano} onGetTable={handleGetTable} />
				</Col >
				<Col sm="1" >
					<Button color="primary" onClick={exportToCSV}>To CSV</Button>
				</Col>

			</Row>


		</Container>
	);
};

export default VendasPorAno;