import React from "react";
import {  Col, Container, Row, Toast, ToastBody, ToastHeader } from "reactstrap";

const DadosImportantes = () => {
	return (
		<Container fluid >
			
			<Row  style={{ paddingTop: 20, marginLeft: "1%", marginRight: "1%", paddingBottom: 30 }}>

				<Col xs="3" style={{ marginTop: 5 }}>
					<Toast>
						<ToastHeader className="bg-primary " style={{ color: "white" }}>
                            Vendas no ano
						</ToastHeader>
						<ToastBody className="">
                            R$ 500.000,00
						</ToastBody>
					</Toast>
				</Col>

				<Col xs="3" style={{ marginTop: 5 }}>
					<Toast>
						<ToastHeader className="bg-primary " style={{ color: "white" }}>
                            Cliente com mais vendas no mês
						</ToastHeader>
						<ToastBody className="">
                            Joaquim Adolfo
						</ToastBody>
					</Toast>
				</Col >
				<Col xs="3" style={{ marginTop: 5 }}>
					<Toast>
						<ToastHeader className="bg-primary " style={{ color: "white" }}>
                            Cliente com maior faturamento(mês)
						</ToastHeader>
						<ToastBody className="">
                            João
						</ToastBody>
					</Toast>
				</Col>
				<Col xs="3" style={{ marginTop: 5 }}>
					<Toast>
						<ToastHeader className="bg-primary " style={{ color: "white" }}>
                            Cliente com maior faturamento(ano)
						</ToastHeader>
						<ToastBody className="">
                            Roberto
						</ToastBody>
					</Toast>
				</Col>


			</Row>
		</Container>
		
	);
};

export default DadosImportantes;