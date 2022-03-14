import React from "react";
import PropTypes from "prop-types";

const ColorInputBox = ({
	title,
	value,
	onChange,
	className,
	onBlur,
	isValid,
	errorFeedBack
}) => (
	<div className={className}>
		<h6>{title}</h6>
		<div className="input-group mb-3 has-validation">
			<input
				type="text"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				readOnly
				className={`form-control ${isValid ? "" : "is-invalid"}`}
			/>

			<input
				type="color"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className="btn btn-outline-secondary"
			/>
			<div className="invalid-feedback">{errorFeedBack}</div>
		</div>
	</div>
);

ColorInputBox.defaultProps = {
	title: "",
	className: "",
	onBlur: () => {},
	isValid: true,
	errorFeedBack: ""
};

ColorInputBox.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	]).isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	onBlur: PropTypes.func,
	isValid: PropTypes.bool,
	errorFeedBack: PropTypes.string
};

export default ColorInputBox;
