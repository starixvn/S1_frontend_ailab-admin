import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAllSiteListFetcher } from "./useAllSiteListFetcher";
import { api_getAllData_GetCurrency } from "../service/api/getAllData";

const useSelectCurrencies = siteId => {
	const { allSiteList } = useAllSiteListFetcher();

	const [selected, setSelected] = useState([]);
	const [currencyList, setCurrencyList] = useState([]);

	useEffect(() => {
		const setCurrencies = async () => {
			try {
				const res = await api_getAllData_GetCurrency();

				if (res.data.errorCode === 0) {
					const {
						data: { data: mapList }
					} = res;

					const result = [];

					allSiteList
						.find(s => s.siteId === siteId)
						?.iCurrencyList.forEach(c => {
							const displayText =
								mapList.find(x => x.currencyId === c)
									?.isoCode ?? "";

							result.push({ value: c, displayText });
						});

					setCurrencyList(result);
				}
			} catch (error) {}
		};

		if (allSiteList?.length && siteId) {
			setCurrencies();
		}
	}, [siteId, JSON.stringify(allSiteList)]);

	const OnSelectCurrency = item => {
		setSelected(prev => {
			if (prev.some(x => x.value === item.value)) {
				return prev.filter(x => x.value !== item.value);
			}

			return [...prev, item];
		});
	};

	const getAPIPayload = () => selected.map(s => s.value);

	return { selected, OnSelectCurrency, currencyList, getAPIPayload };
};

export default useSelectCurrencies;

useSelectCurrencies.defaultProps = {
	siteId: null
};

useSelectCurrencies.propTypes = {
	siteId: PropTypes.number
};
