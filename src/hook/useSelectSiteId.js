import { useEffect, useState } from "react";
import { useAllSiteListFetcher } from "./useAllSiteListFetcher";

const useSelectSiteId = props => {
	const isFetch = Boolean(!props?.allSiteList?.length);

	const { defaultSelectFirst } = props ?? { defaultSelectFirst: true };
	const { allSiteList } = useAllSiteListFetcher(isFetch);

	const list = isFetch ? allSiteList : props?.allSiteList;

	const [selected, setSelected] = useState();
	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (list?.length) {
			const tmpOptions = list.map(s => ({
				value: s.siteId,
				displayText: s.siteName
			}));

			setOptions(tmpOptions);

			if (defaultSelectFirst && tmpOptions.length) {
				setSelected(tmpOptions[0]);
			}
		}
	}, [JSON.stringify(list), defaultSelectFirst]);

	const OnSelect = item => {
		setSelected(item);
	};

	const getAPIPayload = () => [selected.value];

	return { selected, OnSelect, options, getAPIPayload };
};

export { useSelectSiteId };
