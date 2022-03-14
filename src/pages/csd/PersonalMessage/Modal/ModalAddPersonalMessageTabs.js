/* eslint-disable react/forbid-prop-types */
import React from "react";
import { useTranslation } from "react-i18next";
import { string, objectOf, any, func, arrayOf } from "prop-types";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { Editor } from "../../../../components/editor";
import { MODAL_TYPE } from "../def";

const ModalAddPersonalMessageTabs = ({
	type,
	form,
	errors,
	setErrors,
	languageList,
	setField,
	setLanguage
}) => {
	const { t } = useTranslation();
	const personalMsg = form?.personalMsg;

	const handleContentChange = (lang, value) => {
		const newPersonalMsg = { ...personalMsg };

		newPersonalMsg[lang] = { ...newPersonalMsg[lang], ...value };

		setField("personalMsg", newPersonalMsg);
	};

	const handleSelect = key => {
		setLanguage(key);
	};

	const isEditType =
		type === MODAL_TYPE.EDIT && Object.keys(personalMsg).length > 0;

	return (
		<Tabs onSelect={handleSelect} className="mb-3">
			{languageList.map(lang => (
				<Tab key={lang} eventKey={lang} title={lang}>
					<Row className="mb-3">
						<Form.Group as={Col}>
							<Form.Label>
								{t("CSD.PersonalMessage.PopUpMessage")}
								{form.IsPopup && (
									<span style={{ color: "red" }}>*</span>
								)}
							</Form.Label>

							<Form.Control
								disabled={!form.IsPopup}
								type="text"
								value={personalMsg[lang]?.PopupMessage ?? ""}
								onChange={e => {
									handleContentChange(lang, {
										PopupMessage: e.target.value
									});

									setErrors(prev => ({
										...prev,
										["popupMessage"]: null
									}));
								}}
							/>

							<Form.Text style={{ color: "red" }}>
								{errors.popupMessage}
							</Form.Text>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col}>
							<Form.Label>
								{t("Common.Title")}
								{lang === "en" && (
									<span style={{ color: "red" }}>*</span>
								)}
							</Form.Label>
							<Form.Control
								type="text"
								value={personalMsg[lang]?.Title ?? ""}
								onChange={e => {
									handleContentChange(lang, {
										Title: e.target.value
									});
									setErrors(prev => ({
										...prev,
										["title"]: null
									}));
								}}
							/>
							<Form.Text style={{ color: "red" }}>
								{errors.title}
							</Form.Text>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col}>
							<Form.Label>
								{t("Common.Content")}
								{lang === "en" && (
									<span style={{ color: "red" }}>*</span>
								)}
							</Form.Label>

							{(type === MODAL_TYPE.NEW || isEditType) && (
								<Editor
									defaultHtml={personalMsg[lang]?.Content}
									onChange={_content => {
										handleContentChange(lang, {
											Content: _content
										});

										setErrors(prev => ({
											...prev,
											["content"]: null
										}));
									}}
								/>
							)}

							<Form.Text style={{ color: "red" }}>
								{errors.content}
							</Form.Text>
						</Form.Group>
					</Row>
				</Tab>
			))}
		</Tabs>
	);
};

ModalAddPersonalMessageTabs.propTypes = {
	type: string.isRequired,
	form: objectOf(any).isRequired,
	errors: objectOf(any).isRequired,
	setErrors: func.isRequired,
	languageList: arrayOf(any).isRequired,
	setField: func.isRequired,
	setLanguage: func.isRequired
};
export { ModalAddPersonalMessageTabs };
