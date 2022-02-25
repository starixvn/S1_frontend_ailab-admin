import { useEffect, useState } from "react";
import { useAllSiteListFetcher } from "./useAllSiteListFetcher";

const useSelectSiteId = props => {
	const { defaultSelectFirst } = props ?? { defaultSelectFirst: true };
	const { allSiteList } = useAllSiteListFetcher(
		Boolean(!props?.allSiteList?.length)
	);
	const [selected, setSelected] = useState();
	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (allSiteList?.length) {
			const tmpOptions = allSiteList.map(s => ({
				value: s.siteId,
				displayText: s.siteName
			}));

			setOptions(tmpOptions);

			if (defaultSelectFirst && tmpOptions.length) {
				setSelected(tmpOptions[0]);
			}
		}
	}, [JSON.stringify(allSiteList), defaultSelectFirst]);

	const OnSelect = item => {
		setSelected(item);
	};

	const getAPIPayload = () => [selected.value];

	return { selected, OnSelect, options, getAPIPayload };
};

export default useSelectSiteId;
