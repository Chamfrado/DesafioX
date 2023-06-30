import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Label, Col, Row } from "reactstrap";
import { format } from "date-fns";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR); // Register the pt-BR locale

// eslint-disable-next-line react/prop-types
const CustomDatePicker = ({ onChange }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
		onChange(format(date, "dd/MM/yyyy")); // Format the date and pass the formatted value
	};

	return (
		<FormGroup row >
			<Row>
				<Label sm={3}>Data*</Label>
			</Row>
			
			<Col xs={12}>
				<DatePicker
					selected={selectedDate}
					onChange={handleDateChange}
					dateFormat="dd/MM/yyyy" // Set the desired display format
					customInput={<input className="form-control" />}
					popperPlacement="bottom-start"
					locale="pt-BR" // Set the locale to pt-BR
				/>
			</Col>
		</FormGroup>
	);
};

export default CustomDatePicker;
