import { useState, useEffect } from "react";
import { api_getAllData_GetCurrency } from "../service/api/getAllData";

const useGetCurrencyData = props => {
	const { currencyIds, singleMapping = false } = props ?? {};
	const [currencyData, setCurrencyData] = useState();
	const [allCurrencyList, setAllCurrencyList] = useState([]);
	const isArray = Array.isArray(currencyIds);

	useEffect(() => {
		const getCurrencyData = async () => {
			try {
				const res = await api_getAllData_GetCurrency();

				if (res.data.errorCode === 0) {
					const {
						data: { data: mapList }
					} = res;

					setAllCurrencyList(mapList);

					const getCurrencyName = currencyId =>
						mapList.find(x => x.currencyId === currencyId)
							?.isoCode ?? "";

					if (isArray) {
						const result = [];

						currencyIds.forEach(c => {
							result.push({
								value: c,
								displayText: getCurrencyName(c)
							});
						});
						setCurrencyData(result);
					} else if (!isArray && currencyIds) {
						setCurrencyData({
							value: currencyIds,
							displayText: getCurrencyName(currencyIds)
						});
					}
				}
			} catch (error) {
				console.error();
			}
		};

		if (
			(isArray && currencyIds.length) ||
			(!isArray && currencyIds) ||
			singleMapping
		) {
			getCurrencyData();
		}
	}, [currencyIds, singleMapping]);

	const getCurrencyName = currencyId =>
		allCurrencyList.find(x => x.currencyId === currencyId)?.isoCode ?? "";

	return { currencyData, getCurrencyName };
};

export { useGetCurrencyData };
