import { useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import {
	api_home_CheckSignIn,
	api_home_SignOut,
	api_home_Signin
} from "../service/api/home";
import path from "../path";
import { siteInfo } from "../config";
import { menuContext } from "../components/context";

const useHandleAuth = ({ userInfo, setUserInfo }) => {
	const history = useHistory();
	const isMountedRef = useRef(null);
	const alert = useAlert();
	const { t } = useTranslation();
	const { setMenu } = useContext(menuContext);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const CheckSignIn = async ({ afterLogin }) => {
		let isLogin = false;
		try {
			const res = await api_home_CheckSignIn();
			isLogin = res.data.errorCode === 0;
		} catch (error) {
			isLogin = false;
		}

		if (isLogin !== userInfo.isLogin) {
			setUserInfo(prevState => ({
				...prevState,
				isLogin
			}));
		}

		if (afterLogin && !isLogin) {
			history.push(`/${path.login.root}`);
		}
	};

	const SignOut = async () => {
		try {
			const res = await api_home_SignOut();
			if (res.data.errorCode === 0) {
				setUserInfo(() => ({ isLogin: false, userName: null }));
				history.push(`/${path.login.root}`);
			}
		} catch (error) {}
	};

	const Signin = ({ userName, password }) =>
		api_home_Signin(userName, password).then(
			res => {
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setUserInfo({ isLogin: true, userName });
					setMenu(prev => ({
						...prev,
						showArea: siteInfo.defaultCategory,
						tabBar: []
					}));
					history.push({
						pathname: `/${siteInfo.defaultIndex}`
					});
				} else {
					alert.error(res.data.message || t("Error.DefaultError"));
				}
			},

			() => {
				if (!isMountedRef.current) return;
				alert.error(t("Error.DefaultError"));
			}
		);

	return { CheckSignIn, SignOut, Signin };
};

export { useHandleAuth };
