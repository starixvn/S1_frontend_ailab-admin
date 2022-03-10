/* eslint-disable dot-notation */
import React, { useState, useContext, useEffect } from "react";
import { number, shape, string } from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Modal, Form } from "react-bootstrap";
import {
	allSiteListContext,
	popBoxContext
} from "../../../../components/context";
import { useLanguageState, useSelectCurrencies } from "../../../../hook";

import { ModalAddPersonalMessageFilter } from "./ModalAddPersonalMessageFilter";
import { ModalAddPersonalMessageTabs } from "./ModalAddPersonalMessageTabs";
import { MODAL_TYPE, MODE } from "../def";
import {
	useGetBatchMessageFetcher,
	useSendMessageBatchFetcher,
	useUpdateBatchMessageFetcher
} from "../hook";
import { ButtonWithLoading } from "../../../../components";

const formValidator = ({ form, language, type }) => {
	const newErrors = {};

	if (form.IsPopup) {
		if (!form?.personalMsg?.[language]?.PopupMessage) {
			newErrors["popupMessage"] = "the pop up message is required.";
		}
	}

	if (type === MODAL_TYPE.NEW) {
		if (form.optSite === 1) {
			if (language === "en") {
				if (!form?.personalMsg?.en?.Title) {
					newErrors["title"] = "the title is required.";
				}

				if (
					!form?.personalMsg?.en?.Content ||
					form?.personalMsg?.en?.Content === "<p></p>\n"
				) {
					newErrors["content"] = "the content is required.";
				}
			}
		}

		if (form.mode === MODE.ONE) {
			if (!form.currency) {
				newErrors["currency"] = "the currency is required.";
			}

			if (!form.accountStatus) {
				newErrors["accountStatus"] = "the accountStatus is required.";
			}
		} else if (form.mode === MODE.TWO) {
			if (!form.excelUpload) {
				newErrors["excelUpload"] = "the excelUpload is required.";
			}
		}
	} else if (type === MODAL_TYPE.EDIT) {
		if (language === "en") {
			if (!form?.personalMsg?.en?.Title) {
				newErrors["title"] = "the title is required.";
			}

			if (
				!form?.personalMsg?.en?.Content ||
				form?.personalMsg?.en?.Content === "<p></p>\n"
			) {
				newErrors["content"] = "the content is required.";
			}
		}
	}

	return newErrors;
};

const ModalAddPersonalMessage = ({ popBoxData }) => {
	const { t } = useTranslation();

	const { type, batchId } = popBoxData;

	const { allSiteList, siteId } = useContext(allSiteListContext);

	const { setPopBox, confirm } = useContext(popBoxContext);

	const {
		loading: sendMessageBatchLoading,
		sendMessageBatch
	} = useSendMessageBatchFetcher();

	const { updateBatchMessage } = useUpdateBatchMessageFetcher();

	const {
		loading: batchMessageLoading,
		getBatchMessage
	} = useGetBatchMessageFetcher();

	const [form, setForm] = useState({
		mode: MODE.ONE,
		optSite: siteId,
		accountStatus: "",
		currency: "",
		IsPopup: true,
		excelUpload: "",
		personalMsg: {}
	});

	const [errors, setErrors] = useState({});

	const { language, setLanguage, languageList } = useLanguageState({
		siteId,
		allSiteList
	});

	const { currencyList } = useSelectCurrencies({
		siteId,
		allSiteList
	});

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value
		});
	};

	const closePopBox = () => {
		setPopBox(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const newErrors = formValidator({ form, language, type });
		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);

			return;
		}

		switch (type) {
			case MODAL_TYPE.NEW:
				await sendMessageBatch(form);

				break;

			case MODAL_TYPE.EDIT:
				await updateBatchMessage(form, batchId);

				break;

			default:
				break;
		}
	};

	useEffect(() => {
		setField("currency", "");
	}, [form.optSite]);

	useEffect(() => {
		const asyncFetch = async () => {
			const _BatchMessage = await getBatchMessage(batchId);

			setForm({
				optSite: _BatchMessage.siteId,
				IsPopup: _BatchMessage.isPopup,
				personalMsg: { ...JSON.parse(_BatchMessage.message) }
			});
		};

		if (type === MODAL_TYPE.EDIT) {
			asyncFetch();
		}
	}, []);

	return (
		<>
			<Modal.Body>
				<Form noValidate onSubmit={handleSubmit}>
					<ModalAddPersonalMessageFilter
						type={type}
						form={form}
						errors={errors}
						currencyList={currencyList}
						setErrors={setErrors}
						setField={setField}
					/>

					{languageList?.length > 0 && (
						<ModalAddPersonalMessageTabs
							type={type}
							form={form}
							errors={errors}
							setErrors={setErrors}
							languageList={languageList}
							setField={setField}
							setLanguage={setLanguage}
						/>
					)}
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={closePopBox}>
					{t("PopBox.lbl_Cancel")}
				</Button>
				<ButtonWithLoading
					type="submit"
					loading={batchMessageLoading || sendMessageBatchLoading}
					onClick={handleSubmit}>
					{t("PopBox.lbl_Submit")}
				</ButtonWithLoading>
			</Modal.Footer>
		</>
	);
};

ModalAddPersonalMessage.defaultProps = {
	popBoxData: shape({
		batchId: null
	})
};

ModalAddPersonalMessage.propTypes = {
	popBoxData: shape({
		type: string.isRequired,
		batchId: number
	})
};
export default ModalAddPersonalMessage;
