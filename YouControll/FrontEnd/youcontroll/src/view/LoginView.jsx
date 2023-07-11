/* eslint-disable react/prop-types */
import React, { useState } from "react";
import LogoPng from "../resources/logo.PNG";
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Login = ( { handleLogin } ) => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: "",
		password: ""
	});

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
			alert("Invalid credentials");
		}
	};

	return (
		<div
			style={{
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
				<CardBody>
					<img alt="Card cap" src={LogoPng} width="100%" />
					<Form>
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
					</Form>
					<Button color="primary" onClick={handleSubmit}>
            Accessar
					</Button>
				</CardBody>
			</Card>
		</div>
	);
};

export default Login;
