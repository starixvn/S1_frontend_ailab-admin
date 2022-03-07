/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, bool, func, node, objectOf, string } from "prop-types";
import { Button, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";

const ButtonWithLoading = ({
	loading,
	onClick,
	type,
	variant,
	alt,
	tooltip,
	children,
	...props
}) => (
	<OverlayTrigger placement="bottom" overlay={<Tooltip>{tooltip}</Tooltip>}>
		{({ ref, ...triggerHandler }) => {
			const trigger = tooltip ? triggerHandler : {};

			return (
				<Button
					disabled={loading}
					onClick={onClick}
					type={type}
					variant={variant}
					alt={alt}
					ref={ref}
					{...trigger}
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
		}}
	</OverlayTrigger>
);

ButtonWithLoading.defaultProps = {
	loading: false,
	onClick: () => null,
	type: "button",
	variant: "primary",
	alt: "submit",
	tooltip: "",
	children: null,
	props: {}
};

ButtonWithLoading.propTypes = {
	loading: bool,
	onClick: func,
	type: string,
	variant: string,
	alt: string,
	tooltip: string,
	children: node,
	props: objectOf(any)
};

export { ButtonWithLoading };
