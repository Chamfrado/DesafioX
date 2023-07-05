/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import YCapi from "../../services/YouControllApi";

const TableRelacaoVendas = () => {
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
		const labels = [];
		const data = [];

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
	};

	useEffect(() => {
		arrumarDados();
	},[valorPorMes]);

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
				arrumarDados(valorPorMes);
			})
			.catch(() => {
				alert("deu ruim");
			});
	};
	return(
		<Container fluid style={{ height: "100vh", width: "100%", padding: 0 }}>
			{tableData.length > 0 && <Table size="sm" striped bordered responsive style={{ height: "100%" }} >
				<thead>
					<tr>
						<th>
							Mês
						</th>
						<th>
							Vendas
						</th>
						<th>
							Total
						</th>
					
					</tr>
				</thead>
				<tbody>
					{tableData.map(item => (
						<tr key={item.month}>
							<td>{item.month}</td>
							<td>{item.salesCount}</td>
							<td>{item.salesSum}</td>
						</tr>
					))}
				</tbody>
			</Table>}
			<Button onClick={() => alert(JSON.stringify(tableData))}>teste</Button>
			<Button onClick={arrumarDados}>teste</Button>
		</Container>
	);
	
};

export default TableRelacaoVendas;