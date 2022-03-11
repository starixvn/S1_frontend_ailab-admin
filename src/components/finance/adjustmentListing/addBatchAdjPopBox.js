import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { popBoxContext, allSiteListContext } from "../../context";

import { useSelectEnumTypes } from "../../../hook/index";
import Dropdown from "../../dropdown";

import { api_Finance_BalanceAdjustment_AddBatch } from "../../../service/api/balanceAdj";

const defColNames = {
	option: "option",
	withdrawal: "withdrawal",
	withdrawalLimitOption: "withdrawalLimitOption",
	optSite: "optSite"
};

const initValue = {
	[defColNames.option]: "",
	[defColNames.withdrawalLimitOption]: "",
	[defColNames.withdrawal]: "",
	[defColNames.optSite]: ""
};

const Requried = styled.label`
	color: #a94442;
`;

const Title = ({ displayText, required }) => (
	<h6>
		{required && <Requried>*</Requried>}
		{displayText}
	</h6>
);

const AddBatchAdjPopBox = ({ refresh }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [payloads, setPayloads] = useState(initValue);
	const { siteId } = useContext(allSiteListContext);
	const [excelUpload, setExcelUpload] = useState("");
	const isMountedRef = useRef(null);
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

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const {
		selected: AdjustTypeEnum_selected,
		OnSelect: AdjustTypeEnum_OnSelect,
		options: AdjustTypeEnum_options,
		getAPIPayload: AdjustTypeEnum_getAPIPayload
	} = useSelectEnumTypes({
		enumName: "AdjustTypeEnum",
		defaultSelectAll: false,
		defaultSelectFirst: true
	});

	const onVaild = () => {
		let checked = true;
		if (!excelUpload) {
			alert.error("Batch excel file can't be null");
			checked = false;
		}

		return checked;
	};

	const clickSubmit = async () => {
		if (!onVaild()) return;

		try {
			const formData = new FormData();
			formData.append(defColNames.optSite, siteId);
			formData.append(
				defColNames.option,
				AdjustTypeEnum_selected[0].value
			);
			formData.append(
				defColNames.withdrawal,
				Number(payloads.withdrawal)
			);
			formData.append(
				defColNames.withdrawalLimitOption,
				Number(payloads.withdrawalLimitOption)
			);

			formData.append("excelUpload", excelUpload);

			const res = await api_Finance_BalanceAdjustment_AddBatch(formData);

			if (res.data.errorCode === 0) {
				alert.show(t("Alert.Success"));
				refresh();
			} else {
				alert.error(`[${res.data.errorCode}] ${res.data.message}`);
			}
		} catch (error) {
			alert.error("[999] Something went wrong...");
		}
	};

	return (
		<>
			<div className="modal-body">
				<div className="mt-3 mb-3">
					<Dropdown
						title={t("Finance.AdjustmentListing.AdjustmentType")}
						options={AdjustTypeEnum_options.slice(0, 4)}
						onSelect={AdjustTypeEnum_OnSelect}
						selected={AdjustTypeEnum_selected}
						required={true}
					/>
				</div>

				<h6>{t("Finance.AdjustmentListing.WithdrawCondition")}</h6>
				<div className="form-check Withdrawal_Condition">
					<span>{t("DepositList.Amount")} X</span>
					<div className="input-group">
						<input
							className="form-control"
							value={payloads.withdrawal}
							onChange={editField.bind(this, {
								col: defColNames.withdrawal
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
				<Form.Group controlId="formFile">
					<Title
						displayText={t("Common.UploadFile")}
						required={true}
					/>
					<Form.Control
						type="file"
						onChange={e => setExcelUpload(e.target.files?.[0])}
					/>
				</Form.Group>
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

export default AddBatchAdjPopBox;
