import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import { popBoxContext } from "../../context";
import { defPopBoxType } from "../../popBox";
import {
	api_customerManage_SetLock,
	api_customerManage_SetClose,
	api_customerManage_SetUnlock
} from "../../../service/api/customerManage";

const defStats = {
	Running: 1,
	Suspend: 2,
	Closed: 3,
	Lock: 4,
	UnLock: 5
};

const defStatusOptions = [
	{
		value: defStats.Running
	},
	{
		value: defStats.Suspend
	},
	{
		value: defStats.Closed
	},
	{
		value: defStats.Lock
	},
	{
		value: defStats.UnLock
	}
];

const useHandleStatus = ({ custInfo }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [status, setStatus] = useState();
	const [status_Options, setStatus_Options] = useState([]);
	const alert = useAlert();

	const updateOptions = _status => {
		setStatus_Options(() => {
			if (_status === defStats.Running) {
				// running: lock/closed
				return [
					{
						value: _status,
						displayText: t(`Status.${_status}`)
					},
					...defStatusOptions
						.filter(
							s =>
								s.value === defStats.Lock ||
								s.value === defStats.Closed
						)
						.map(s => ({
							value: s.value,
							displayText: t(`Status.${s.value}`)
						}))
				];
			}

			if (_status === defStats.Lock || _status === defStats.Suspend) {
				// unlock/closed
				return [
					{
						value: _status,
						displayText: t(`Status.${_status}`)
					},
					...defStatusOptions
						.filter(
							s =>
								s.value === defStats.UnLock ||
								s.value === defStats.Closed
						)
						.map(s => ({
							value: s.value,
							displayText: t(`Status.${s.value}`)
						}))
				];
			}

			return [];
		});
	};

	useEffect(() => {
		setStatus({
			value: custInfo.status,
			displayText: t(`Status.${custInfo.status}`)
		});

		updateOptions(custInfo.status);
	}, [custInfo.status]);

	const handleStatus = (statusValue, previousStatus) => {
		setStatus(statusValue);
		const closePopup = newStatus => {
			const _status =
				newStatus.value === defStats.UnLock
					? {
							value: defStats.Running,
							displayText: t(`Status.${defStats.Running}`)
					  }
					: newStatus;

			setStatus(_status);
			updateOptions(_status.value);
			setPopBox({ isOpen: false });
		};

		const apiWrapper = async (reason, apiCall) => {
			try {
				const res = await apiCall({
					custId: custInfo.custId,
					reason
				});

				const { errorCode, message } = res.data;
				if (errorCode === 0) {
					closePopup(statusValue);
				} else {
					alert.error(`[${errorCode}] ${message || "error"}`);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const UpdateStatus = reason => {
			if (statusValue.value === defStats.UnLock) {
				apiWrapper(reason, api_customerManage_SetUnlock);
			}

			if (statusValue.value === defStats.Lock) {
				apiWrapper(reason, api_customerManage_SetLock);
			}

			if (statusValue.value === defStats.Closed) {
				apiWrapper(reason, api_customerManage_SetClose);
			}
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.memberDetailReasonModal,
			title: "Reason",
			onUpdate: UpdateStatus,
			handleClose: () => closePopup(previousStatus)
		});
	};

	return {
		status_Options,
		status,
		handleStatus
	};
};

export { useHandleStatus, defStats };
