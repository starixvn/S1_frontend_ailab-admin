import { useState, useEffect } from "react";
import { useAllSiteListFetcher } from "./useAllSiteListFetcher";
import { useGetCurrencyData } from "./useGetCurrencyData";

const useSelectCurrencies = props => {
	const isFetch = Boolean(!props.allSiteList?.length);
	const { siteId, defaultSelectAll, defaultSelectFirst } = props;
	const { allSiteList } = useAllSiteListFetcher(isFetch);

	const list = isFetch ? allSiteList : props.allSiteList;

	const [selected, setSelected] = useState([]);
	const [currencyList, setCurrencyList] = useState([]);
	const [currencyIds, setCurrencyIds] = useState([]);
	const { currencyData } = useGetCurrencyData({ currencyIds });

	useEffect(() => {
		if (list?.length && siteId) {
			setCurrencyIds(list.find(s => s.siteId === siteId)?.iCurrencyList);

			if (currencyData) {
				setCurrencyList(() =>
					props.haveAll
						? [{ value: 0, displayText: "All" }, ...currencyData]
						: currencyData
				);

				if (defaultSelectFirst) {
					setSelected(currencyData?.[0] ? [currencyData?.[0]] : []);
				} else if (defaultSelectAll) {
					setSelected(currencyData);
				}
			}
		}
	}, [siteId, JSON.stringify(list), currencyData]);

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
