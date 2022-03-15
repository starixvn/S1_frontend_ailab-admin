import React, { useContext } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading, Loading } from "../../../../components";
import { popBoxContext } from "../../../../components/context";
import Dropdown from "../../../../components/dropdown";

const loading = false;

const ModalAddBankAccount = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const closePopBox = () => {
		setPopBox({
			isOpen: false
		});
	};

	return (
		<>
			{loading && <Loading />}

			<Modal.Body>
				<Row>
					<Form.Group as={Col} lg={12}>
						<Form.Label>
							{t("Common.Currency")}
							<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Dropdown
							options={[
								{
									displayText: "MYR",
									value: 1
								},
								{
									displayText: "MYR",
									value: 0
								}
							]}
							placeholder="-"
						/>
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>Bank</Form.Label>
						<Dropdown
							options={[
								{
									displayText: "Bank1",
									value: 1
								},
								{
									displayText: "Bank2",
									value: 2
								}
							]}
							placeholder="-"
						/>

						<Form.Text style={{ color: "red" }}>
							error message
						</Form.Text>
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>Account Name</Form.Label>

						<Form.Control />

						<Form.Text style={{ color: "red" }}>
							error message
						</Form.Text>
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>Account No</Form.Label>

						<Form.Control />

						<Form.Text style={{ color: "red" }}>
							error message
						</Form.Text>
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>Min Amount</Form.Label>

						<Form.Control />

						<Form.Text style={{ color: "red" }}>
							error message
						</Form.Text>
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>Max Amount</Form.Label>

						<Form.Control />

						<Form.Text style={{ color: "red" }}>
							error message
						</Form.Text>
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>Daily Limit Amount</Form.Label>

						<Form.Control />

						<Form.Text style={{ color: "red" }}>
							error message
						</Form.Text>
					</Form.Group>

					<Form.Group as={Col} md={6} xs={6}>
						<Form.Label>VIP Level</Form.Label>
						<Dropdown
							options={[
								{
									displayText: "1",
									value: 1
								},
								{
									displayText: "2",
									value: 0
								}
							]}
							placeholder="-"
						/>

						<Form.Text style={{ color: "red" }}>
							error message
						</Form.Text>
					</Form.Group>

					<Form.Group as={Col} md={6} xs={6}>
						<Form.Label>Purpose</Form.Label>

						<div className="mb-3">
							<Form.Check
								type="radio"
								value="1"
								label="radio 1"
							/>

							<Form.Check type="radio" label="radio 2" />
						</div>
					</Form.Group>
				</Row>
			</Modal.Body>

			<Modal.Footer>
				<Button
					className="w-25"
					variant="secondary"
					onClick={closePopBox}>
					{t("PopBox.lbl_Cancel")}
				</Button>
				<ButtonWithLoading className="w-25">
					{t("PopBox.lbl_Submit")}
				</ButtonWithLoading>
			</Modal.Footer>
		</>
	);
};

export default ModalAddBankAccount;
