/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, arrayOf, func, objectOf, string } from "prop-types";
import {
	Button,
	Col,
	Form,
	FormControl,
	InputGroup,
	Row,
	Tab,
	Tabs
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ACCOUNT_STATUS_LIST, MODE, MODAL_TYPE } from "../def";
import Dropdown from "../../../../components/dropdown";

const ModalAddPersonalMessageFilter = ({
	type,
	form,
	errors,
	currencyList,
	setErrors,
	setField
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Row className="mb-3">
				<Col>
					<Form.Label>{t("CSD.PersonalMessage.PopUp")}</Form.Label>
					<Form.Switch
						checked={form.IsPopup}
						onChange={() => {
							setField("IsPopup", !form.IsPopup);
						}}
					/>
				</Col>
			</Row>

			{type === MODAL_TYPE.NEW && (
				<Tabs onSelect={key => setField("mode", key)} className="mb-3">
					<Tab eventKey={MODE.ONE} title={MODE.ONE}>
						<Row className="mb-3">
							<Col>
								<Dropdown
									title="Currency"
									options={currencyList}
									onSelect={({ value }) => {
										setField("currency", value);
										setErrors(prev => ({
											...prev,
											["currency"]: null
										}));
									}}
									value={form.currency}
									placeholder="-"
								/>
							</Col>

							<Form.Text style={{ color: "red" }}>
								{errors.currency}
							</Form.Text>

							<Col>
								<Dropdown
									title="Account Status"
									options={ACCOUNT_STATUS_LIST}
									value={form.accountStatus}
									onSelect={({ value }) => {
										setField("accountStatus", value);
										setErrors(prev => ({
											...prev,
											["accountStatus"]: null
										}));
									}}
									placeholder="-"
								/>
							</Col>

							<Form.Text style={{ color: "red" }}>
								{errors.accountStatus}
							</Form.Text>
						</Row>
					</Tab>

					<Tab eventKey={MODE.TWO} title={MODE.TWO}>
						<Row>
							<Form.Group className="position-relative mb-3">
								<Form.Label>
									{t(
										"CSD.PersonalMessage.UploadBatchMessage"
									)}
								</Form.Label>

								<InputGroup>
									<FormControl
										type="file"
										id="uploadfile"
										onChange={event => {
											setField(
												"excelUpload",
												event.target.value
											);

											setErrors(prev => ({
												...prev,
												["excelUpload"]: null
											}));
										}}
										accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
									/>

									<a
										role="button"
										href="../../../resource/exampleFile/PersonalMessageTemplateFile.xlsx"
										download="PersonalMessageTemplateFile.xlsx">
										<Button
											variant="outline-secondary"
											id="button-addon2">
											{t("Common.Download")}
										</Button>
									</a>
								</InputGroup>

								<Form.Text style={{ color: "red" }}>
									{errors.excelUpload}
								</Form.Text>
							</Form.Group>
						</Row>
					</Tab>
				</Tabs>
			)}
		</>
	);
};

ModalAddPersonalMessageFilter.propTypes = {
	type: string.isRequired,
	form: objectOf(any).isRequired,
	errors: objectOf(any).isRequired,
	currencyList: arrayOf(any).isRequired,
	setErrors: func.isRequired,
	setField: func.isRequired
};

export { ModalAddPersonalMessageFilter };
