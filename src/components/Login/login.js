import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHandleAuth } from "../../hook";
import { userInfoContext } from "../context";
import path from "../../path";

const Login = () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { Signin } = useHandleAuth({ userInfo, setUserInfo });

	const [userName, setUserName] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const onValidate = values => {
		const _errors = {};

		if (!values.userName) {
			_errors.userName = "Required";
		}

		if (!values.userPassword) {
			_errors.userPassword = "Required";
		}

		return _errors;
	};

	const handleLogin = async e => {
		e.preventDefault();

		const validate = onValidate({ userName, userPassword });

		const isValid = Object.keys(validate).length === 0;

		if (isValid) {
			Signin({ userName, password: userPassword });
		}
	};

	if (userInfo.isLogin) return <Redirect to={path.home.root} />;

	return (
		<main className="form-signin">
			<form onSubmit={handleLogin}>
				<span data-feather="users" />
				<h1 className="h3 mb-3 fw-normal">
					{t("Admin.lbl_AdminLogin")}
				</h1>
				<div className="form-floating">
					<input
						type="text"
						className="form-control"
						id="floatingInput"
						value={userName}
						onChange={e => setUserName(e.target.value)}
					/>
					<label htmlFor="floatingInput">
						<span data-feather="user" />
						{t("Admin.lbl_UserName")}
					</label>
				</div>
				<div className="form-floating">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						value={userPassword}
						onChange={e => setUserPassword(e.target.value)}
					/>
					<label htmlFor="floatingPassword">
						<span data-feather="lock" />
						{t("Admin.lbl_UserPassword")}
					</label>
				</div>

				{/* <div className="checkbox mb-3">
					<label>
						<input
							type="checkbox"
							checked={rememberChecked}
							onChange={() => {
								setRememberChecked(!rememberChecked);
								setLocalStorage("_ailabadminloginremember", {
									userName,
									userPassword,
									rememberChecked: !rememberChecked
								});
							}}
						/>{" "}
						{t("Admin.lbl_RememberMe")}
					</label>
				</div> */}

				<button
					disabled={!userName || !userPassword}
					className="w-100 btn btn-lg btn-primary"
					type="submit">
					{t("Admin.lbl_SignIn")}
				</button>
			</form>
		</main>
	);
};

export default Login;
