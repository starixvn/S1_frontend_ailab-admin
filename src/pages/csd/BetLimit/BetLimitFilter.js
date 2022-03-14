import React from "react";
import { func } from "prop-types";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Plus, Search } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading } from "../../../components";
import DatetimePicker from "../../../components/datetimePicker";

const BetLimitFilter = ({
	setField,
	openAddLimitModal,
	setDateRange,
	onSubmit
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Row>
				<Form.Group as={Col} lg={4}>
					<Form.Label>{t("Common.DateRange")}</Form.Label>

					<DatetimePicker setDateRange={setDateRange} />
				</Form.Group>

				<Form.Group as={Col} lg={4}>
					<Form.Label>{t("CSD.BetLimit.UserName")}</Form.Label>

					<Form.Control
						onChange={event =>
							setField("userName", event.target.value)
						}
						placeholder="User Name"
					/>
				</Form.Group>
			</Row>

			<Row>
				<Col lg={9} />

				<Col lg={3} className="d-flex justify-content-end">
					<Button
						type="button"
						className="me-2"
						style={{ width: "120px" }}
						variant="success"
						onClick={openAddLimitModal}>
						<Plus className="fs-5" />

						{t("CSD.PersonalMessage.AddNew")}
					</Button>

					<ButtonWithLoading
						onClick={onSubmit}
						style={{ width: "120px" }}>
						<Search className="me-2" />

						{t("Common.Search")}
					</ButtonWithLoading>
				</Col>
			</Row>
		</>
	);
};

BetLimitFilter.propTypes = {
	setField: func.isRequired,
	openAddLimitModal: func.isRequired,
	setDateRange: func.isRequired,
	onSubmit: func.isRequired
};
export { BetLimitFilter };
