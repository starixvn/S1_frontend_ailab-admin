import { useState, useEffect } from "react";

const useAmountFilter = () => {
	const [amount, setAmount] = useState("");
	const [selected, setSelected] = useState([]);
	const options = [
		{ value: 0, displayText: "-" },
		{ value: 1, displayText: ">" },
		{ value: 2, displayText: "<" }
	];

	useEffect(() => {
		setSelected(options[0]);
	}, []);

	const OnSelect = item => setSelected(item);

	const OnEditAmount = e => setAmount(e.target.value);

	const getAPIPayload = () => selected.value;

	return { selected, OnSelect, options, getAPIPayload, OnEditAmount, amount };
};

export { useAmountFilter };
