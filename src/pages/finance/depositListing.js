import React, { useState, useContext, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import { Button, Form, Modal, InputGroup, FormControl } from "react-bootstrap";
import styled from "styled-components";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import DatetimePicker from "../../components/datetimePicker";
import DropdownWithSearch from "../../components/dropdownWithSearch";
import InputBox from "../../components/inputBox";
import ButtonWithDropdown from "../../components/buttonWithDropdown";
import Dropdown from "../../components/dropdown";
import { Pagination } from "../../components/pagination";
import {
	useGetDateRange,
	useSelectCurrencies,
	useAllSiteListFetcher,
	useAmountFilter,
	useSelectEnumTypes,
	useSelectCheckBox,
	useGetCurrencyData,
	useMounted,
	useHandlePage
} from "../../hook";

import {
	api_Deposit_GetList,
	api_Deposit_BatchRejected,
	api_Deposit_Export
} from "../../service/api/deposit";
import { api_WithdrawalLimitAdjustment_GetCustAndWalletInfo } from "../../service/api/WithdrawalLimitAdjustment";
import { api_BaseData_GetBankInfoOffListByCustVerify } from "../../service/api/baseData";
import { api_DepositSubmission_Submit } from "../../service/api/depositSubmission";
import { Empty } from "../../components/empty";
import path from "../../path";
import { allSiteListContext } from "../../components/context";
import {
	number_format,
	datetime_format,
	downloadExcelFile
} from "../../components/common";
import { Loading } from "../../components/loading";
import { ButtonWithLoading } from "../../components/buttonWithLoading";

const Requried = styled.label`
	color: #a94442;
`;

const Title = ({ displayText, required }) => (
	<h6>
		{required && <Requried>*</Requried>}
		{displayText}
	</h6>
);

export default function Page() {
	const isMountedRef = useRef(null);
	const { siteId } = useContext(allSiteListContext);
	const alert = useAlert();
	const [refId, setRefId] = useState("");
	const { allSiteList } = useAllSiteListFetcher();
	const [memberCode, setMemberCode] = useState("");
	const { dateRange, setDateRange } = useGetDateRange();
	const { t } = useTranslation();

	const [result_Loading, setResult_Loading] = useState(false);
	const [result, setResult] = useState({
		datas: null,
		totalPages: null,
		rowCount: null
	});
	const {
		GetSelected: RejectTransId_GetSelected,
		OnSelect: RejectTransId_OnSelect,
		OnSelectAll: RejectTransId_onSelectAll,
		IsSelected: RejectTransId_IsSelected,
		IsSelectAll: RejectTransId_IsSelectAll
	} = useSelectCheckBox({
		datas: result?.datas?.map(d => d.transId)
	});

	const [showPopup, setShowPopup] = useState(false);

	const handleClosePopup = () => setShowPopup(false);
	const handleShowPopup = () => setShowPopup(true);

	const {
		OnSelectCurrency,
		currencyList,
		selected: currencies_selected,
		getAPIPayload: currency_getAPIPayload
	} = useSelectCurrencies({
		siteId,
		allSiteList,
		defaultSelectAll: true
	});

	const {
		selected: DepositStatusEnum_selected,
		OnSelect: DepositStatusEnum_OnSelect,
		options: DepositStatusEnum_options,
		getAPIPayload: DepositStatusEnum_getAPIPayload
	} = useSelectEnumTypes({
		enumName: "DepositStatusEnum",
		defaultSelectFirst: true
	});

	const {
		selected: DepositTypeEnum_selected,
		OnSelect: DepositTypeEnum_OnSelect,
		options: DepositTypeEnum_options,
		getAPIPayload: DepositTypeEnum_getAPIPayload
	} = useSelectEnumTypes({
		enumName: "DepositTypeEnum",
		defaultSelectAll: true
	});

	const {
		selected: VIPLevelEnum_selected,
		OnSelect: VIPLevelEnum_OnSelect,
		options: VIPLevelEnum_options,
		getAPIPayload: VIPLevelEnum_getAPIPayload
	} = useSelectEnumTypes({
		enumName: "VIPLevelEnum",
		defaultSelectAll: true
	});

	const {
		selected: Amount_selected,
		OnSelect: Amount_OnSelect,
		options: Amount_options,
		getAPIPayload: Amount_getAPIPayload,
		amount: Amount,
		OnEditAmount: Amount_OnEditAmount
	} = useAmountFilter();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onReject = async () => {
		try {
			if (RejectTransId_GetSelected()?.length) {
				const res = await api_Deposit_BatchRejected({ rejectTransIds });
				if (res.data.errorCode !== 0) {
					alert.error(
						`[${res.data.errorCode}] ${res.data.message || "error"}`
					);
				}
			}
		} catch (error) {}
	};

	const onExport = async ({ currentPage, pageSize }) => {
		try {
			const response = await api_Deposit_Export({
				pageNumber: currentPage ?? 1,
				pageSize,
				siteIds: [siteId],
				depositId: refId,
				userName: memberCode,
				depositTypes: DepositTypeEnum_getAPIPayload(
					DepositTypeEnum_selected
				),
				currencyIds: currency_getAPIPayload(currencies_selected),
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				statuses: DepositStatusEnum_getAPIPayload(
					DepositStatusEnum_selected
				),
				levelStatuses: VIPLevelEnum_getAPIPayload(
					VIPLevelEnum_selected
				),
				amountType: Amount_getAPIPayload(Amount_selected),
				amount: Amount
			});

			if (!isMountedRef.current) return;
			const today = dayjs().format("YYYYMMDD");
			downloadExcelFile(response, `exportDeposit${today}`);
		} catch (error) {}
	};

	const onSubmit = async ({
		currentPage,
		pageSize,
		clickPageNumber,
		resetPage
	}) => {
		try {
			setResult_Loading(true);
			const res = await api_Deposit_GetList({
				pageNumber: currentPage ?? 1,
				pageSize,
				siteIds: [siteId],
				depositId: refId,
				userName: memberCode,
				depositTypes: DepositTypeEnum_getAPIPayload(
					DepositTypeEnum_selected
				),
				currencyIds: currency_getAPIPayload(currencies_selected),
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				statuses: DepositStatusEnum_getAPIPayload(
					DepositStatusEnum_selected
				),
				levelStatuses: VIPLevelEnum_getAPIPayload(
					VIPLevelEnum_selected
				),
				amountType: Amount_getAPIPayload(Amount_selected),
				amount: Amount
			});

			const { errorCode, message } = res.data;

			if (errorCode === 0) {
				setResult({
					datas: res.data.data,
					rowCount: res.data.rowCount,
					totalPages: res.data.totalPages
				});

				if (resetPage) {
					clickPageNumber({ pageNumber: 1, execCallback: false });
				}
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			alert.error(t("Error.DefaultError"));
			console.log(error);
		} finally {
			setResult_Loading(false);
		}
	};

	const {
		currentPage,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({ callback: onSubmit });

	return (
		<Layout>
			<main className="col-md-9 col-lg-10">
				<h1 className="h2">{t("Menu.Finance.DepositRequest")}</h1>
				<div className="bd-example">
					<div className="row">
						<div className="btn-group col-md-12">
							<h6>{t("DepositList.SubmitDate")}</h6>
							<DatetimePicker
								id="range"
								setDateRange={setDateRange}
							/>
						</div>
					</div>

					<div className="row">
						<DropdownWithSearch
							title={t("DepositList.Currency")}
							options={currencyList}
							onSelect={OnSelectCurrency}
							selected={currencies_selected}
							className="btn-group col-md-3"
						/>
						<DropdownWithSearch
							title={t("DepositList.Status")}
							options={DepositStatusEnum_options}
							onSelect={DepositStatusEnum_OnSelect}
							selected={DepositStatusEnum_selected}
							className="btn-group col-md-3"
						/>
						<DropdownWithSearch
							title={t("DepositList.Type")}
							options={DepositTypeEnum_options}
							onSelect={DepositTypeEnum_OnSelect}
							selected={DepositTypeEnum_selected}
							className="btn-group col-md-3"
						/>
						<InputBox
							title={t("DepositList.ReferenceId")}
							className="btn-group col-md-3"
							value={refId}
							onChange={e => setRefId(e.target.value)}
						/>
					</div>
					<div className="row">
						<InputBox
							title={t("DepositList.MemberCode")}
							className="btn-group col-md-3"
							value={memberCode}
							onChange={e => setMemberCode(e.target.value)}
						/>
						<DropdownWithSearch
							title={t("DepositList.VIPLevel")}
							options={VIPLevelEnum_options}
							onSelect={VIPLevelEnum_OnSelect}
							selected={VIPLevelEnum_selected}
							className="btn-group col-md-3"
						/>
						<ButtonWithDropdown
							title={t("DepositList.Amount")}
							selected={Amount_selected}
							OnSelect={Amount_OnSelect}
							options={Amount_options}
							OnEditAmount={Amount_OnEditAmount}
							amount={Amount}
						/>
					</div>
					<div>
						<ButtonWithLoading
							className="float-end my-2"
							loading={result_Loading}
							onClick={() =>
								onSubmit({
									currentPage,
									pageSize,
									clickPageNumber,
									resetPage: true
								})
							}>
							{t("DepositList.Submit")}
						</ButtonWithLoading>
						<Button
							className="float-end my-2 me-2"
							variant="info"
							type="button"
							onClick={() =>
								onExport({
									currentPage,
									pageSize
								})
							}>
							{t("DepositList.Export")}
						</Button>
						<Button
							className="float-end my-2 me-2"
							variant="success"
							type="button"
							onClick={handleShowPopup}>
							{t("DepositList.AddNew")}
						</Button>
					</div>
				</div>
				{result?.datas && (
					<Result
						loading={result_Loading}
						datas={result?.datas}
						options={{
							currencyList,
							DepositTypeEnum_options,
							DepositStatusEnum_options
						}}
						selectAll={{
							dataColumn: "transId",
							IsSelected: RejectTransId_IsSelected,
							OnSelect: RejectTransId_OnSelect,
							OnSelectAll: RejectTransId_onSelectAll,
							IsSelectAll: RejectTransId_IsSelectAll
						}}
						onReject={onReject}
						pageInfo={{
							currentPage,
							pageSize,
							clickPageNumber,
							onSelectEntry,
							totalPages: result.totalPages,
							rowCount: result.rowCount
						}}
					/>
				)}
				<Popup
					showPopup={showPopup}
					handleClosePopup={handleClosePopup}
					t={t}
					allSiteList={allSiteList}
					siteId={siteId}
				/>
			</main>
		</Layout>
	);
}

function convertToDisplayText(options, value) {
	return options.find(o => o.value === value)?.displayText;
}

const defColumnType = {
	default: "value",
	link: "link",
	checkbox: "checkbox",
	id: "id"
};

const defColumnTitle = {
	ReferenceId: "ReferenceId",
	Currency: "Currency",
	MemberCode: "MemberCode",
	VIPLevel: "VIPLevel",
	DepositType: "DepositType",
	Status: "Status",
	KYC: "KYC",
	Risk: "Risk",
	DepositCount: "DepositCount",
	Amount: "Amount",
	ActualDeposit: "ActualDeposit",
	Bank: "Bank",
	AccountNo: "AccountNo",
	AccountName: "AccountName",
	CreateDate: "CreateDate",
	LastUpdateDate: "LastUpdateDate"
};

const defColumns = options => [
	{ columnType: defColumnType.checkbox },
	{ columnType: defColumnType.id },
	{
		titleKey: defColumnTitle.ReferenceId,
		dataColumn: "transId",
		columnType: defColumnType.link,
		route: path.depositDetail.root.replace("/:transId", ""),
		routeParamColumn: "transId"
	},
	{
		titleKey: defColumnTitle.Currency,
		dataColumn: "currencyId",
		formatFunc: v => convertToDisplayText(options.currencyList, v)
	},
	{
		titleKey: defColumnTitle.MemberCode,
		dataColumn: "userName",
		columnType: defColumnType.link,
		route: path.memberInformation.root.replace("/:id", ""),
		routeParamColumn: "custId"
	},
	{
		titleKey: defColumnTitle.VIPLevel,
		dataColumn: "vipLevel"
	},
	{
		titleKey: defColumnTitle.DepositType,
		dataColumn: "depositType",
		formatFunc: v =>
			convertToDisplayText(options.DepositTypeEnum_options, v)
	},
	{
		titleKey: defColumnTitle.Status,
		dataColumn: "status",
		formatFunc: v =>
			convertToDisplayText(options.DepositStatusEnum_options, v)
	},
	{
		titleKey: defColumnTitle.KYC,
		dataColumn: "isKyc",
		formatFunc: value => (value ? "YES" : "NO")
	},
	{
		titleKey: defColumnTitle.Risk,
		dataColumn: "isRisk",
		formatFunc: value => (value ? "YES" : "NO")
	},
	{
		titleKey: defColumnTitle.DepositCount,
		dataColumn: "depositCnt"
	},
	{
		titleKey: defColumnTitle.Amount,
		dataColumn: "amount",
		formatFunc: number_format
	},
	{
		titleKey: defColumnTitle.ActualDeposit,
		dataColumn: "actualDeposit",
		formatFunc: number_format
	},
	{
		titleKey: defColumnTitle.Bank,
		dataColumn: "bankName",
		formatFunc: {
			binding: [{ dataColumn: "payName" }],
			func: ({ bank, payName }) => `${bank} (${payName})`
		}
	},
	{
		titleKey: defColumnTitle.AccountNo,
		dataColumn: "accountNo"
	},
	{
		titleKey: defColumnTitle.AccountName,
		dataColumn: "accountName"
	},
	{
		titleKey: defColumnTitle.CreateDate,
		dataColumn: "createTime",
		formatFunc: datetime_format
	},
	{
		titleKey: defColumnTitle.LastUpdateDate,
		dataColumn: "updateTime",
		formatFunc: datetime_format
	}
];

const Result = ({ datas, options, selectAll, onReject, pageInfo, loading }) => {
	const { t } = useTranslation();

	const _defColumns = defColumns(options);

	const titleRows = [];
	const bodyRows = [];

	_defColumns.forEach(def => {
		let key = `table-title-${def.titleKey}`;
		let content = null;
		if (def.columnType === defColumnType.checkbox) {
			key = "title-action-checkall";
			const _isSelectAll = selectAll.IsSelectAll();
			content = (
				<Form.Check
					type="checkbox"
					value={_isSelectAll}
					onChange={selectAll.OnSelectAll}
					checked={_isSelectAll}
				/>
			);
		} else if (def.columnType === defColumnType.id) {
			key = "title-action-id";
			content = "#";
		} else {
			content = def.titleKey;
		}

		titleRows.push(<td key={key}>{content}</td>);
	});

	datas?.forEach((data, idx) => {
		const row = [];
		_defColumns.forEach(def => {
			let key = `table-title-${def.titleKey}`;
			let content = data[def.dataColumn];

			if (def.columnType === defColumnType.checkbox) {
				key += "-checkbox";
				content = (
					<Form.Check
						type="checkbox"
						key={`row-${idx}`}
						value={data[selectAll.dataColumn]}
						onChange={selectAll.OnSelect}
						checked={selectAll.IsSelected(
							data[selectAll.dataColumn]
						)}
					/>
				);
			} else if (def.columnType === defColumnType.link) {
				content = (
					<Link
						to={{
							pathname: `/${def.route}/${
								data[def.routeParamColumn ?? def.dataColumn]
							}`,
							state: {
								data:
									data[def.routeParamColumn ?? def.dataColumn]
							}
						}}>
						{data[def.dataColumn]}
					</Link>
				);
			} else if (def.formatFunc) {
				if (typeof def.formatFunc === "object") {
					content = data[def.dataColumn];
				} else {
					content = def.formatFunc(data[def.dataColumn]);
				}
			} else if (def.columnType === defColumnType.id) {
				content = idx + 1;
			}

			row.push(<td key={key}>{content}</td>);
		});

		bodyRows.push(<tr key={`row-${idx}`}>{row}</tr>);
	});

	return (
		<div className="bd-example">
			{!datas.length ? (
				<Empty />
			) : (
				<Pagination
					t={t}
					currentPage={pageInfo.currentPage}
					totalPages={pageInfo.totalPages}
					rowCount={pageInfo.rowCount}
					pageSize={pageInfo.pageSize}
					clickPageNumber={pageInfo.clickPageNumber}
					onSelectEntry={pageInfo.onSelectEntry}
					headerComponent={
						<Button
							variant="danger"
							type="button"
							onClick={onReject}>
							{t("DepositList.Reject")}
						</Button>
					}>
					{loading && <Loading />}
					<div className="table-responsive d-flex">
						<table className="table table-striped table-hover w-auto">
							<thead className="table-dark">
								<tr>{titleRows}</tr>
							</thead>
							<tbody>{bodyRows}</tbody>
						</table>
					</div>
				</Pagination>
			)}
		</div>
	);
};

const Popup = ({ showPopup, handleClosePopup, t, siteId }) => {
	const isMountedRef = useMounted();
	const alert = useAlert();

	const [currency, setCurrency] = useState([]);
	const { currencyData } = useGetCurrencyData({
		currencyIds: currency
	});

	const { dateRange, setDateRange } = useGetDateRange();

	const [memberCode, setMemberCode] = useState("");

	const [companyAccount_Options, setCompanyAccount_Options] = useState([]);
	const [companyAccount_selected, setCompanyAccount_selected] = useState([]);

	const [amount, setAmount] = useState("");
	const [BankReferenceNo, setBankReferenceNo] = useState("");
	const [Remark, setRemark] = useState("");

	const [BankSlip, setBankSlip] = useState("");

	const companyAccount_OnSelect = option =>
		setCompanyAccount_selected(option);

	const onSearchUser = async () => {
		if (!memberCode) return;

		try {
			Promise.allSettled([
				api_WithdrawalLimitAdjustment_GetCustAndWalletInfo({
					userName: memberCode,
					siteId
				}),
				api_BaseData_GetBankInfoOffListByCustVerify({
					userName: memberCode,
					siteId
				})
			]).then(([resUserCurrency, resBankInfoList]) => {
				if (resUserCurrency.value.data.errorCode === 0) {
					isMountedRef &&
						setCurrency([resUserCurrency.value.data.data.currency]);
				}

				if (resBankInfoList.value.data.errorCode === 0) {
					const options = resBankInfoList.value.data?.data?.map?.(
						d => ({
							value: `${d.sysId}-${d.accountNo}`,
							displayText: `${d.accountName} (${d.bankCode} - ${d.accountName})`,
							sysId: d.sysId,
							accountNo: d.accountNo,
							bankName: d.bankName,
							accountName: d.accountName
						})
					);

					isMountedRef && setCompanyAccount_Options(options);
					isMountedRef &&
						setCompanyAccount_selected(options?.[0] ?? {});
				}
			});
		} catch (error) {}
	};

	const onVaild = () => {
		let checked = true;
		if (!memberCode) {
			alert.error("Member code does not allow null.");
			checked = false;
		} else if (!companyAccount_selected?.sysId) {
			alert.error("Company account does not allow null.");
			checked = false;
		} else if (amount === "") {
			alert.error("Amount does not allow null.");
			checked = false;
		} else if (dateRange?.startDate === "") {
			alert.error("Deposit date does not allow null.");
			checked = false;
		} else if (!BankSlip) {
			alert.error("Bank slip does not allow null.");
			checked = false;
		}

		return checked;
	};

	const onSubmit = async () => {
		if (onVaild()) {
			try {
				const Detail = {
					SiteId: siteId,
					UserName: memberCode,
					Amount: amount,
					Comment: Remark,
					RefId: BankReferenceNo,
					DepositTime: dayjs(dateRange.startDate).unix(),
					BankName: companyAccount_selected.bankName,
					AccountHolderName: companyAccount_selected.accountName,
					AccountNumber: companyAccount_selected.accountNo,
					SysId: companyAccount_selected.sysId,
					CurrencyId: currency?.[0],
					SabaId: ""
				};

				const formData = new FormData();
				formData.append("Detail", JSON.stringify(Detail));
				formData.append("Receipt", BankSlip);

				const res = await api_DepositSubmission_Submit(formData);

				if (res.data.errorCode === 0) {
					handleClosePopup();
					alert.show(t("Alert.Success"));
				} else {
					alert.error(`[${res.data.errorCode}] ${res.data.message}`);
				}
			} catch (error) {
				alert.error("[999] Something went wrong...");
			}
		}
	};

	return (
		<Modal
			show={showPopup}
			onHide={handleClosePopup}
			backdrop="static"
			keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>New Deposit</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form noValidate validated={false} onSubmit={onSubmit}>
					<div className="row">
						<Title
							displayText={t("DepositList.MemberCode")}
							required={true}
						/>
						<InputGroup>
							<FormControl
								value={memberCode}
								onChange={e => setMemberCode(e.target.value)}
								onBlur={onSearchUser}
								aria-describedby="basic-addon2"
							/>
							<InputGroup.Text id="basic-addon2">
								{currencyData?.[0]?.displayText || "-"}
							</InputGroup.Text>
						</InputGroup>

						<Dropdown
							title={`${t("DepositList.CompanyAccount")}`}
							options={companyAccount_Options}
							onSelect={companyAccount_OnSelect}
							value={companyAccount_selected}
							required={true}
							divClassName="input-group"
						/>

						<InputBox
							className="input-group"
							title={`${t("DepositList.Bank")}`}
							disabled={true}
							value={companyAccount_selected?.bankName || ""}
						/>

						<InputBox
							className="input-group"
							title={`${t("DepositList.CompanyAccountName")}`}
							disabled={true}
							value={companyAccount_selected?.accountName || ""}
						/>

						<InputBox
							className="input-group"
							title={`${t("DepositList.Amount")}`}
							required={true}
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>

						<InputBox
							className="input-group"
							title={`${t("DepositList.BankReferenceNo")}`}
							value={BankReferenceNo}
							onChange={e => setBankReferenceNo(e.target.value)}
						/>

						<Title
							displayText={t("DepositList.DepositDate")}
							required={true}
						/>
						<div className="input-group">
							<DatetimePicker
								id="singleRange"
								isRange={false}
								setDateRange={setDateRange}
							/>
						</div>

						<InputBox
							className="input-group"
							title={`${t("DepositList.Remark")}`}
							value={Remark}
							onChange={e => setRemark(e.target.value)}
						/>
					</div>
					<Form.Group controlId="formFile">
						<Title
							displayText={t("DepositList.BankSlip")}
							required={true}
						/>
						<Form.Control
							type="file"
							onChange={e => setBankSlip(e.target.files?.[0])}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClosePopup}>
					{t("DepositList.Cancel")}
				</Button>
				<Button variant="primary" onClick={onSubmit}>
					{t("DepositList.Submit")}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
