import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useAlert } from "react-alert";
import {
	useGetDateRange,
	useSelectCurrencies,
	useSelectEnumTypes,
	useHandlePage
} from "../../hook";
import { allSiteListContext } from "../context";
import { Pagination } from "../pagination";
import { Empty } from "../empty";
import Dropdown from "../dropdown";
import Datetimepicker from "../datetimePicker";
import DropdownWithSearch from "../dropdownWithSearch";
import { downloadExcelFile } from "../common";
import { Loading } from "../loading";
import {
	api_TeleCSD_GetTeleCSDList,
	api_TeleCSD_Update,
	api_TeleCSD_ExportTeleCSDList
} from "../../service/api/teleCSD";

import { siteInfo } from "../../config";

const defCallOutStatusType = [
	{
		value: 0,
		displayText: "All"
	},
	{
		value: 1,
		displayText: "Pending1st Call"
	},
	{
		value: 2,
		displayText: "Pending2nd Call"
	},
	{
		value: 3,
		displayText: "Pending3rd Call"
	},
	{
		value: 4,
		displayText: "Done"
	}
];

const defDormantUserType = [
	{
		value: 3,
		displayText: "3"
	},
	{
		value: 7,
		displayText: "7"
	},
	{
		value: 14,
		displayText: "14"
	}
];

const TeleCSD = () => {
	const { t } = useTranslation();
	const { dateRange, setDateRange } = useGetDateRange();
	const [loading, setLoading] = useState(null);
	const [payloads, setPayloads] = useState({
		dormantUser: defDormantUserType[0].value,
		callOut: defCallOutStatusType[0].value,
		deposit: 0
	});
	const [selected, setSelected] = useState({
		dormantUser: defDormantUserType[0],
		callOut: defCallOutStatusType[0]
	});
	const { allSiteList, siteId } = useContext(allSiteListContext);
	const [tableContent, setTableContent] = useState({
		rows: null,
		totalPages: 0,
		pageNumber: 0,
		rowCount: 0
	});

	const alert = useAlert();

	const handleSelect = ({ col }, args) => {
		setPayloads(prev => ({ ...prev, [col]: args.value }));
	};

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
		selected: ActStatusEnum_selected,
		options: ActStatusEnum_options
	} = useSelectEnumTypes({
		enumName: "ActStatusEnum",
		defaultSelectAll: false,
		defaultSelectFirst: true,
		hasAll: true
	});

	const statusMapping = ActStatusEnum_options.reduce((acc, cur) => {
		acc[cur.value] = cur.displayText;
		return acc;
	}, {});

	const getList = async ({ page, pageSize }) => {
		if (!currency_getAPIPayload(currencies_selected).length) {
			alert.error("Please Choose at least one Currency");
			return;
		}
		setLoading(true);
		try {
			const res = await api_TeleCSD_GetTeleCSDList({
				siteIds: [siteId],
				currencyIds: currency_getAPIPayload(currencies_selected),
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				pageSize,
				pageNumber: page,
				callOut: payloads.callOut,
				deposit: payloads.deposit,
				dormantUser: payloads.dormantUser
			});

			setLoading(false);
			const {
				errorCode,
				data,
				totalPages,
				pageNumber,
				rowCount
			} = res.data;

			if (errorCode === 0) {
				setTableContent({
					rows: data,
					totalPages,
					pageNumber,
					rowCount
				});
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	const exportList = async () => {
		if (!currency_getAPIPayload(currencies_selected).length) {
			alert.error("Please Choose at least one Currency");
			return;
		}
		try {
			const res = await api_TeleCSD_ExportTeleCSDList({
				siteIds: [siteId],
				currencyIds: currency_getAPIPayload(currencies_selected),
				callOut: payloads.callOut,
				deposit: payloads.deposit,
				dormantUser: payloads.dormantUser,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate
			});

			setLoading(false);

			const today = dayjs().format("YYYYMMDD");
			downloadExcelFile(res, `TeleCSD_${today}`);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	const updateRemark = async ({ custId }) => {
		try {
			const res = await api_TeleCSD_Update({
				siteId,
				custId
			});

			setLoading(false);
			getList({ page: 1, pageSize: 10 });
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	const {
		currentPage,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({
		callback: arg =>
			getList({
				page: arg.currentPage,
				pageSize: arg.pageSize || pageSize
			})
	});

	const startEntry = (currentPage - 1) * pageSize + 1;

	return (
		<main className="col-md-9 col-lg-10 custmanage-telecsd">
			<h1 className="h2">{t("TeleCSD.TeleMarketing")}</h1>
			<div className="bd-example">
				<div className="row">
					<div className="btn-group col-md-5">
						<h6>{t("Common.DateRange")}</h6>
						<Datetimepicker setDateRange={setDateRange} />
					</div>
					<div className="col-3">
						<Dropdown
							title={t("TeleCSD.CallOut")}
							options={defCallOutStatusType}
							onSelect={args => {
								handleSelect({ col: "callOut" }, args);
								setSelected(prev => ({
									...prev,
									callOut: args
								}));
							}}
							selected={selected.callOut}
						/>
					</div>
					<DropdownWithSearch
						title={t("DepositList.Currency")}
						options={currencyList}
						onSelect={OnSelectCurrency}
						selected={currencies_selected}
						className="btn-group col-md-3"
					/>
				</div>
				<div className="row">
					<div className="col-3">
						<Dropdown
							title={t("TeleCSD.DormantUser")}
							options={defDormantUserType}
							onSelect={args => {
								handleSelect({ col: "dormantUser" }, args);
								setSelected(prev => ({
									...prev,
									dormantUser: args
								}));
							}}
							selected={selected.dormantUser}
						/>
					</div>
					<div className="col-3">
						<Dropdown
							title={t("TeleCSD.Deposit")}
							options={ActStatusEnum_options}
							onSelect={args => {
								handleSelect({ col: "deposit" }, args);
							}}
						/>
					</div>
				</div>
				<div className="row">
					<div>
						<button
							onClick={() => getList({ page: 1, pageSize: 10 })}
							type="button"
							className="btn btn-primary m-2">
							{t("Menu.CSD.Search")}
						</button>
						<button
							onClick={exportList}
							type="button"
							className="btn btn-primary m-2">
							{t("WithdrawalListing.Export")}
							<i className="icon icon-excel" />
						</button>
					</div>
				</div>
			</div>

			{tableContent.rows !== null && (
				<div className="bd-example">
					{loading && <Loading />}
					{tableContent.rows?.length ? (
						<Pagination
							t={t}
							currentPage={currentPage}
							totalPages={tableContent.totalPages}
							rowCount={tableContent.rowCount}
							pageSize={pageSize}
							clickPageNumber={clickPageNumber}
							onSelectEntry={({ value, displayText }) => {
								onSelectEntry({ value, displayText });
							}}>
							<div className="table-responsive">
								<table className="table table-striped table-hover">
									<thead className="table-dark">
										<tr>
											<th scope="col">#</th>
											<th scope="col">
												{t("DepositList.MemberCode")}
											</th>
											<th scope="col">
												{t("MemberList.FullName")}
											</th>
											<th scope="col">
												{t("TeleCSD.AccountStatus")}
											</th>
											<th scope="col">
												{t("TeleCSD.RegistrationDate")}
											</th>
											<th scope="col">
												{t("TeleCSD.ContactNo")}
											</th>
											<th scope="col">
												{t("TeleCSD.Log")}
											</th>
										</tr>
									</thead>
									<tbody>
										{tableContent.rows.map((el, idx) => (
											<tr
												key={`${startEntry}-${el.regTime}`}>
												<th>{startEntry + idx}</th>
												<td>
													<Link
														to={`/${siteInfo.newSitePrefixUrl}/member/memberDetail/${el.custId}`}>
														{el.userName}
													</Link>
												</td>
												<td>{el.accountName}</td>
												<td>
													{
														statusMapping[
															el.actStatus
														]
													}
												</td>
												<td>
													{dayjs(el.regTime).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>{el.phoneNo}</td>
												<td>
													{el.updateRemark?.map(s => (
														<div key={s}>{s}</div>
													))}
													{(el.updateRemark ===
														null ||
														el.updateRemark
															?.length < 3) && (
														<button
															onClick={() =>
																updateRemark({
																	custId:
																		el.custId
																})
															}
															type="button"
															className="btn btn-primary m-2">
															{t(
																"TeleCSD.CompleteOnce"
															)}
														</button>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</Pagination>
					) : (
						<Empty />
					)}
				</div>
			)}
		</main>
	);
};

export default TeleCSD;
