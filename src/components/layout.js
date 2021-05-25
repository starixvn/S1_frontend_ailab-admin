import React, { useContext, useEffect } from "react";
import Menu from "./menu";
import Header from "./header";
import useHandleAuth from "../hook/useHandleAuth";
import { userInfoContext } from "./context";

const Layout = ({ children, afterLogin = true }) => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { CheckSignIn } = useHandleAuth({
		userInfo,
		setUserInfo
	});

	useEffect(() => {
		if (userInfo.isLogin === null) {
			CheckSignIn({ afterLogin });
		}
	}, [userInfo.isLogin]);

	return afterLogin && userInfo.isLogin ? (
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Menu />
					{children}
				</div>
			</div>
		</>
	) : (
		children
	);
};

export default Layout;
