/* eslint-disable import/no-cycle */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import * as ct from "./context";
import { siteInfo } from "../config";
import { useAllSiteListFetcher, useConfirmModal } from "../hook";

const Wrapper = ({ children }) => {
	const { conformPopBox, setConformPopBox, confirm } = useConfirmModal();

	const location = useLocation();
	const [menu, setMenu] = useState({
		allowfuncKeys: {},
		collapse: false,
		showArea: location?.state?.Category
			? [location?.state?.Category]
			: [siteInfo.defaultCategory],
		tabBar: []
	});

	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		userName: null
	});

	const { allSiteList, siteId, setSiteId } = useAllSiteListFetcher();

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
				<ct.popBoxContext.Provider
					value={{
						popBox,
						setPopBox,
						confirm,
						conformPopBox,
						setConformPopBox
					}}>
					<ct.allSiteListContext.Provider
						value={{ allSiteList, siteId, setSiteId }}>
						{children}
					</ct.allSiteListContext.Provider>
				</ct.popBoxContext.Provider>
			</ct.userInfoContext.Provider>
		</ct.menuContext.Provider>
	);
};

export default Wrapper;

Wrapper.propTypes = {
	children: PropTypes.node.isRequired
};
