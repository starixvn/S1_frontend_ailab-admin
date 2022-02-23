import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { api_common_AdminUserSiteList } from "../service/api/common";

const useAllSiteListFetcher = () => {
	const alert = useAlert();
	const { t } = useTranslation();
	const [allSiteList, setAllSiteList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await api_common_AdminUserSiteList();

				if (data.errorCode === 0) {
					setAllSiteList(data.data);
				}
			} catch (error) {
				alert.error(error.message || t("Error.DefaultError"));
			}
		};

		getData();
	}, []);

	return { allSiteList };
};

export { useAllSiteListFetcher };
