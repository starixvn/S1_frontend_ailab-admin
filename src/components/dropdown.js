/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import { any, arrayOf, func, string } from "prop-types";
import { Form } from "react-bootstrap";

const optionParser = (value = "", _options = []) => {
	let _option;

	if (typeof value === "string" || value === "") {
		if (_options.some(option => option === value)) {
			_option = { value, displayText: value };
		} else {
			_option = { value: -1 };
		}
	}

	return _option || value;
};

const Component = ({ title, value, options = [], onSelect, placeholder }) => {
	const [selected, setSelected] = useState(optionParser(value, options));

	const parsedOptions =
		options.map(option => optionParser(option, options)) ?? [];

	const handleChange = event => {
		const _selected = parsedOptions.find(
			_option => _option.value.toString() === event.target.value
		);

		setSelected(_selected);
		onSelect(_selected);
	};

	useEffect(() => {
		setSelected(optionParser(value, options));
	}, [value]);

	return (
		<>
			{title && <h6>{title}</h6>}

			<Form.Select value={selected.value} onChange={handleChange}>
				{placeholder && (
					<option disabled value={-1} key={-1}>
						{placeholder}
					</option>
				)}

				{parsedOptions?.map((option, index) => (
					<option
						key={`${index}-${option.value}`}
						value={option.value}>
						{option.displayKey
							? option.displayKey
							: option.displayText}
					</option>
				))}
			</Form.Select>
		</>
	);
};

Component.defaultProps = {
	title: "",
	placeholder: "-"
};

Component.propTypes = {
	title: string,
	value: any.isRequired,
	options: arrayOf(any).isRequired,
	onSelect: func.isRequired,
	placeholder: string
};

export default Component;
