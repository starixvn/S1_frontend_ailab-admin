/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, bool, func, node, objectOf, string } from "prop-types";
import { Button, Spinner } from "react-bootstrap";

const ButtonWithLoading = ({
	loading,
	onClick,
	type,
	style,
	variant,
	alt,
	children,
	...props
}) => (
	<Button
		disabled={loading}
		onClick={onClick}
		type={type}
		style={style}
		variant={variant}
		alt={alt}
		{...props}>
		{loading ? (
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true"
			/>
		) : (
			children
		)}
	</Button>
);

ButtonWithLoading.defaultProps = {
	loading: false,
	onClick: () => null,
	type: "button",
	variant: "primary",
	alt: "submit",
	children: null,
	style: {},
	props: {}
};

ButtonWithLoading.propTypes = {
	loading: bool,
	onClick: func,
	type: string,
	variant: string,
	alt: string,
	children: node,
	style: objectOf(any),
	props: objectOf(any)
};

export { ButtonWithLoading };
