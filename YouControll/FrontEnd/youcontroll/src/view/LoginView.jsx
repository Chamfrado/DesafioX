/* eslint-disable react/prop-types */
import React, { useState } from "react";
import LogoPng from "../resources/logo.PNG";
import { Alert, Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLogin }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: "",
		password: ""
	});
	const [invalidUser, setInvalidUser] = useState(false);

	const onDismissInvalid = () => { setInvalidUser(!invalidUser); };

	const handleChange = (event) => {
		const { name, value } = event.target;

		setUser((prevUser) => ({
			...prevUser,
			[name]: value
		}));
	};

	const handleSubmit = () => {
		if (user.username === "chamfrado" && user.password === "123") {
			// Call the handleLogin function to update authentication status
			handleLogin();

			// Redirect to the protected route (e.g., dashboard) after successful login
			navigate("/protected");
		} else {
			setInvalidUser(true);
		}
	};

	return (
		<Row id="LoginContainer">
			<Col style={{marginTop: 20, marginRight: 20, marginBottom:10}} >
				<div
					style={{
						borderRadius: 10,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh"
					}}
					className="bg-primary"
				>
					<Card
						style={{
							width: "18rem",
							borderRadius: "8px",
							boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)"
						}}
					>
						{invalidUser && <Alert id="incorrectAlert" isOpen={invalidUser} toggle={onDismissInvalid} color="danger">Usuario invalido!</Alert>}
						<CardBody>
							<img alt="Card cap" src={LogoPng} width="100%" />
							<Form>
								<Row>
									<Col>
										<FormGroup floating>
											<Input
												id="username"
												name="username"
												onChange={handleChange}
												placeholder="Username"
												type="username"
												value={user.username}
											/>
											<Label for="username">Username</Label>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup floating>
											<Input
												id="password"
												name="password"
												onChange={handleChange}
												placeholder="Password"
												type="password"
												value={user.password}
											/>
											<Label for="password">Password</Label>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col className="d-flex align-items-center justify-content-center">
										<Button id="btnLogin" color="primary" onClick={handleSubmit}>
								Accessar
										</Button>
									</Col>
							
								</Row>

							</Form>

						</CardBody>
					</Card>
				</div>
				
			</Col>
			
		</Row>
		
	);
};

export default Login;
