import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Plus, Search } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading } from "../../../components";
import Dropdown from "../../../components/dropdown";

const BankAccountFilter = ({ openAddModal }) => {
	const { t } = useTranslation();

	return (
		<>
			<Row>
				<Form.Group as={Col} lg={4}>
					<Form.Label>Currency</Form.Label>
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

				<Form.Group as={Col} lg={4}>
					<Form.Label>Status</Form.Label>
					<Dropdown
						options={[
							{
								displayText: "Open",
								value: 1
							},
							{
								displayText: "Closed",
								value: 0
							}
						]}
						placeholder="-"
					/>
				</Form.Group>
			</Row>

			<Row>
				<Col lg={9} />

				<Col lg={3} className="d-flex justify-content-end">
					<Button
						onClick={openAddModal}
						type="button"
						className="me-2"
						style={{ width: "120px" }}
						variant="success">
						<Plus className="fs-5" />

						{t("CSD.PersonalMessage.AddNew")}
					</Button>

					<ButtonWithLoading style={{ width: "120px" }}>
						<Search className="me-2" />

						{t("Common.Search")}
					</ButtonWithLoading>
				</Col>
			</Row>
		</>
	);
};

export { BankAccountFilter };
