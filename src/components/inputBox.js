import React from "react";

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
export default InputBox;
