import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { api_home_Signin } from "../../service/api/home";
import path from "../../path";

const useLogin = () => {
	const { t } = useTranslation();
	const history = useHistory();
	const alert = useAlert();

	const isMountedRef = useRef(null);

	const [userName, setUserName] = useState("");
	const [userPassword, setUserPassword] = useState("");

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onLogin = (username, password) =>
		api_home_Signin(username, password).then(
			res => {
				if (!isMountedRef.current) return;

				if (res.data.errorCode === 0) {
					history.push(path.home.root);
				} else {
					alert.error(res.data.message || t("lbl_Default_Error"));
				}
			},

			() => {
				if (!isMountedRef.current) return;

				alert.error(t("lbl_API_Error"));
			}
		);

	return {
		userName,
		userPassword,
		setUserName,
		setUserPassword,
		onLogin
	};
};

export default useLogin;
