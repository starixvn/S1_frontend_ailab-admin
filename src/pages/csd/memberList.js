import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes, { resetWarningCache } from "prop-types";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { allSiteListContext } from "../../components/context";
import Layout from "../../components/layout";
import InputBox from "../../components/inputBox";
import DatetimePicker from "../../components/datetimePicker";
import {
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

const MemberList = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const isMountedRef = useRef(null);
	const [data, setData] = useState({});
	const [report, setReport] = useState([]);
	const { siteId } = useContext(allSiteListContext);

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
	} = useSelectCurrencies({ siteId, defaultSelectAll: true });

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
			siteIds: [siteId]
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

				{report?.data && (
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
				)}
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
	const editField = ({ col, val }) => {
		setData(pre => ({ ...pre, [col]: val }));
	};

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
				<div className="row">
					<h6>{t("MemberList.RegisterDate")}</h6>
					<DatetimePicker
						id="registerDate"
						setDateRange={setRegisterDate}
					/>
				</div>
				<div className="row">
					<DropdownWithSearch
						title={t("MemberList.Currency")}
						options={currencyList}
						selected={selectedCurrencies}
						onSelect={OnSelectCurrency}
					/>
					<InputBox
						title={t("MemberList.MemberCode")}
						className="btn-group col-md-3"
						value={data[defCol.userName]}
						onChange={e =>
							editField({
								col: defCol.userName,
								val: e.target.value
							})
						}
					/>
					<InputBox
						title={t("MemberList.FullName")}
						className="btn-group col-md-3"
						value={data[defCol.accountName]}
						onChange={e =>
							editField({
								col: defCol.accountName,
								val: e.target.value
							})
						}
					/>
					<InputBox
						title={t("MemberList.SabaId")}
						className="btn-group col-md-3"
						value={data[defCol.tpUserName]}
						onChange={e =>
							editField({
								col: defCol.tpUserName,
								val: e.target.value
							})
						}
					/>
				</div>

				<div className="row">
					<InputBox
						title={t("MemberList.AffiliateId")}
						className="btn-group col-md-3"
						value={data[defCol.affCode]}
						onChange={e =>
							editField({
								col: defCol.affCode,
								val: e.target.value
							})
						}
					/>
					<DropdownWithSearch
						title={t("MemberList.Status")}
						options={statusOptions}
						selected={selectedStatus}
						onSelect={OnSelectStatus}
					/>
					<InputBox
						title={t("MemberList.EmailAddress")}
						className="btn-group col-md-3"
						value={data[defCol.email]}
						onChange={e =>
							editField({
								col: defCol.email,
								val: e.target.value
							})
						}
					/>
					<InputBox
						title={t("MemberList.PhoneNumber")}
						className="btn-group col-md-3"
						value={data[defCol.phoneNo]}
						onChange={e =>
							editField({
								col: defCol.phoneNo,
								val: e.target.value
							})
						}
					/>
				</div>

				<div className="row">
					<div className="btn-group col-md-3">
						<h6>{t("MemberList.DateOfBirth")}</h6>
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
										checked={data.birthCheck ?? false}
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
					<InputBox
						title={t("MemberList.BankAccountNumber")}
						className="btn-group col-md-3"
						value={data[defCol.bankAccountNumber]}
						onChange={e =>
							editField({
								col: defCol.bankAccountNumber,
								val: e.target.value
							})
						}
					/>
					<InputBox
						title={t("MemberList.LoginIp")}
						className="btn-group col-md-3"
						value={data[defCol.loginIp]}
						onChange={e =>
							editField({
								col: defCol.loginIp,
								val: e.target.value
							})
						}
					/>
				</div>

				<div>
					<button
						type="submit"
						className="btn btn-primary float-end"
						onSubmit={e => {
							e.preventDefault();
							clickSubmit({
								currentPage,
								pageSize,
								clickPageNumber,
								resetPage: true
							});
						}}>
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

const statusStyle = {
	1: "success",
	2: "warning",
	3: "danger",
	4: "dark"
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
		const status = statusOptions.find(s => s.value === el.status);
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
				<td>
					<div
						className={`alert alert-${statusStyle[status.value]}`}
						role="alert">
						{status.displayText}
					</div>
				</td>
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
				{!report?.data?.length ? (
					<Empty />
				) : (
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
									<th scope="col">
										{t("MemberList.Currency")}
									</th>
									<th scope="col">
										{t("MemberList.MemberCode")}
									</th>
									<th scope="col">
										{t("MemberList.RegisterTime")}
									</th>
									<th scope="col">
										{t("MemberList.Status")}
									</th>
									<th scope="col">
										{t("MemberList.VIPLevel")}
									</th>
									<th scope="col">
										{t("MemberList.TagList")}
									</th>
									<th scope="col">
										{t("MemberList.AgentName")}
									</th>
									<th scope="col">
										{t("MemberList.SabaId")}
									</th>
									<th scope="col">
										{t("MemberList.IsTest")}
									</th>
								</tr>
							</thead>
							<tbody>{arr}</tbody>
						</table>
					</Pagination>
				)}
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
