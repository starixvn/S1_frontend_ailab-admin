import { useState, useEffect } from "react";
import { api_enum_GetEnumType } from "../service/api/enum";

const defEnums = {
	VIPLevelEnum: [
		{
			name: "0",
			value: 0
		},
		{
			name: "1",
			value: 1
		},
		{
			name: "2",
			value: 2
		},
		{
			name: "3",
			value: 3
		},
		{
			name: "4",
			value: 4
		},
		{
			name: "5",
			value: 5
		},
		{
			name: "6",
			value: 6
		}
	]
};

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

const useSelectEnumTypes = props => {
	const {
		enumName,
		defaultSelectAll,
		defaultSelectFirst,
		useFrontendFilter = true
	} = props;
	const [selected, setSelected] = useState([]);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const getEnums = async () => {
			try {
				const res = await api_enum_GetEnumType({ enumName });

				if (res.data.errorCode === 9000 && !res.data.data) {
					res.data.data = defEnums[enumName];
				}

				if (
					res.data.errorCode === 0 ||
					(res.data.data && res.data.errorCode === 9000)
				) {
					const datas = res.data.data
						?.filter(
							r =>
								useFrontendFilter === false ||
								!defFilter[enumName]?.some(
									f => f.value === r.value
								)
						)
						.map(r => ({
							value: r.value,
							displayText: r.name
						}));
					setOptions(datas);

					if (defaultSelectFirst) {
						setSelected(datas?.[0] ? [datas?.[0]] : []);
					} else if (defaultSelectAll) {
						setSelected(datas);
					}
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

export { useSelectEnumTypes };
