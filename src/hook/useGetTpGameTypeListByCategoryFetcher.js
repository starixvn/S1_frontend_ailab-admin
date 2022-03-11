import { useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { api_BaseData_GetTpGameTypeListByCategory } from "../service/api/baseData";

const useGetTpGameTypeListByCategoryFetcher = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const [loading, setLoading] = useState();

	const getTpGameTypeListByCategory = async categoryId => {
		setLoading(true);

		let data = [];

		try {
			data = await api_BaseData_GetTpGameTypeListByCategory(categoryId);
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);

		return data;
	};

	return {
		loading,
		getTpGameTypeListByCategory
	};
};

export { useGetTpGameTypeListByCategoryFetcher };
