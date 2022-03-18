import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function Popbox({ onUpdate }) {
	const [value, setValue] = useState("");
	const [validated, setValidated] = useState(false);

	const handleSubmit = () => {
		if (value) {
			onUpdate(value);
		} else {
			setValidated(true);
		}
	};

	return (
		<>
			<Modal.Body>
				<Form noValidate validated={validated}>
					<Form.Group className="mb-3">
						<Form.Label>*Reason</Form.Label>
						<Form.Control
							type="text"
							value={value}
							onChange={e => setValue(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Reason does not allow null.
						</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button className="btn btn-primary" onClick={handleSubmit}>
					Submit
				</Button>
			</Modal.Footer>
		</>
	);
}
