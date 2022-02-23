import { useState, useEffect } from "react";
import { api_enum_GetEnumType } from "../service/api/enum";

const defFilter = {
	DepositStatusEnum: [
		{
			name: "Draft",
			value: 0
		},
		{
			name: "Paid",
			value: 2
		},
		{
			name: "Expired",
			value: 6
		},
		{
			name: "Error",
			value: 99
		}
	]
};

const useSelectEnumTypes = enumName => {
	const [selected, setSelected] = useState([]);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const getEnums = async () => {
			try {
				const res = await api_enum_GetEnumType({ enumName });

				if (res.data.errorCode === 0) {
					setOptions(() =>
						res.data.data
							.filter(
								r =>
									!defFilter[enumName]?.some(
										f => f.value === r.value
									)
							)
							.map(r => ({
								value: r.value,
								displayText: r.name
							}))
					);
				}
			} catch (error) {}
		};

		if (enumName) {
			getEnums();
		}
	}, [enumName]);

	const OnSelect = item => {
		setSelected(prev => {
			if (prev.some(x => x.value === item.value)) {
				return prev.filter(x => x.value !== item.value);
			}

			return [...prev, item];
		});
	};

	const getAPIPayload = () => selected.map(s => s.value);

	return { selected, OnSelect, options, getAPIPayload };
};

export default useSelectEnumTypes;
