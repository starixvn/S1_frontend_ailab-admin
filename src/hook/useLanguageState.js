import { useState, useEffect } from "react";

const useLanguageState = (initialLanguage, { siteId, allSiteList }) => {
	const [language, setLanguage] = useState(initialLanguage);
	const [languageList, setLanguageList] = useState([]);

	useEffect(() => {
		// parse json data from response
		const _languageList = JSON.parse(
			allSiteList.find(list => list.siteId === siteId)?.langList || "[]"
		);

		setLanguage(_languageList[0] ?? "");

		if (_languageList.length > 0) {
			setLanguageList(_languageList);
		}
	}, [siteId]);

	return { language, setLanguage, languageList };
};

export { useLanguageState };
