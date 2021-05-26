/* eslint-disable import/no-cycle */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import * as ct from "./context";
import { siteInfo } from "../config";

const Wrapper = ({ children }) => {
	const location = useLocation();
	const [menu, setMenu] = useState({
		allowfuncKeys: [],
		collapse: false,
		showArea: location?.state?.Category ?? siteInfo.defaultCategory
	});

	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		userName: null
	});

	return (
		<ct.toggleSideMenuContext.Provider value={{ menu, setMenu }}>
			<ct.userInfoContext.Provider value={{ userInfo, setUserInfo }}>
				{children}
			</ct.userInfoContext.Provider>
		</ct.toggleSideMenuContext.Provider>
	);
};

export default Wrapper;

Wrapper.propTypes = {
	children: PropTypes.node.isRequired
};
