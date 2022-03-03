import React from "react";
import { bool, func, node, string } from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ModalConfirm = ({
	show,
	setShow,
	title,
	icon,
	content,
	onOk,
	onCancel
}) => {
	const { t } = useTranslation();

	const handleClose = () => {
		setShow(false);
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
		<Modal
			show={show}
			className="fade modal-level-2"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={handleClose}>
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
		</Modal>
	);
};

ModalConfirm.defaultProps = {
	title: "",
	icon: null,
	content: null,
	onOk: () => null,
	onCancel: () => null
};

ModalConfirm.propTypes = {
	show: bool.isRequired,
	setShow: func.isRequired,
	title: string,
	icon: node,
	content: node,
	onOk: func,
	onCancel: func
};
export { ModalConfirm };
