import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "react-bootstrap";
import { popBoxContext } from "../context";
import { api_CSD_TagManagement_EditTag } from "../../service/api/csd";

import InputBox from "../inputBox";
import ColorInputBox from "../colorInputBox";

const defColNames = {
	id: "id",
	tagName: "tagName",
	tagColour: "tagColour",
	description: "description"
};
const initValue = {
	[defColNames.id]: "",
	[defColNames.tagName]: "",
	[defColNames.tagColour]: "",
	[defColNames.description]: ""
};

const errorFeedBacks = {
	[defColNames.tagName]: "Tag name does not allow null.",
	[defColNames.tagColour]: "Tag color does not allow null.",
	[defColNames.description]: "Description does not allow null."
};

const initErrValue = {
	[defColNames.id]: "",
	[defColNames.tagName]: "",
	[defColNames.tagColour]: "",
	[defColNames.description]: ""
};

const TagPopBox = ({ tagData, refresh }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [payloads, setPayloads] = useState(tagData ?? initValue);
	const [errors, setErrors] = useState(initErrValue);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	const editField = ({ col }, e) => {
		const val = e.target.value;
		setPayloads(prev => ({ ...prev, [col]: val }));
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const onBlur = ({ col }, e) => {
		const val = e.target.value;
		if (val && val !== "") {
			setErrors(prev => ({
				...prev,
				[col]: ""
			}));
		} else {
			setErrors(prev => ({
				...prev,
				[col]: errorFeedBacks[col]
			}));
		}
	};

	const onVaild = () => {
		let checked = true;
		if (payloads.tagName === "") {
			setErrors(prev => ({
				...prev,
				[defColNames.tagName]: errorFeedBacks[defColNames.tagName]
			}));
			checked = false;
		} else if (!payloads.tagColour) {
			setErrors(prev => ({
				...prev,
				[defColNames.tagColour]: errorFeedBacks[defColNames.tagColour]
			}));
			checked = false;
		} else if (payloads.description === "") {
			setErrors(prev => ({
				...prev,
				[defColNames.description]:
					errorFeedBacks[defColNames.description]
			}));
			checked = false;
		} else {
			setErrors(initErrValue);
		}

		return checked;
	};

	const clickSubmit = async () => {
		if (!onVaild()) return;
		try {
			const res = await api_CSD_TagManagement_EditTag({
				id: payloads.id || 0,
				tagName: payloads.tagName,
				tagColour: payloads.tagColour,
				description: payloads.description
			});
			const { errorCode, message } = res.data;
			if (errorCode === 0) {
				refresh();
				clickClose();
				setPopBox({
					isOpen: true,
					content: <p>{message}</p>
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="modal-body">
				<InputBox
					title={t("Menu.CSD.TagName")}
					value={payloads.tagName}
					onChange={editField.bind(this, {
						col: defColNames.tagName
					})}
					required={true}
					isValid={errors[defColNames.tagName] === ""}
					errorFeedBack={errors[defColNames.tagName]}
					onBlur={onBlur.bind(this, {
						col: defColNames.tagName
					})}
					className="mb-3"
				/>
				<ColorInputBox
					title={t("Menu.CSD.TagColor")}
					value={payloads.tagColour}
					onChange={editField.bind(this, {
						col: defColNames.tagColour
					})}
					required={true}
					isValid={errors[defColNames.tagColour] === ""}
					errorFeedBack={errors[defColNames.tagColour]}
					onBlur={onBlur.bind(this, {
						col: defColNames.tagColour
					})}
					className="mb-3"
				/>
				<InputBox
					title={t("Menu.CSD.Description")}
					value={payloads.description}
					onChange={editField.bind(this, {
						col: defColNames.description
					})}
					required={true}
					isValid={errors[defColNames.description] === ""}
					errorFeedBack={errors[defColNames.description]}
					onBlur={onBlur.bind(this, {
						col: defColNames.description
					})}
					className="mb-3"
				/>
			</div>
			<div className="modal-footer">
				<button
					type="button"
					className="btn btn-secondary"
					data-bs-dismiss="modal"
					onClick={clickClose}>
					{t("PopBox.lbl_Cancel")}
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={clickSubmit}>
					{t("PopBox.lbl_Submit")}
				</button>
			</div>
		</>
	);
};

export default TagPopBox;
