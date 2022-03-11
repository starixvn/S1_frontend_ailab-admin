/* eslint-disable consistent-return */
import { useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { useMounted } from "../../../../hook";
import { api_tpBetLimitRequest_GetByCustId } from "../../../../service/api/tpBetLimit";

const useGetBetListByCustIdFetcher = () => {
	const { t } = useTranslation();
	const isMountedRef = useMounted();
	const alert = useAlert();
	const [loading, setLoading] = useState();
	const [betLimit, setBetLimit] = useState({});

	const getBetListByCustId = async custId => {
		let data = {};
		setLoading(true);

		try {
			data = await api_tpBetLimitRequest_GetByCustId(custId);

			if (!isMountedRef) {
				return;
			}

			setBetLimit(data ?? {});
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);

		return data;
	};

	return { loading, betLimit, getBetListByCustId };
};

export { useGetBetListByCustIdFetcher };
