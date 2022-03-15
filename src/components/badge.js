import React from "react";
import { node, oneOf } from "prop-types";

const BADGE_STATUS = ["success", "danger", "warning", "dark"];

const Badge = ({ bg, children, ...props }) => (
	<div
		className={`alert alert-${bg}`}
		style={{
			display: "inline-block",
			padding: "0.35em 0.65em",
			textAlign: "center",
			margin: "4px"
		}}
		role="alert"
		{...props}>
		{children}
	</div>
);

Badge.defaultProps = {
	bg: "dark",
	children: null
};

Badge.propTypes = {
	bg: oneOf(BADGE_STATUS),
	children: node
};

export { Badge };
