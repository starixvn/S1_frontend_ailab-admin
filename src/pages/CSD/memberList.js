import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import InputBox from "../../components/inputBox";
import DatetimePicker from "../../components/datetimePicker";
import {
	useAllSiteListFetcher,
	useGetDateRange,
	useSelectCurrencies,
	useSelectEnumTypes,
	useGetCurrencyData,
	useHandlePage
} from "../../hook";
import { api_customerManage_GetCustInfoList } from "../../service/api/customerManage";
import DropdownWithSearch from "../../components/dropdownWithSearch";
import { Pagination } from "../../components/pagination";
import {
	api_BaseData_GetTagByStatus,
	defStatus
} from "../../service/api/baseData";
import Dropdown from "../../components/dropdown";
import { Empty } from "../../components/empty";

const defCol = {
	registerDate: "registerDate",
	siteId: "siteId",
	currencyIds: "currencyIds",
	userName: "userName",
	accountName: "accountName",
	tpUserName: "tpUserName",
	affCode: "affCode",
	statuses: "statuses",
	email: "email",
	phoneNo: "phoneNo",
	birthCheck: "birthCheck",
	bankAccountNumber: "bankAccountNumber",
	loginIp: "loginIp"
};

const initValue = {
	birthCheck: false,
	siteId: 1
};

const defInputType = {
	datePicker: "datePicker",
	inputbox: "inputbox",
	dropdown: "dropdown",
	dropdownWithSearch: "dropdownWithSearch"
};

const defInput = [
	{
		title: "MemberList.RegisterDate",
		inputType: defInputType.datePicker,
		col: defCol.registerDate
	},
	{
		title: "MemberList.Site",
		inputType: defInputType.dropdown,
		col: defCol.siteId
	},
	{
		title: "MemberList.Currency",
		inputType: defInputType.dropdownWithSearch,
		col: defCol.currencyIds
	},
	{
		title: "MemberList.MemberCode",
		inputType: defInputType.inputbox,
		col: defCol.userName
	},
	{
		title: "MemberList.FullName",
		inputType: defInputType.inputbox,
		col: defCol.accountName
	},
	{
		title: "MemberList.SabaId",
		inputType: defInputType.inputbox,
		col: defCol.tpUserName
	},
	{
		title: "MemberList.AffiliateId",
		inputType: defInputType.inputbox,
		col: defCol.affCode
	},
	{
		title: "MemberList.Status",
		inputType: defInputType.dropdownWithSearch,
		col: defCol.statuses
	},
	{
		title: "MemberList.EmailAddress",
		inputType: defInputType.inputbox,
		col: defCol.email
	},
	{
		title: "MemberList.PhoneNumber",
		inputType: defInputType.inputbox,
		col: defCol.phoneNo
	},
	{
		title: "MemberList.DateOfBirth",
		inputType: defInputType.datePicker,
		col: defCol.birthCheck
	},
	{
		title: "MemberList.BankAccountNumber",
		inputType: defInputType.inputbox,
		col: defCol.bankAccountNumber
	},
	{
		title: "MemberList.LoginIp",
		inputType: defInputType.inputbox,
		col: defCol.loginIp
	}
];

const MemberList = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const isMountedRef = useRef(null);
	const [data, setData] = useState(initValue);
	const [report, setReport] = useState([]);

	const {
		dateRange: registerDate,
		setDateRange: setRegisterDate
	} = useGetDateRange();
	const { dateRange: birth, setDateRange: setBirth } = useGetDateRange();

	const {
		OnSelectCurrency,
		currencyList,
		selected: selectedCurrencies,
		getAPIPayload: getCurrencies
	} = useSelectCurrencies({ siteId: data.siteId, defaultSelectAll: true });

	const {
		selected: selectedStatus,
		OnSelect: OnSelectStatus,
		options: statusOptions,
		getAPIPayload: getStatus
	} = useSelectEnumTypes({
		enumName: "CustomerStatusEnum",
		defaultSelectAll: true
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickSubmit = ({
		currentPage,
		pageSize,
		clickPageNumber,
		resetPage
	}) => {
		const payload = {
			...data,
			pageNumber: currentPage ?? 1,
			pageSize: pageSize ?? 10,
			startDate: registerDate.startDate,
			endDate: registerDate.endDate,
			birDate: data.birthCheck
				? Number(dayjs(birth?.startDate).format("DD"))
				: null,
			birMonth: data.birthCheck
				? Number(dayjs(birth?.startDate).format("MM"))
				: null,
			birYear: data.birthCheck
				? Number(dayjs(birth?.startDate).format("YYYY"))
				: null,
			currencyIds: getCurrencies(),
			statuses: getStatus(),
			siteIds: [data.siteId]
		};

		api_customerManage_GetCustInfoList({ ...payload }).then(
			res => {
				if (!isMountedRef.current) return;
				const {
					errorCode,
					data: _data,
					message,
					totalPages,
					rowCount
				} = res.data;

				if (errorCode === 0) {
					setReport({
						data: _data,
						totalPages,
						rowCount
					});

					if (resetPage) {
						clickPageNumber({ pageNumber: 1, execCallback: false });
					}
				} else {
					alert.error(message || `[${errorCode}] error`);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				alert.error(t("Error.DefaultError"));
			}
		);
	};

	const {
		currentPage,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({ callback: clickSubmit });

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<h2>{t("MemberList.MemberListing")}</h2>

				<FormPanel
					t={t}
					data={data}
					clickSubmit={clickSubmit}
					setData={setData}
					setRegisterDate={setRegisterDate}
					setBirth={setBirth}
					OnSelectCurrency={OnSelectCurrency}
					currencyList={currencyList}
					selectedCurrencies={selectedCurrencies}
					selectedStatus={selectedStatus}
					OnSelectStatus={OnSelectStatus}
					statusOptions={statusOptions}
					pageSize={pageSize}
					currentPage={currentPage}
					clickPageNumber={clickPageNumber}
				/>

				{report?.data?.length ? (
					<ReportPanel
						report={report}
						t={t}
						statusOptions={statusOptions}
						isMountedRef={isMountedRef}
						alert={alert}
						currentPage={currentPage}
						pageSize={pageSize}
						clickPageNumber={clickPageNumber}
						onSelectEntry={onSelectEntry}
					/>
				) : null}
			</main>
		</Layout>
	);
};

const FormPanel = ({
	t,
	clickSubmit,
	data,
	setData,
	setRegisterDate,
	setBirth,
	OnSelectCurrency,
	currencyList,
	selectedCurrencies,
	selectedStatus,
	OnSelectStatus,
	statusOptions,
	pageSize,
	currentPage,
	clickPageNumber
}) => {
	const { allSiteList } = useAllSiteListFetcher();

	const editField = ({ col, val }) => {
		setData(pre => ({ ...pre, [col]: val }));
	};

	const arr = defInput.map(el => {
		const { title, inputType, col } = el;

		if (inputType === defInputType.datePicker) {
			if (col === defCol.registerDate) {
				return (
					<div key={`input-${col}`}>
						<h6>{t(title)}</h6>
						<DatetimePicker
							id="registerDate"
							setDateRange={setRegisterDate}
						/>
					</div>
				);
			}
			if (col === defCol.birthCheck) {
				return (
					<div key={`input-${col}`} className="btn-group mt-3">
						<h6>{t(title)}</h6>
						<div className="d-flex">
							<div className="btn-group">
								<DatetimePicker
									id="birth"
									setDateRange={setBirth}
									isRange={false}
									disabled={!data.birthCheck}
								/>
								<div className="btn btn-outline-secondary">
									<input
										className="form-check-input"
										type="checkbox"
										checked={data.birthCheck}
										onChange={() => {
											setData(pre => ({
												...pre,
												birthCheck: !pre.birthCheck
											}));
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				);
			}
		}
		if (inputType === defInputType.dropdown && col === defCol.siteId) {
			return (
				<div key={`input-${col}`} className="btn-group">
					<Dropdown
						title={t(title)}
						value={data.siteId}
						options={allSiteList.map(s => ({
							value: s.siteId,
							displayText: s.siteName
						}))}
						onSelect={val =>
							editField({ col: defCol.siteId, val: val.value })
						}
					/>
				</div>
			);
		}
		if (inputType === defInputType.dropdownWithSearch) {
			if (col === defCol.currencyIds) {
				return (
					<DropdownWithSearch
						key={`input-${col}`}
						title={t(title)}
						options={currencyList}
						selected={selectedCurrencies}
						onSelect={OnSelectCurrency}
					/>
				);
			}
			if (col === defCol.statuses) {
				return (
					<DropdownWithSearch
						key={`input-${col}`}
						title={t(title)}
						options={statusOptions}
						selected={selectedStatus}
						onSelect={OnSelectStatus}
					/>
				);
			}
		}

		return (
			<InputBox
				key={`input-${col}`}
				title={t(title)}
				className="btn-group"
				value={data[col]}
				onChange={e =>
					editField({
						col,
						val: e.target.value
					})
				}
			/>
		);
	});

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				clickSubmit({
					currentPage,
					pageSize,
					clickPageNumber,
					resetPage: true
				});
			}}>
			<div className="bd-example">
				{arr}
				<div>
					<button type="submit" className="btn btn-primary float-end">
						{t("MemberList.Search")}
					</button>
				</div>
			</div>
		</form>
	);
};

FormPanel.defaultProps = {
	pageSize: 10,
	currentPage: 1,
	clickPageNumber: () => {}
};

FormPanel.propTypes = {
	t: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired,
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	setData: PropTypes.func.isRequired,
	setRegisterDate: PropTypes.func.isRequired,
	setBirth: PropTypes.func.isRequired,
	OnSelectCurrency: PropTypes.func.isRequired,
	currencyList: PropTypes.arrayOf(PropTypes.object).isRequired,
	selectedCurrencies: PropTypes.arrayOf(PropTypes.object).isRequired,
	selectedStatus: PropTypes.arrayOf(PropTypes.object).isRequired,
	OnSelectStatus: PropTypes.func.isRequired,
	statusOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	pageSize: PropTypes.number,
	currentPage: PropTypes.number,
	clickPageNumber: PropTypes.func
};

const ReportPanel = ({
	report,
	t,
	statusOptions,
	isMountedRef,
	alert,
	currentPage,
	pageSize,
	clickPageNumber,
	onSelectEntry
}) => {
	const { getCurrencyName } = useGetCurrencyData({ singleMapping: true });
	const { data, totalPages, rowCount } = report;
	const [tagList, setTagList] = useState([]);
	const startEntry = (currentPage - 1) * pageSize + 1;

	useEffect(() => {
		api_BaseData_GetTagByStatus(defStatus.All).then(
			res => {
				if (!isMountedRef.current) return;
				const { errorCode, data: _tagList, message } = res.data;
				if (errorCode === 0) {
					setTagList(_tagList);
				} else {
					alert.error(message || `[${errorCode}] error`);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				alert.error(t("Error.DefaultError"));
			}
		);
	}, []);

	const getTagByStatus = list => {
		const getStatus = status =>
			tagList.find(x => x.id === Number(status))?.tagName;

		let _arr = list.split(",");
		_arr = _arr.map(s => {
			if (s.includes("[")) {
				return getStatus(s.replace("[", ""));
			}
			if (s.includes("]")) {
				return getStatus(s.replace("]", ""));
			}
			return getStatus(s);
		});
		return _arr.join(", ");
	};

	const arr = data.map((el, i) => {
		const currencyName = getCurrencyName(el.currencyId);
		const status = statusOptions.find(s => s.value === el.status)
			.displayText;
		const custTag = el.tagList ? getTagByStatus(el.tagList) : "";

		return (
			<tr key={`custId-${el.custId}`}>
				<th>{startEntry + i}</th>
				<td>{currencyName}</td>
				<td>
					<Link
						className="nav-link"
						to={{
							pathname: `/NewAdmin/member/memberDetail?data=${el.custId}`,
							state: { data: el.custId }
						}}>
						{el.userName}
					</Link>
				</td>
				<td>{dayjs(el.regTime).format("YYYY/MM/DD HH:mm:ss")}</td>
				<td>{status}</td>
				<td>{el.vipLevel}</td>
				<td>{custTag}</td>
				<td>{el.agent}</td>
				<td>{el.sabaID}</td>
				<td>{el.isTest ? t("MemberList.Yes") : t("MemberList.No")}</td>
			</tr>
		);
	});

	return (
		<div className="bd-example">
			<div className="table-responsive">
				<Pagination
					t={t}
					currentPage={currentPage}
					totalPages={totalPages}
					rowCount={rowCount}
					pageSize={pageSize}
					clickPageNumber={clickPageNumber}
					onSelectEntry={onSelectEntry}>
					<table className="table table-striped table-hover">
						<thead className="table-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">{t("MemberList.Currency")}</th>
								<th scope="col">
									{t("MemberList.MemberCode")}
								</th>
								<th scope="col">
									{t("MemberList.RegisterTime")}
								</th>
								<th scope="col">{t("MemberList.Status")}</th>
								<th scope="col">{t("MemberList.VIPLevel")}</th>
								<th scope="col">{t("MemberList.TagList")}</th>
								<th scope="col">{t("MemberList.AgentName")}</th>
								<th scope="col">{t("MemberList.SabaId")}</th>
								<th scope="col">{t("MemberList.IsTest")}</th>
							</tr>
						</thead>
						<tbody>{data.length ? arr : <Empty />}</tbody>
					</table>
				</Pagination>
			</div>
		</div>
	);
};

ReportPanel.defaultProps = {
	currentPage: 1,
	pageSize: 10,
	clickPageNumber: () => {},
	onSelectEntry: () => {}
};

ReportPanel.propTypes = {
	t: PropTypes.func.isRequired,
	report: PropTypes.objectOf(PropTypes.any).isRequired,
	statusOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	isMountedRef: PropTypes.objectOf(PropTypes.any).isRequired,
	alert: PropTypes.objectOf(PropTypes.any).isRequired,
	currentPage: PropTypes.number,
	pageSize: PropTypes.number,
	clickPageNumber: PropTypes.func,
	onSelectEntry: PropTypes.func
};

export default MemberList;
