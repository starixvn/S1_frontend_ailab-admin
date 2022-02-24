import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { useAllSiteListFetcher } from "./useAllSiteListFetcher";
import useGetCurrencyData from "./useGetCurrencyData";

const useSelectCurrencies = props => {
	const { siteId, defaultSelectAll } = props;
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

				if (defaultSelectAll) {
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

export default useSelectCurrencies;

// useSelectCurrencies.defaultProps = {
// 	siteId: null
// };

// useSelectCurrencies.propTypes = {
// 	props: PropTypes.number
// };
