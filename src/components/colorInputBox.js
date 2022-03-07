import React from "react";
import PropTypes from "prop-types";

const ColorInputBox = ({ title, value, onChange, className }) => (
	<div className={className}>
		<h6>{title}</h6>
		<div className="input-group mb-3">
			<input
				type="text"
				value={value}
				onChange={onChange}
				className="form-control"
			/>
			<input
				type="color"
				value={value}
				onChange={onChange}
				className="btn btn-outline-secondary"
			/>
		</div>
	</div>
);

ColorInputBox.defaultProps = {
	title: "",
	className: ""
};

ColorInputBox.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	]).isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string
};

export default ColorInputBox;
