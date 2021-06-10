import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../context";
import { api_home_ChangePwd } from "../../service/api/home";
import InputBox from "../inputBox";

const defPwd = {
	oldPwd: "oldPwd",
	newPwd: "newPwd",
	confirmPwd: "confirmPwd"
};
const initValue = {
	[defPwd.oldPwd]: "",
	[defPwd.newPwd]: "",
	[defPwd.confirmPwd]: ""
};

const ChangePwd = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [pwd, setPwd] = useState(initValue);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const editField = ({ col }, e) => {
		const val = e.target.value;
		setPwd(prev => ({ ...prev, [col]: val }));
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const clickSubmit = () => {
		if (!pwd.oldPwd || !pwd.newPwd || !pwd.confirmPwd) {
			alert(t("ChangePwd.PleaseEnterPassword"));
		} else if (pwd.newPwd !== pwd.confirmPwd) {
			alert(t("ChangePwd.PasswordNotMatchHint"));
		} else {
			api_home_ChangePwd({ OldPwd: pwd.oldPwd, NewPwd: pwd.newPwd }).then(
				res => {
					const { errorCode, message } = res.data;
					if (isMountedRef.current) {
						if (errorCode === 0) {
							alert(message);
							setPopBox({ isOpen: false });
						} else {
							alert(message || t("Error.DefaultError"));
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						alert(t("Error.DefaultError"));
					}
				}
			);
		}
	};

	return (
		<>
			<div className="modal-body">
				<InputBox
					title={t("ChangePwd.lbl_OldPassword")}
					inputType="password"
					value={pwd.oldPwd}
					onChange={editField.bind(this, { col: defPwd.oldPwd })}
				/>
				<InputBox
					title={t("ChangePwd.lbl_NewPassword")}
					inputType="password"
					value={pwd.newPwd}
					onChange={editField.bind(this, { col: defPwd.newPwd })}
				/>
				<InputBox
					title={t("ChangePwd.ConfirmPassword")}
					inputType="password"
					value={pwd.confirmPwd}
					onChange={editField.bind(this, { col: defPwd.confirmPwd })}
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

export default ChangePwd;
