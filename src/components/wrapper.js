/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { IS_LOGGED_IN } from "../service/auth";
import * as ct from "./context";
import path from "../path";

const Wrapper = ({ children, afterLogin }) => {
	const history = useHistory();
	const isMountedRef = useRef(null);

	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		userName: null
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		IS_LOGGED_IN().then(isLogin => {
			if (isMountedRef.current) {
				if (isLogin !== userInfo.isLogin) {
					setUserInfo(prevState => ({
						...prevState,
						isLogin
					}));
				}

				if (afterLogin && !isLogin) {
					history.push(path.login.root);
				}
			}
		});
	}, []);

	return (
		<ct.userInfoContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</ct.userInfoContext.Provider>
	);
};

export default Wrapper;

Wrapper.defaultProps = {
	afterLogin: false
};

Wrapper.propTypes = {
	children: PropTypes.node.isRequired,
	afterLogin: PropTypes.bool
};
