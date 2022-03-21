import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import { popBoxContext, allSiteListContext } from "../../context";
import Dropdown from "../../dropdown";
import { api_WithdrawalLimitCrypto_Create } from "../../../service/api/usdtWithdrawalLimitManagement";

import InputBox from "../../inputBox";

const defColNames = {
	withdrawalMin: "withdrawalMin",
	withdrawalMax: "withdrawalMax"
};

const initValue = {
	[defColNames.withdrawalMin]: "",
	[defColNames.withdrawalMax]: ""
};

const AddUSDTWithdrawalLimitPopBox = ({
	cryptoData,
	currencyList,
	refresh
}) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [payloads, setPayloads] = useState(initValue);
	const { allSiteList, siteId } = useContext(allSiteListContext);
	const isMountedRef = useRef(null);
	const [selCrypto, setSelCrypto] = useState(cryptoData.cryptoCurrency[0]);
	const [selNetWork, setSelNetWork] = useState(
		cryptoData.cryptoNetwork.find(
			network => network.currencyId === cryptoData.cryptoCurrency[0].value
		)
	);
	const alert = useAlert();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const editField = ({ col }, e) => {
		const val = e.target.value;
		setPayloads(prev => ({ ...prev, [col]: val }));
	};

	const handleSelect = ({ col, value }) => {
		setPayloads(prev => ({ ...prev, [col]: value }));
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const clickSubmit = async () => {
		try {
			const res = await api_WithdrawalLimitCrypto_Create({
				siteId,
				currencyId: payloads.currencyId,
				networkType: selNetWork.value,
				cryptoCurrency: selCrypto.value,
				withdrawalMin: Number(payloads.withdrawalMin),
				withdrawalMax: Number(payloads.withdrawalMax)
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
			currencyId: currencyList?.[0]?.value
		}));
	}, [currencyList]);

	return (
		<>
			<div className="modal-body">
				<InputBox
					title={t("USDTWithdrawalLimitManagement.MinimumAmount")}
					value={payloads.withdrawalMin}
					required={true}
					inputType="number"
					onChange={e => editField({ col: "withdrawalMin" }, e)}
					className="mb-3"
				/>

				<InputBox
					title={t("USDTWithdrawalLimitManagement.MaximumAmount")}
					value={payloads.withdrawalMax}
					required={true}
					inputType="number"
					onChange={e => editField({ col: "withdrawalMax" }, e)}
					className="mb-3"
				/>
				<Dropdown
					options={cryptoData?.cryptoCurrency}
					value={selCrypto}
					onSelect={({ value, displayText }) => {
						setSelCrypto({ value, displayText });
						setSelNetWork(
							cryptoData.cryptoNetwork.find(
								network => network.currencyId === value
							)
						);
					}}
					divClassName="mb-3"
					title={t("USDTWithdrawalLimitManagement.CryptoCurrency")}
				/>
				<Dropdown
					options={cryptoData?.cryptoNetwork?.filter(
						network => network.currencyId === selCrypto?.value
					)}
					value={selNetWork}
					onSelect={({ value, displayText }) => {
						setSelNetWork({ value, displayText });
					}}
					divClassName="mb-3"
					title={t("USDTWithdrawalLimitManagement.Network")}
				/>

				<Dropdown
					options={currencyList}
					value={payloads?.currencyId}
					onSelect={({ value, displayText }) => {
						handleSelect({ col: "currencyId", value, displayText });
					}}
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
					disabled={
						payloads.withdrawalMax === "" ||
						payloads.withdrawalMin === ""
					}
					className="btn btn-primary"
					onClick={clickSubmit}>
					{t("PopBox.lbl_Submit")}
				</button>
			</div>
		</>
	);
};

export default AddUSDTWithdrawalLimitPopBox;
