import React, { useState, useRef, useEffect } from "react";
import { ButtonWithLoading } from "./buttonWithLoading";

export default function Tags({
	options,
	onSelect,
	selected,
	showSubmitBtn,
	onSubmit,
	loading
}) {
	const [newOptions, setNewOptions] = useState([]);
	const [open, setOpen] = useState(false);

	const ref = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	useEffect(() => {
		setNewOptions(options);
	}, [options]);

	const ClickDropdown = e => {
		e.preventDefault();
		setOpen(prev => !prev);
	};

	const onSearch = e => {
		e.preventDefault();
		e.stopPropagation();

		const val = e.target.value;

		let _options = [];
		if (val !== "") {
			const _val = val.toUpperCase();
			_options = options.filter(el =>
				el.displayText
					? el.displayText.toUpperCase().includes(_val)
					: t(el.displayKey).toUpperCase().includes(_val)
			);
		} else {
			_options = options;
		}

		setNewOptions(_options);
	};

	const handleSelect = item => {
		if (onSelect) {
			onSelect(item);
		}

		setOpen(false);
	};

	const optionRows = newOptions?.map(o => (
		<li key={`tag-options-${o.value}`} onClick={() => handleSelect(o)}>
			<button className="dropdown-item">{o.displayText}</button>
		</li>
	));

	const selectedRows = selected?.map(s => (
		<div
			className="tag"
			key={`tag-selected-${s.value}`}
			style={{ color: s.tagColour }}>
			<span>{s.displayText}</span>
			<button
				type="button"
				className="text-gray icon icon-close"
				onClick={() => handleSelect(s)}
			/>
		</div>
	));

	return (
		<>
			<h6>Tag</h6>
			<div className="btn-group flex-column w-100">
				<div className="taginput" ref={ref}>
					{selectedRows}
					<input
						className={`btn btn-outline-secondary dropdown-toggle${
							open ? " show" : ""
						}`}
						data-bs-toggle="dropdown"
						onChange={onSearch}
						onClick={ClickDropdown}
					/>
					<ul className={`dropdown-menu${open ? " show" : ""}`}>
						{optionRows}
					</ul>
					{showSubmitBtn && (
						<ButtonWithLoading
							className="btn btn-primary"
							loading={loading}
							onClick={onSubmit}>
							Submit
						</ButtonWithLoading>
					)}
				</div>
			</div>
		</>
	);
}
