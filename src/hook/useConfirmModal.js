import { useState } from "react";

const useConfirmModal = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const [confirmInfo, setConfirmInfo] = useState({});

	const confirm = ({ title, icon, content, onOk, onCancel }) => {
		setShowConfirmModal(true);

		setConfirmInfo({ title, icon, content, onOk, onCancel });
	};

	return { showConfirmModal, confirmInfo, setShowConfirmModal, confirm };
};

export { useConfirmModal };
