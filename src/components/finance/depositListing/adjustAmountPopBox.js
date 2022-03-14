import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { numericRegex } from "../../common";
import { popBoxContext } from "../../context";

export default function Popbox({ popBoxData }) {
	const [amount, setAmount] = useState("");
	const { AdjustAmount } = popBoxData;
	const { confirm } = useContext(popBoxContext);

	const handleSubmit = () => {
		confirm({
			title: "Are you sure ?",
			onOk() {
				AdjustAmount(amount);
			}
		});
	};

	return (
		<>
			<Modal.Body>
				<Form noValidate>
					<Form.Group className="mb-3">
						<Form.Label>Amount</Form.Label>
						<Form.Control
							type="text"
							value={amount}
							onChange={e =>
								setAmount(
									e.target.value === ""
										? ""
										: numericRegex(e.target.value)
								)
							}
						/>
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
