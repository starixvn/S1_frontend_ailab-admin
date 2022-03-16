import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Button, InputGroup } from "react-bootstrap";
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
	SiteId: "SiteId"
};

const initValue = {
	[defColNames.option]: "",
	[defColNames.withdrawalLimitOption]: "",
	[defColNames.withdrawal]: "",
	[defColNames.SiteId]: ""
};

const errorFeedBacks = {
	excelUpload: "Batch excel file does not allow null."
};

const initErrValue = {
	excelUpload: ""
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
	const [errors, setErrors] = useState(initErrValue);
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

	const handleSelect = ({ value }) => {
		setPayloads(prev => ({ ...prev, option: value }));
	};

	const {
		selected: AdjustTypeEnum_selected,
		options: AdjustTypeEnum_options
	} = useSelectEnumTypes({
		enumName: "AdjustTypeEnum",
		defaultSelectAll: false,
		defaultSelectFirst: true,
		useFrontendFilter: true
	});

	const onVaild = () => {
		let checked = true;

		if (excelUpload) {
			setErrors(prev => ({
				...prev,
				excelUpload: ""
			}));
		} else {
			setErrors(prev => ({
				...prev,
				excelUpload: errorFeedBacks.excelUpload
			}));
			checked = false;
		}

		return checked;
	};

	const clickSubmit = async () => {
		if (!onVaild()) return;

		try {
			const formData = new FormData();
			formData.append(defColNames.SiteId, siteId);
			formData.append(
				defColNames.option,
				payloads.option === ""
					? AdjustTypeEnum_selected[0].value
					: payloads.option
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
			res.data?.forEach(el => {
				alert.show(el.message);
			});
		} catch (err) {
			alert.error("[999] Something went wrong...");
		}
	};

	return (
		<>
			<div className="modal-body">
				<div className="mt-3 mb-3">
					<Dropdown
						title={t("Finance.AdjustmentListing.AdjustmentType")}
						options={AdjustTypeEnum_options}
						onSelect={handleSelect}
						selected={AdjustTypeEnum_selected}
						required={true}
					/>
				</div>

				<h6>{t("Finance.AdjustmentListing.WithdrawCondition")}</h6>
				<div className="form-check Withdrawal_Condition mb-3">
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
					<InputGroup>
						<Form.Control
							type="file"
							isInvalid={errors.excelUpload !== ""}
							onChange={e => setExcelUpload(e.target.files?.[0])}
						/>
						<div className="invalid-feedback">
							{errors.excelUpload}
						</div>
						<a
							role="button"
							href="/resource/exampleFile/BalanceAdjustmentBatch.xlsx"
							download="BalanceAdjustmentBatch.xlsx">
							<Button
								variant="outline-secondary"
								id="button-addon2">
								{t("Common.Download")}
							</Button>
						</a>
					</InputGroup>
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
