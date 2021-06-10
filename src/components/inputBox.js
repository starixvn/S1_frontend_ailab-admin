import React from "react";
import PropTypes from "prop-types";

const InputBox = ({
	title,
	value,
	onChange,
	placeholder,
	inputType,
	className
}) => (
	<div className={className}>
		<h6>{title}</h6>
		<div className="input-group mb-3">
			<input
				type={inputType ?? "text"}
				className="form-control"
				placeholder={placeholder}
				value={value}
				aria-describedby="basic-addon1"
				onChange={onChange}
			/>
		</div>
	</div>
);

InputBox.defaultProps = {
	title: "",
	placeholder: "",
	inputType: "",
	className: ""
};

InputBox.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	]).isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	inputType: PropTypes.string,
	className: PropTypes.string
};

export default InputBox;
