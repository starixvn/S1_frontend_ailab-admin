import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import { popBoxContext, allSiteListContext } from "../../context";
import Dropdown from "../../dropdown";
import { api_WithdrawalLimit_Update } from "../../../service/api/withdrawalLimitManagement";

import InputBox from "../../inputBox";

const defColNames = {
	withdrawalMin: "withdrawalMin",
	withdrawalMax: "withdrawalMax"
};

const initValue = {
	[defColNames.withdrawalMin]: "",
	[defColNames.withdrawalMax]: ""
};

const EditWithdrawalLimitPopBox = ({ currencyList, refresh, limitData }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [payloads, setPayloads] = useState(initValue);
	const { siteId } = useContext(allSiteListContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	const alert = useAlert();

	const editField = ({ col }, e) => {
		const val = e.target.value;
		setPayloads(prev => ({ ...prev, [col]: val }));
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const clickSubmit = async () => {
		try {
			const res = await api_WithdrawalLimit_Update({
				siteId,
				currencyId: limitData.currencyId,
				withdrawalMin: Number(payloads.withdrawalMin),
				withdrawalMax: Number(payloads.withdrawalMax),
				vipLevel: payloads.vipLevel
			});
			const { errorCode, message } = res;
			if (errorCode === 0) {
				refresh();
				clickClose();
				alert.success(t("Alert.Success"));
			} else {
				clickClose();
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setPayloads(prev => ({
			...prev,
			currencyId: limitData.currencyId,
			withdrawalMax: limitData.withdrawalMax,
			withdrawalMin: limitData.withdrawalMin,
			vipLevel: limitData.vipLevel
		}));
	}, [currencyList, limitData]);

	return (
		<>
			<div className="modal-body">
				<InputBox
					title={t("Common.MinimumAmount")}
					value={payloads.withdrawalMin}
					required={true}
					inputType="number"
					onChange={e => editField({ col: "withdrawalMin" }, e)}
					className="mb-3"
				/>

				<InputBox
					title={t("Common.MaximumAmount")}
					value={payloads.withdrawalMax}
					required={true}
					inputType="number"
					onChange={e => editField({ col: "withdrawalMax" }, e)}
					className="mb-3"
				/>

				<InputBox
					title={t("WithdrawalListing.VIPLevel")}
					value={payloads.vipLevel}
					required={true}
					inputType="number"
					onChange={e => editField({ col: "vipLevel" }, e)}
					className="mb-3"
				/>

				<Dropdown
					options={currencyList}
					value={{ value: limitData.currencyId }}
					disabled={true}
					divClassName="mb-3"
					title={t("DepositList.Currency")}
				/>
			</div>
			<div className="modal-footer">
				<button
					type="button"
					className="btn btn-secondary"
					data-bs-dismiss="modal"
					onClick={clickClose}>
					{t("PopBox.lbl_Cancel")}
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={clickSubmit}
					disabled={
						payloads.withdrawalMax === "" ||
						payloads.withdrawalMin === "" ||
						payloads.vipLevel === ""
					}>
					{t("PopBox.lbl_Submit")}
				</button>
			</div>
		</>
	);
};

export default EditWithdrawalLimitPopBox;
