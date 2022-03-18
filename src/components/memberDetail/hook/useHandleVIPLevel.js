import { useState, useContext } from "react";
import { useAlert } from "react-alert";
import { popBoxContext } from "../../context";
import { api_customerManage_SetVipLevel } from "../../../service/api/customerManage";

const useHandleVIPLevel = ({ custInfo }) => {
	const { confirm } = useContext(popBoxContext);
	const [value, setValue] = useState({
		value: custInfo.vipLevel,
		displayText: custInfo.vipLevel
	});
	const alert = useAlert();

	const options = [
		{ value: 0, displayText: "VINTAGE" },
		{ value: 1, displayText: "SILVER" },
		{ value: 2, displayText: "GOLD" },
		{ value: 3, displayText: "TITANIUM" },
		{ value: 4, displayText: "DIAMOND" },
		{ value: 5, displayText: "NOVA" }
	];

	const onSelect = (item, previousItem) => {
		setValue(item);
		confirm({
			title: "Are you sure ?",
			async onOk() {
				try {
					const res = await api_customerManage_SetVipLevel({
						custId: custInfo.custId,
						vipLevel: item.value
					});

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						setValue(item);
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
						setValue(previousItem);
					}
				} catch (error) {
					setValue(previousItem);
					console.log(error);
				}
			},
			onCancel() {
				setValue(previousItem);
			}
		});
	};

	return {
		options,
		value,
		onSelect
	};
};

export { useHandleVIPLevel };
