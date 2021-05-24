/* eslint-disable import/no-cycle */
import React, { createContext } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Wrapper from "./wrapper";

const ContextRoute = ({ children, afterLogin, ...rest }) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<Route {...rest}>
		<Wrapper afterLogin={afterLogin}>{children}</Wrapper>
	</Route>
);

ContextRoute.defaultProps = {
	afterLogin: false
};
ContextRoute.propTypes = {
	children: PropTypes.node.isRequired,
	afterLogin: PropTypes.bool
};

export default ContextRoute;

export const userInfoContext = createContext({ isLogin: false });

export const toggleSideMenuContext = createContext({});
