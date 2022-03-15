/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, arrayOf, func, objectOf } from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Plus, Search } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading } from "../../../components";
import DropdownWithSearch from "../../../components/dropdownWithSearch";

const BankAccountFilter = ({
	currencyList,
	currenciesSelected,
	onSelectCurrency,
	bankDetailOptions,
	bankOptionSelected,
	onBankDetailSelect,
	openAddModal,
	onSubmit
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Row>
				<DropdownWithSearch
					title={t("DepositList.Currency")}
					options={currencyList}
					onSelect={onSelectCurrency}
					selected={currenciesSelected}
					className="btn-group col-md-4 mt-1"
				/>

				<DropdownWithSearch
					title="Status"
					options={bankDetailOptions}
					selected={bankOptionSelected}
					onSelect={onBankDetailSelect}
					className="btn-group col-md-4 mt-1"
				/>
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

					<ButtonWithLoading
						style={{ width: "120px" }}
						onClick={onSubmit}>
						<Search className="me-2" />

						{t("Common.Search")}
					</ButtonWithLoading>
				</Col>
			</Row>
		</>
	);
};

BankAccountFilter.propTypes = {
	currencyList: arrayOf(any).isRequired,
	currenciesSelected: objectOf(any).isRequired,
	onSelectCurrency: func.isRequired,
	bankDetailOptions: objectOf(any).isRequired,
	bankOptionSelected: objectOf(any).isRequired,
	onBankDetailSelect: func.isRequired,
	openAddModal: func.isRequired,
	onSubmit: func.isRequired
};
export { BankAccountFilter };
