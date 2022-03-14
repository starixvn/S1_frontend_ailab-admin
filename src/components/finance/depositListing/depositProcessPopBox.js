import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const defStatus = {
	Draft: 0,
	Pending: 1,
	Paid: 2,
	Approved: 3,
	Rejected: 4,
	Canceled: 5,
	Expired: 6,
	OnHold: 7
};

export default function Popbox({ popBoxData }) {
	const [remark, setRemark] = useState("");
	const { transId, depositType, depositStatus, UpdateStatus } = popBoxData;

	const HandleStatus = status => UpdateStatus({ transId, remark, status });

	return (
		<>
			<Modal.Body>
				<Form noValidate>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTextarea1">
						<Form.Label>Remark</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							value={remark}
							onChange={e => setRemark(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				{(depositStatus === defStatus.Pending ||
					depositStatus === defStatus.OnHold) && (
					<Button
						variant="info"
						onClick={() => HandleStatus(defStatus.Draft)}>
						Draft
					</Button>
				)}

				{depositStatus === defStatus.OnHold && depositType === 3 && (
					<Button
						variant="warning"
						onClick={() => HandleStatus(defStatus.Pending)}>
						Pending
					</Button>
				)}

				{depositStatus === defStatus.Pending && depositType === 3 && (
					<Button
						variant="warning"
						onClick={() => HandleStatus(defStatus.OnHold)}>
						OnHold
					</Button>
				)}

				{depositStatus === defStatus.Pending &&
					(depositType === 3 || depositType === 4) && (
						<Button
							variant="success"
							onClick={() => HandleStatus(defStatus.Approved)}>
							Approved
						</Button>
					)}

				{depositStatus === defStatus.Pending && (
					<Button
						variant="danger"
						onClick={() => HandleStatus(defStatus.Rejected)}>
						Rejected
					</Button>
				)}
			</Modal.Footer>
		</>
	);
}
