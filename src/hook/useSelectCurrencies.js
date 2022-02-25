import { useState, useEffect } from "react";
import { useAllSiteListFetcher } from "./useAllSiteListFetcher";
import { useGetCurrencyData } from "./useGetCurrencyData";

const useSelectCurrencies = props => {
	const { siteId, defaultSelectAll, defaultSelectFirst } = props;
	const { allSiteList } = useAllSiteListFetcher(
		Boolean(!props.allSiteList?.length)
	);

	const [selected, setSelected] = useState([]);
	const [currencyList, setCurrencyList] = useState([]);
	const [currencyIds, setCurrencyIds] = useState([]);
	const { currencyData } = useGetCurrencyData({ currencyIds });

	useEffect(() => {
		if (allSiteList?.length && siteId) {
			setCurrencyIds(
				allSiteList.find(s => s.siteId === siteId)?.iCurrencyList
			);

			if (currencyData) {
				setCurrencyList(currencyData);

				if (defaultSelectFirst) {
					setSelected(currencyData?.[0] ? [currencyData?.[0]] : []);
				} else if (defaultSelectAll) {
					setSelected(currencyData);
				}
			}
		}
	}, [siteId, JSON.stringify(allSiteList), currencyData]);

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

export { useSelectCurrencies };
