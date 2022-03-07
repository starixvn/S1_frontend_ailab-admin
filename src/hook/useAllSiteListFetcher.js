import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { api_common_AdminUserSiteList } from "../service/api/common";

const useAllSiteListFetcher = (fetch = true) => {
	const alert = useAlert();
	const { t } = useTranslation();
	const [allSiteList, setAllSiteList] = useState([]);
	const [siteId, setSiteId] = useState(null);

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

		if (fetch) {
			getData();
		}
	}, [fetch]);

	return { allSiteList, siteId, setSiteId };
};

export { useAllSiteListFetcher };

useAllSiteListFetcher.defaultProps = {
	fetch: false
};
useAllSiteListFetcher.propTypes = {
	fetch: PropTypes.bool
};
