/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, arrayOf, func, objectOf } from "prop-types";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Plus, Search } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading } from "../../../components";
import DatetimePicker from "../../../components/datetimePicker";
import DropdownWithSearch from "../../../components/dropdownWithSearch";

const BetLimitFilter = ({
	currenciesSelected,
	currencyList,
	onSelectCurrency,
	setField,
	openAddLimitModal,
	setDateRange,
	onSubmit
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Row>
				<Form.Group as={Col} md={3}>
					<Form.Label>{t("Common.DateRange")}</Form.Label>

					<DatetimePicker setDateRange={setDateRange} />
				</Form.Group>

				<DropdownWithSearch
					title={t("DepositList.Currency")}
					options={currencyList}
					onSelect={onSelectCurrency}
					selected={currenciesSelected}
					className="btn-group col-md-3 mt-1"
				/>

				<Form.Group as={Col} md={3}>
					<Form.Label>{t("CSD.BetLimit.MemberCode")}</Form.Label>

					<Form.Control
						onChange={event =>
							setField("userName", event.target.value)
						}
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
	currenciesSelected: objectOf(any).isRequired,
	currencyList: arrayOf(any).isRequired,
	onSelectCurrency: func.isRequired,
	setField: func.isRequired,
	openAddLimitModal: func.isRequired,
	setDateRange: func.isRequired,
	onSubmit: func.isRequired
};
export { BetLimitFilter };
