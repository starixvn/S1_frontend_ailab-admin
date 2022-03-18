/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, arrayOf, bool, func, objectOf } from "prop-types";
import { useTranslation } from "react-i18next";
import { Col, Form, Row } from "react-bootstrap";
import { FileEarmarkArrowDown, Search } from "react-bootstrap-icons";
import DatetimePicker from "../../../components/datetimePicker";
import Dropdown from "../../../components/dropdown";

import { ButtonWithLoading } from "../../../components";
import { STATUS_TYPE, SORT_TYPE, AGENT_CODE_TYPE, DEPOSIT_STATUS } from "./def";

const RegistrationManagementFilter = ({
	form,
	loading,
	currencyList,
	setField,
	setDateRange,
	onSubmit,
	onExportReport
}) => {
	const { t } = useTranslation();

	return (
		<Form>
			<Row>
				<Form.Group as={Col} md={3}>
					<Form.Label>{t("Common.DateRange")}</Form.Label>

					<DatetimePicker setDateRange={setDateRange} />
				</Form.Group>

				<Form.Group as={Col} md={3}>
					<Form.Label>Currency</Form.Label>
					<Dropdown
						value={{ value: form.currencyId }}
						options={currencyList}
						onSelect={({ value }) => {
							setField("currencyId", value);
						}}
						placeholder="-"
					/>
				</Form.Group>

				<Form.Group as={Col} md={3}>
					<Form.Label>Sort</Form.Label>
					<Dropdown
						value={{ value: form.sort }}
						options={SORT_TYPE}
						onSelect={({ value }) => {
							setField("sort", value);
						}}
						placeholder="-"
					/>
				</Form.Group>

				<Form.Group as={Col} md={3}>
					<Form.Label>Status</Form.Label>
					<Dropdown
						value={{ value: form.status }}
						options={STATUS_TYPE}
						onSelect={data => setField("status", data.value)}
						placeholder="-"
					/>
				</Form.Group>

				<Form.Group as={Col} md={3}>
					<Form.Label>Deposit Status</Form.Label>
					<Dropdown
						value={{ value: form.depositStatus }}
						options={DEPOSIT_STATUS}
						onSelect={data => setField("depositStatus", data.value)}
						placeholder="-"
					/>
				</Form.Group>

				<Form.Group as={Col} md={3}>
					<Form.Label>Agent Code</Form.Label>
					<Dropdown
						value={{ value: form.agentCodeType }}
						options={AGENT_CODE_TYPE}
						onSelect={data => setField("agentCodeType", data.value)}
						placeholder="-"
					/>
				</Form.Group>

				<Form.Group as={Col} md={3}>
					<Form.Label>Affiliate Code</Form.Label>
					<Form.Control
						value={form.affiliatesCode}
						onChange={event =>
							setField("affiliatesCode", event.target.value)
						}
						placeholder="Affiliate Code"
					/>
				</Form.Group>

				<Form.Group as={Col} md={3}>
					<Form.Label>Member Code</Form.Label>

					<Form.Control
						value={form.user}
						onChange={event => {
							setField("user", event.target.value);
						}}
						placeholder="Member Code"
					/>
				</Form.Group>
			</Row>

			<Row>
				<Col md={9} />

				<Col md={3} className="d-flex justify-content-end">
					<ButtonWithLoading
						type="button"
						variant="secondary"
						className="me-2"
						style={{ width: "120px" }}
						onClick={onExportReport}>
						<FileEarmarkArrowDown className="me-2" />
						Export
					</ButtonWithLoading>

					<ButtonWithLoading
						type="button"
						style={{ width: "120px" }}
						loading={loading}
						onClick={onSubmit}>
						<Search className="me-2" />

						{t("PopBox.lbl_Submit")}
					</ButtonWithLoading>
				</Col>
			</Row>
		</Form>
	);
};

RegistrationManagementFilter.propTypes = {
	form: objectOf(any).isRequired,
	loading: bool.isRequired,
	currencyList: arrayOf(any).isRequired,
	setField: func.isRequired,
	setDateRange: func.isRequired,
	onSubmit: func.isRequired,
	onExportReport: func.isRequired
};
export { RegistrationManagementFilter };
