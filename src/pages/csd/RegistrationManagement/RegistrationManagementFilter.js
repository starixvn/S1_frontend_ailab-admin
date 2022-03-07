import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Col, Form, Row, Stack } from "react-bootstrap";
import { FileEarmarkArrowDown, Search } from "react-bootstrap-icons";
import DatetimePicker from "../../../components/datetimePicker";
import Dropdown from "../../../components/dropdown";
import { useGetDateRange, useSelectCurrencies } from "../../../hook";
import { allSiteListContext } from "../../../components/context";
import { ButtonWithLoading } from "../../../components";

const RegistrationManagementFilter = () => {
	const { t } = useTranslation();

	const {
		dateRange: { startDate, endDate },
		setDateRange
	} = useGetDateRange();

	const { allSiteList, siteId } = useContext(allSiteListContext);

	const { currencyList } = useSelectCurrencies({
		siteId,
		allSiteList
	});

	return (
		<Form>
			<Row>
				<Form.Label>{t("Common.DateRange")}</Form.Label>

				<Col lg={4}>
					<DatetimePicker setDateRange={setDateRange} />
				</Col>
			</Row>

			<Row>
				<Form.Group as={Col} lg={4}>
					<Form.Label>Currency</Form.Label>
					<Dropdown
						options={currencyList}
						onSelect={() => null}
						placeholder="-"
					/>
				</Form.Group>

				<Form.Group as={Col} lg={4}>
					<Form.Label>Member Code</Form.Label>

					<Form.Control placeholder="Member Code" />
				</Form.Group>

				<Form.Group as={Col} lg={4}>
					<Form.Label>Status</Form.Label>
					<Dropdown
						options={[]}
						onSelect={() => null}
						placeholder="-"
					/>
				</Form.Group>
			</Row>

			<Row>
				<Form.Group as={Col} lg={4}>
					<Form.Label>Affiliate Code</Form.Label>
					<Form.Control placeholder="Affiliate Code" />
				</Form.Group>

				<Form.Group as={Col} lg={4}>
					<Form.Label>Agent Code</Form.Label>
					<Dropdown
						options={[]}
						onSelect={() => null}
						placeholder="-"
					/>
				</Form.Group>

				<Form.Group as={Col} lg={4}>
					<Form.Label>Deposit Status</Form.Label>
					<Dropdown
						options={[]}
						onSelect={() => null}
						placeholder="-"
					/>
				</Form.Group>
			</Row>

			<Row>
				<Col lg={9} />

				<Col lg={3} className="d-flex justify-content-end">
					<ButtonWithLoading
						type="submit"
						variant="secondary"
						className="me-2">
						<FileEarmarkArrowDown className="me-2" />

						{t("Export")}
					</ButtonWithLoading>

					<ButtonWithLoading type="submit">
						<Search className="me-2" />

						{t("PopBox.lbl_Submit")}
					</ButtonWithLoading>
				</Col>
			</Row>
		</Form>
	);
};

export { RegistrationManagementFilter };
