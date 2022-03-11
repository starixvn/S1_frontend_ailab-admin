import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { useAlert } from "react-alert";
import { popBoxContext, allSiteListContext } from "../../context";
import { useSelectEnumTypes } from "../../../hook/index";
import Dropdown from "../../dropdown";
import { api_Finance_BalanceAdjustment_Add } from "../../../service/api/balanceAdj";
import { api_WithdrawalLimitAdjustment_GetCustAndWalletInfo } from "../../../service/api/WithdrawalLimitAdjustment";

import InputBox from "../../inputBox";

const defColNames = {
	custId: "custId",
	option: "option",
	amount: "amount",
	withdrawalLimitAmount: "withdrawalLimitAmount",
	withdrawalLimitOption: "withdrawalLimitOption",
	remark: "remark"
};

const initValue = {
	[defColNames.custId]: "",
	[defColNames.option]: "",
	[defColNames.amount]: "",
	[defColNames.withdrawalLimitAmount]: "",
	[defColNames.withdrawalLimitOption]: "",
	[defColNames.remark]: ""
};

const AddAdjPopBox = ({ refresh }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [payloads, setPayloads] = useState(initValue);
	const { siteId } = useContext(allSiteListContext);
	const isMountedRef = useRef(null);
	const alert = useAlert();
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	const [memberName, setMemberName] = useState("");

	const [memberBalance, setMemberBalance] = useState("");

	const editField = ({ col }, e) => {
		const val = e.target.value;
		setPayloads(prev => ({ ...prev, [col]: val }));
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const {
		selected: AdjustTypeEnum_selected,
		OnSelect: AdjustTypeEnum_OnSelect,
		options: AdjustTypeEnum_options
	} = useSelectEnumTypes({
		enumName: "AdjustTypeEnum",
		defaultSelectAll: false,
		defaultSelectFirst: true
	});

	const onVaild = () => {
		let checked = true;
		if (!memberName) {
			alert.error("Member Name does not allow null.");
			checked = false;
		} else if (!payloads.custId) {
			alert.error("Invalid customer ID.");
			checked = false;
		} else if (!payloads.amount) {
			alert.error("Amount does not allow null.");
			checked = false;
		}
		return checked;
	};

	const onSearchUser = async () => {
		if (!memberName) {
			alert.error("Member Name does not allow null.");
			return;
		}
		try {
			const res = await api_WithdrawalLimitAdjustment_GetCustAndWalletInfo(
				{
					userName: memberName,
					siteId
				}
			);
			const { errorCode, data } = res.data;
			if (errorCode === 0) {
				setPayloads(prev => ({
					...prev,
					custId: data.custId
				}));
				setMemberBalance(data.balance);
			} else {
				const { message } = res.data;
				setPopBox({
					isOpen: true,
					content: <p>{message}</p>
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const clickSubmit = async () => {
		if (!onVaild()) return;
		try {
			const res = await api_Finance_BalanceAdjustment_Add({
				custId: payloads.custId,
				option: AdjustTypeEnum_selected[0].value,
				amount: Number(payloads.amount),
				withdrawalLimitAmount: Number(payloads.withdrawalLimitAmount),
				withdrawalLimitOption: payloads.withdrawalLimitOption ? 1 : 0,
				remark: payloads.remark
			});
			const { errorCode, message } = res.data;
			if (errorCode === 0) {
				refresh();
				clickClose();
				setPopBox({
					isOpen: true,
					content: <p>{message}</p>
				});
			} else {
				const { errors } = res.data;
				clickClose();
				setPopBox({
					isOpen: true,
					content: <p>{Object.values(errors)[0]}</p>
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="modal-body">
				<div className="mb-3">
					<InputBox
						title={t("DepositList.MemberCode")}
						value={memberName}
						required={true}
						onChange={e => setMemberName(e.target.value)}
					/>
				</div>
				<div className="mt-3 mb-3">
					<button
						type="button"
						className="btn btn-primary"
						onClick={onSearchUser}>
						{t("Finance.AdjustmentListing.GetCustId")}
					</button>
				</div>

				<InputBox
					title={t("Finance.AdjustmentListing.Balance")}
					value={memberBalance}
					disabled={true}
					required={true}
				/>
				<div className="mt-3 mb-3">
					<Dropdown
						required={true}
						title={t("Finance.AdjustmentListing.AdjustmentType")}
						options={AdjustTypeEnum_options.slice(0, 4)}
						onSelect={AdjustTypeEnum_OnSelect}
						selected={AdjustTypeEnum_selected}
					/>
				</div>

				<InputBox
					title={t("DepositList.Amount")}
					value={payloads.amount}
					required={true}
					onChange={editField.bind(this, {
						col: defColNames.amount
					})}
				/>

				<h6 className="mt-3">
					{t("Finance.AdjustmentListing.WithdrawCondition")}
				</h6>
				<div className="form-check Withdrawal_Condition ">
					<span>{t("DepositList.Amount")} X</span>
					<div className="input-group">
						<input
							className="form-control"
							value={payloads.withdrawalLimitAmount}
							onChange={editField.bind(this, {
								col: defColNames.withdrawalLimitAmount
							})}
						/>
					</div>
					<div className="form-check">
						<label className="form-check-label">
							{t("Common.Time")}
						</label>
						<Form.Check
							type="checkbox"
							onChange={() =>
								setPayloads(prev => ({
									...prev,
									withdrawalLimitOption: !prev.withdrawalLimitOption
								}))
							}
							checked={payloads.withdrawalLimitOption}
						/>
					</div>
				</div>

				<InputBox
					title={t("DepositList.Remark")}
					value={payloads.remark}
					onChange={editField.bind(this, {
						col: defColNames.remark
					})}
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
					onClick={clickSubmit}>
					{t("PopBox.lbl_Submit")}
				</button>
			</div>
		</>
	);
};

export default AddAdjPopBox;
