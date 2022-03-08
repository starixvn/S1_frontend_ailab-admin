import React, { useContext, useEffect } from "react";
import { bool, func, node, string } from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../context";

const ModalConfirm = () => {
	const { t } = useTranslation();
	const { conformPopBox, setConformPopBox } = useContext(popBoxContext);

	const {
		icon,
		title,
		content,
		onOk = () => null,
		onCancel = () => null
	} = conformPopBox;

	const handleClose = () => {
		setConformPopBox({
			isOpen: false
		});
	};

	const handleCancel = () => {
		handleClose();

		onCancel();
	};

	const handleOK = () => {
		handleClose();

		onOk();
	};

	return (
		<>
			<Modal.Header closeButton>
				{icon}
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{content}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCancel}>
					{t("PopBox.lbl_Cancel")}
				</Button>
				<Button variant="primary" onClick={handleOK}>
					{t("PopBox.lbl_Ok")}
				</Button>
			</Modal.Footer>
		</>
	);
};

export { ModalConfirm };
