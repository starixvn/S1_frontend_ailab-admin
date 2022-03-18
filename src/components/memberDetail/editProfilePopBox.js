import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import dayjs from "dayjs";
import { popBoxContext } from "../context";
import { useGetDateRange } from "../../hook";
import DatetimePicker from "../datetimePicker";
import { api_customerManage_SetCustInfo } from "../../service/api/customerManage";

export default function Popbox({ onUpdate }) {
	const { confirm, popBox, setPopBox } = useContext(popBoxContext);
	const { dateRange: birth, setDateRange: setBirth } = useGetDateRange();

	const [fullName, setFullName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = () => {
		confirm({
			title: "Are you sure ?",
			async onOk() {
				try {
					const { custInfo } = popBox;
					const res = await api_customerManage_SetCustInfo({
						...custInfo,
						fullName: fullName || custInfo.fullName,
						phone: phone || custInfo.phone,
						eMail: email || custInfo.eMail,
						birthday_Y: birth
							? Number(dayjs(birth?.startDate).format("YYYY"))
							: custInfo.birthday_Y,
						birthday_M: birth
							? Number(dayjs(birth?.startDate).format("MM"))
							: custInfo.birthday_M,
						birthday_D: birth
							? Number(dayjs(birth?.startDate).format("DD"))
							: custInfo.birthday_D
					});

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						onUpdate();
						setPopBox({ isOpen: false });
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	return (
		<>
			<Modal.Body>
				<Form noValidate>
					<Form.Group className="mb-3">
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							type="text"
							value={fullName}
							onChange={e => setFullName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<h6>Date of Birth</h6>
						<DatetimePicker
							id="DOB"
							setDateRange={setBirth}
							isRange={false}
							timePicker={false}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Contact No.</Form.Label>
						<Form.Control
							type="text"
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="text"
							value={email}
							onChange={e => setEmail(e.target.value)}
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
