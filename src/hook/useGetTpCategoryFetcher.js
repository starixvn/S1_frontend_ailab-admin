import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { api_getAllData_GetTpCategory } from "../service/api/getAllData";

const useGetTpCategoryFetcher = () => {
	const { t } = useTranslation();

	const alert = useAlert();
	const [loading, setLoading] = useState();
	const [tpCategoryList, setTpCategoryList] = useState([]);

	const getTpCategoryList = async () => {
		let data = [];
		setLoading(true);
		try {
			data = await api_getAllData_GetTpCategory();

			setTpCategoryList(data);
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);

		return data;
	};

	useEffect(() => {
		getTpCategoryList();
	}, []);

	return { loading, tpCategoryList, getTpCategoryList };
};

export { useGetTpCategoryFetcher };
