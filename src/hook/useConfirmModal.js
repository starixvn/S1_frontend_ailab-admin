import { useState } from "react";

const useConfirmModal = () => {
	const [conformPopBox, setConformPopBox] = useState({
		isOpen: false,
		title: "",
		content: "",
		hasBtn: false,
		btnBar: null
	});

	const confirm = ({ title, icon, content, onOk, onCancel }) => {
		setConformPopBox({
			isOpen: true,
			title,
			icon,
			content,
			onOk,
			onCancel
		});
	};

	return { conformPopBox, setConformPopBox, confirm };
};

export { useConfirmModal };
