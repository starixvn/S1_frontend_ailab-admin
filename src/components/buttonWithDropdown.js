import React from "react";
import {
	DropdownButton,
	Dropdown,
	FormControl,
	InputGroup
} from "react-bootstrap";
import PropTypes from "prop-types";

export default function Component({
	title,
	options,
	selected,
	OnSelect,
	OnEditAmount,
	amount
}) {
	const optionRows = options?.map(o => (
		<Dropdown.Item
			key={`${title}-${o.value}-${o.displayText}`}
			onClick={() => OnSelect(o)}
			href="#">
			{o.displayText}
		</Dropdown.Item>
	));

	return (
		<div className="btn-group">
			<h6>{title}</h6>
			<InputGroup>
				<DropdownButton
					variant="outline-secondary"
					title={selected?.displayText ?? ""}
					id="input-group-dropdown-1">
					{optionRows}
				</DropdownButton>
				<FormControl
					aria-label="Text input with dropdown button"
					value={amount}
					onChange={OnEditAmount}
				/>
			</InputGroup>
		</div>
	);
}

Component.defaultProps = {
	title: ""
};

Component.propTypes = {
	title: PropTypes.string
};
