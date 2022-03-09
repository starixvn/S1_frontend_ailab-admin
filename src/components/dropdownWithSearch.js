import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Item = ({ mainKey, payload, onSelect, checked }) => {
	const id = `${mainKey}-${payload.displayText}`;
	return (
		<li>
			<div className="dropdown-item">
				<div className="form-check">
					<input
						className="form-check-input"
						type="checkbox"
						id={id}
						checked={checked}
						onChange={() => onSelect(payload)}
					/>
					<label className="form-check-label" htmlFor={id}>
						{payload.displayText}
					</label>
				</div>
			</div>
		</li>
	);
};

Item.propTypes = {
	mainKey: PropTypes.string.isRequired,
	payload: PropTypes.exact({
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool
		]),
		displayText: PropTypes.string
	}).isRequired,
	onSelect: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired
};

export default function Component({
	title,
	options,
	selected,
	onSelect,
	displayItems
}) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const [newOptions, setNewOptions] = useState([]);

	const ref = useRef(null);

	const _currentSelected =
		selected.length <= displayItems
			? selected.map(s => s.displayText).join(", ")
			: t("Hint.ItemsSelected", { count: selected.length });
	const displaySelected =
		_currentSelected || t("Hint.NothingSelected", { colName: title });

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

	const optionRows = newOptions?.map(o => (
		<Item
			key={`${title}-${o.displayText}`}
			mainKey={`${title}-${o.displayText}`}
			payload={o}
			onSelect={onSelect}
			checked={selected.some(s => s.value === o.value)}
		/>
	));

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

	return (
		<div className="btn-group col-md-3">
			<h6>{title}</h6>
			<div className="long_button" ref={ref}>
				<button
					className={`btn btn-outline-secondary dropdown-toggle${
						open ? " show" : ""
					}`}
					data-bs-toggle="dropdown"
					aria-expanded={open}
					type="button"
					onClick={ClickDropdown}>
					<span>{displaySelected}</span>
				</button>
				<ul className={`dropdown-menu${open ? " show" : ""}`}>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							onChange={onSearch}
						/>
					</div>
					{optionRows}
				</ul>
			</div>
		</div>
	);
}

Component.defaultProps = {
	selected: { value: "", displayText: "" },
	displayItems: 4
};

Component.propTypes = {
	title: PropTypes.string.isRequired,
	selected: PropTypes.arrayOf(PropTypes.any),
	onSelect: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.any).isRequired,
	displayItems: PropTypes.number
};
