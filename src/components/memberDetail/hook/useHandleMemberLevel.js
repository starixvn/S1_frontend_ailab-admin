import { useState, useContext } from "react";
import { useAlert } from "react-alert";
import { popBoxContext } from "../../context";
import { api_customerManage_SetCustInfo } from "../../../service/api/customerManage";

const useHandleMemberLevel = ({ custInfo }) => {
	const { confirm } = useContext(popBoxContext);
	const [value, setValue] = useState({
		value: custInfo.userLevel,
		displayText: custInfo.userLevel
	});
	const alert = useAlert();

	const options = [
		{ value: 0, displayText: "0" },
		{ value: 1, displayText: "1" },
		{ value: 2, displayText: "2" },
		{ value: 3, displayText: "3" },
		{ value: 4, displayText: "4" },
		{ value: 5, displayText: "5" },
		{ value: 6, displayText: "6" }
	];

	const onSelect = (item, previousItem) => {
		setValue(item);
		confirm({
			title: "Are you sure ?",
			async onOk() {
				try {
					const res = await api_customerManage_SetCustInfo({
						...custInfo,
						level: item.value
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

export { useHandleMemberLevel };
