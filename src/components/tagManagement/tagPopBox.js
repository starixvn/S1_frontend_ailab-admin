import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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

const TagPopBox = ({ tagData, refresh }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [payloads, setPayloads] = useState(tagData ?? initValue);
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

	const clickSubmit = async () => {
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
				/>
				<ColorInputBox
					title={t("Menu.CSD.TagColor")}
					value={payloads.tagColour}
					onChange={editField.bind(this, {
						col: defColNames.tagColour
					})}
				/>
				<InputBox
					title={t("Menu.CSD.Description")}
					value={payloads.description}
					onChange={editField.bind(this, {
						col: defColNames.description
					})}
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
