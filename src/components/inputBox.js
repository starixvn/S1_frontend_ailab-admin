import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Requried = styled.label`
	color: #a94442;
`;

const InputBox = ({
	title,
	value,
	onChange,
	placeholder,
	inputType,
	className,
	disabled,
	required,
	onBlur,
	isValid,
	errorFeedBack
}) => (
	<div className={className}>
		<h6>
			{required && <Requried>*</Requried>}
			{title}
		</h6>
		<div className="input-group has-validation">
			<input
				type={inputType ?? "text"}
				className={`form-control ${isValid ? "" : "is-invalid"}`}
				placeholder={placeholder}
				value={value}
				aria-describedby="basic-addon1"
				onChange={onChange}
				disabled={disabled}
				onBlur={onBlur}
				required={required}
			/>
			<div className="invalid-feedback">{errorFeedBack}</div>
		</div>
	</div>
);

InputBox.defaultProps = {
	title: "",
	value: "",
	placeholder: "",
	inputType: "",
	className: "btn-group",
	disabled: false,
	required: false,
	onBlur: () => {},
	isValid: true,
	errorFeedBack: ""
};

InputBox.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	]),
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	inputType: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	onBlur: PropTypes.func,
	isValid: PropTypes.bool,
	errorFeedBack: PropTypes.string
};

export default InputBox;
