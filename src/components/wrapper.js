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
		showArea: [location?.state?.Category] ?? [siteInfo.defaultCategory],
		tabBar: []
	});

	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		userName: null
	});

	const [popBox, setPopBox] = useState({
		isOpen: false,
		title: "",
		content: "",
		hasBtn: false,
		btnBar: null
	});

	return (
		<ct.menuContext.Provider value={{ menu, setMenu }}>
			<ct.userInfoContext.Provider value={{ userInfo, setUserInfo }}>
				<ct.popBoxContext.Provider value={{ popBox, setPopBox }}>
					{children}
				</ct.popBoxContext.Provider>
			</ct.userInfoContext.Provider>
		</ct.menuContext.Provider>
	);
};

export default Wrapper;

Wrapper.propTypes = {
	children: PropTypes.node.isRequired
};
