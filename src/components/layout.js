import React, { useContext, useEffect } from "react";
import Menu from "./menu";
import Header from "./header";
import useHandleAuth from "../hook/useHandleAuth";
import { userInfoContext, toggleSideMenuContext } from "./context";
import { api_home_GetMenu } from "../service/api/home";

const Layout = ({ children, afterLogin = true }) => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { menu, setMenu } = useContext(toggleSideMenuContext);
	const { CheckSignIn } = useHandleAuth({
		userInfo,
		setUserInfo
	});

	useEffect(() => {
		if (userInfo.isLogin === null) {
			CheckSignIn({ afterLogin });
		} else if (userInfo.isLogin && !menu?.allowfuncKeys?.length) {
			const getMenuList = async () => {
				try {
					const res = await api_home_GetMenu();
					const { errorCode, data } = res.data;
					if (errorCode === 0) {
						const allowfuncKeys = [];
						const setAllowFuncKeys = dataList => {
							dataList.forEach(d => {
								if (d.funcKey) {
									allowfuncKeys.push(funcKey);
								}

								if (d.childs) {
									d.childs.forEach(c => {
										if (c.funcKey) {
											allowfuncKeys.push(c.funcKey);
										}
									});
								}
							});
						};

						setAllowFuncKeys(data);
						setMenu(prev => ({ ...prev, allowfuncKeys }));
					}
				} catch (error) {}
			};

			getMenuList();
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
