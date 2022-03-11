import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../../../../components/context";
import { api_tpBetLimitRequest_Set } from "../../../../service/api/tpBetLimit";

const useSetBetLimitFetcher = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const { setPopBox } = useContext(popBoxContext);

	const [loading, setLoading] = useState();

	const setBetLimit = async ({ userName, siteId, betSetting }) => {
		setLoading(true);

		try {
			const _betSetting = betSetting.map(item => {
				const newTpBetSetting = item.tpBetSetting.filter(
					({ checked }) => checked
				);
				return {
					...item,
					tpBetSetting: newTpBetSetting
				};
			});

			await api_tpBetLimitRequest_Set({
				userName,
				siteId,
				betSetting: _betSetting
			});

			alert.success("success");

			setPopBox(false);
		} catch (error) {
			alert.error(error.message || t("Error.DefaultError"));
		}

		setLoading(false);
	};
	return { loading, setBetLimit };
};

export { useSetBetLimitFetcher };
