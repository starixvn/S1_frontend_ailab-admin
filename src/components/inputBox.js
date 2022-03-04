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
	onBlur
}) => (
	<div className={className}>
		<h6>
			{required && <Requried>*</Requried>}
			{title}
		</h6>
		<div className="input-group has-validation">
			<input
				type={inputType ?? "text"}
				className="form-control"
				placeholder={placeholder}
				value={value}
				aria-describedby="basic-addon1"
				onChange={onChange}
				disabled={disabled}
				onBlur={onBlur}
				required={required}
			/>
			<div className="invalid-feedback">Please choose a username.</div>
		</div>
	</div>
);

InputBox.defaultProps = {
	title: "",
	placeholder: "",
	inputType: "",
	className: "",
	disabled: false,
	required: false,
	onBlur: () => {}
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
	className: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	onBlur: PropTypes.func
};

export default InputBox;
