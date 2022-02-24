/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, arrayOf, func, number, string } from "prop-types";
import { Form } from "react-bootstrap";

const Component = ({
	title,
	placeholder,
	options,
	onSelect,
	selectedIndex,
	renderProps
}) => {
	const handleChange = event => {
		const index = event.target.value;

		onSelect(Number(index), options[index]);
	};

	const renderOption = data => {
		if (typeof renderProps === "function") return renderProps(data);

		if (typeof data === "object") return data.displayText;

		if (typeof data === "string" || typeof data === "number") return data;

		return null;
	};

	return (
		<>
			{title && <h6>{title}</h6>}

			<Form.Select value={selectedIndex} onChange={handleChange}>
				{placeholder && (
					<option disabled value={-1} key={-1}>
						{placeholder}
					</option>
				)}

				{options?.map((data, index) => (
					<option key={index} value={index}>
						{renderOption(data)}
					</option>
				))}
			</Form.Select>
		</>
	);
};

Component.defaultProps = {
	title: "",
	placeholder: "",
	renderProps: null,
	selectedIndex: 0
};
Component.propTypes = {
	title: string,
	placeholder: string,
	options: arrayOf(any).isRequired,
	onSelect: func.isRequired,
	selectedIndex: number,
	renderProps: func
};

export default Component;
