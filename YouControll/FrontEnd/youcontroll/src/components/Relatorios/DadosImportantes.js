/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Label, Row, Toast, ToastBody, ToastHeader } from "reactstrap";
import YCapi from "../../services/YouControllApi";
import {BiDollar, BiCalendarStar, BiUser} from "react-icons/bi";


// eslint-disable-next-line react/prop-types
const DadosImportantes = ({Ano}) => {
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

	const [vendas, setVendas] = useState([{}]);
	const [totalVendas, setTotalVendas] = useState(0);
	const [mediaVendas, setMediaVendas] = useState(0);
	const [melhorMes, setMelhorMes] = useState({
		mes: "",
		totalMes: 0
	});
	const [clienteAnual, setClienteAnual] = useState({
		cliente: "",
		valor: 0
	});


	const calculaTotal = () => {
		let total = 0;

		vendas.map((item) => {
			total += item.valor;
		});
		setTotalVendas(total.toFixed(2));
	};

	const calculaMedia = () => {
		let total = 0;

		vendas.map((item) => {
			total += item.valor;

		});
		setMediaVendas((total / 12).toFixed(2));
	};

	const calculaMelhorMes = () => {
		const meses = [];
		const data = [];
		let topMes = {mes: "janeiro", totalMes: 0};

		vendas.forEach((item) => {
			if (!meses.includes(item.date)) {
				meses.push(item.date);
			}
		});

		meses.forEach((mes) => {
			const vendasMes = vendas.filter((venda) => venda.date === mes);
			const totalMes = vendasMes.reduce((acc, sale) => acc + sale.valor, 0);
			data.push({ mes, totalMes });
		});

		data.map((mes) =>{
			if(mes.totalMes> topMes.totalMes){
				topMes = mes;
			}
		});

		setMelhorMes(topMes);

	};

	const calculaMelhorCliente = () => {
		let ClienteValor = { cliente: "", valor: 0 };
		vendas.map((item) => {
			if (ClienteValor.valor < item.valor) {
				ClienteValor.valor = item.valor;
				ClienteValor.cliente = item.clienteNome;
			}

		});

		setClienteAnual(ClienteValor);
	};
	
	useEffect(() => {
		fetchVendas();
	}, [Ano]);
	useEffect(() => {
		calculaMedia();
		calculaTotal();
		calculaMelhorMes();
		calculaMelhorCliente();

	}, [vendas]);


	const fetchVendas = () => {
		YCapi.get("/vendas")
			.then(({ data }) => {
				let faturamentoMes = [];

				data.map((item) => {
					const [, mes, ano] = item[2].split("/");
					if(ano === Ano){
						const id = item[0];
						const clienteNome = item[1];
						const date = Meses[mes - 1];
						const valor = item[4];
						faturamentoMes.push({ id, clienteNome, date, valor });

					}
					


				});
				setVendas(faturamentoMes);
			})
			.catch(() => {
				console.log("fetch deu errado");
			});
	};


	return (
		<Container fluid >
			
			<Row style={{ paddingTop: 20, marginLeft: "1%", marginRight: "1%", paddingBottom: 30 }}>

				<Col xs="3" style={{ marginTop: 5 }}>
					<Toast>
						<ToastHeader className="bg-primary " style={{ color: "white" }}>
							Total em vendas no ano
						</ToastHeader>
						<ToastBody >
							<Label className="d-flex align-items-center justify-content-center" size="lg"><BiDollar style={{marginRight: 10, color:"#0d6efd"}} /> R$ {totalVendas}</Label>
						</ToastBody>
					</Toast>
				</Col>

				<Col xs="3" style={{ marginTop: 5 }}>
					<Toast>
						<ToastHeader className="bg-primary " style={{ color: "white" }}>
							Media mensal de vendas
						</ToastHeader>
						<ToastBody >
							<Label className="d-flex align-items-center justify-content-center" size="lg"><BiDollar style={{marginRight: 10, color:"#0d6efd"}} />R$ {mediaVendas}</Label>
						</ToastBody>
					</Toast>
				</Col >
				<Col xs="3" style={{ marginTop: 5 }}>
					<Toast>
						<ToastHeader className="bg-primary " style={{ color: "white" }}>
							Cliente com maior faturamento por mês
						</ToastHeader>
						<ToastBody >
							<Label className="d-flex align-items-center justify-content-center" size="lg"><BiCalendarStar style={{marginRight: 10, color:"#0d6efd"}} />{melhorMes.mes} (R$ {melhorMes.totalMes.toFixed(2)})</Label>
						</ToastBody>
					</Toast>
				</Col>
				<Col xs="3" style={{ marginTop: 5 }}>
					<Toast>
						<ToastHeader className="bg-primary " style={{ color: "white" }}>
							Cliente com maior faturamento no ano
						</ToastHeader>
						<ToastBody className="">
							<Label className="d-flex align-items-center justify-content-center" size="lg"><BiUser style={{marginRight: 10, color:"#0d6efd"}} />{clienteAnual.cliente} (R$ {clienteAnual.valor.toFixed(2)})</Label>
						</ToastBody>
					</Toast>
				</Col>


			</Row>
		</Container>

	);
};

export default DadosImportantes;