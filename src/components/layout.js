import React, { useContext, useEffect } from "react";
import Menu from "./menu/menu";
import Header from "./header/header";
import useHandleAuth from "../hook/useHandleAuth";
import { userInfoContext, menuContext, popBoxContext } from "./context";
import { api_permission_GetUserMenu } from "../service/api/permission";

import PopBox from "./popBox";

const Layout = ({ children, afterLogin = true }) => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { menu, setMenu } = useContext(menuContext);
	const { popBox } = useContext(popBoxContext);
	const { CheckSignIn } = useHandleAuth({
		userInfo,
		setUserInfo
	});

	useEffect(() => {
		if (userInfo.isLogin === null) {
			CheckSignIn({ afterLogin });
		} else if (
			userInfo.isLogin &&
			!Object.keys(menu?.allowfuncKeys).length
		) {
			const getMenuList = async () => {
				try {
					const res = await api_permission_GetUserMenu();
					const { errorCode, data } = res.data;
					if (errorCode === 0) {
						const allowfuncKeys = {};
						const setAllowFuncKeys = dataList => {
							dataList.forEach(d => {
								if (d.funcKey) {
									allowfuncKeys[d.funcKey] = d.funcKey;
								}

								if (d.childs) {
									d.childs.forEach(c => {
										if (c.funcKey) {
											allowfuncKeys[c.funcKey] =
												c.funcKey;
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
					<PopBox />
				</div>
			</div>
			{popBox.isOpen ? (
				<div className="modal-backdrop fade show" />
			) : null}
		</>
	) : (
		children
	);
};

export default Layout;
