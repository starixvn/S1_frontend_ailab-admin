import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
	useGetDateRange,
	useSelectCurrencies,
	useSelectEnumTypes,
	useHandlePage
} from "../../../hook";
import { allSiteListContext } from "../../context";
import { Pagination } from "../../pagination";
import { Empty } from "../../empty";
import Dropdown from "../../dropdown";
import InputBox from "../../inputBox";
import Datetimepicker from "../../datetimePicker";
import DropdownWithSearch from "../../dropdownWithSearch";
import { downloadExcelFile } from "../../common";
import { Loading } from "../../loading";
import {
	api_Finance_WithdrawalTimeReport_Export,
	api_Finance_WithdrawalTimeReport_GetList
} from "../../../service/api/withdrawalTimeReport";

import { siteInfo } from "../../../config";

const WithdrawalTimeReport = () => {
	const { t } = useTranslation();
	const { dateRange, setDateRange } = useGetDateRange();
	const [loading, setLoading] = useState(null);
	const [payloads, setPayloads] = useState({});
	const [withdrawalId, setWithdrawalId] = useState("");
	const { allSiteList, siteId } = useContext(allSiteListContext);
	const [tableContent, setTableContent] = useState({
		rows: null,
		totalPages: 0,
		pageNumber: 0,
		rowCount: 0
	});

	const handleSelect = ({ col }, args) => {
		setPayloads(prev => ({ ...prev, [col]: args.value }));
	};

	const { currencyList, selected: currencies_selected } = useSelectCurrencies(
		{
			siteId,
			allSiteList,
			defaultSelectFirst: true,
			haveAll: true
		}
	);

	const {
		selected: WithdrawalInfoStatusEnum_selected,
		options: WithdrawalInfoStatusEnum_options
	} = useSelectEnumTypes({
		enumName: "WithdrawalStatusEnum",
		defaultSelectAll: false,
		defaultSelectFirst: true
	});

	const statusMapping = WithdrawalInfoStatusEnum_options.reduce(
		(acc, cur) => {
			acc[cur.value] = cur.displayText;
			return acc;
		},
		{}
	);

	const getList = async ({ page, pageSize }) => {
		setLoading(true);
		try {
			const res = await api_Finance_WithdrawalTimeReport_GetList({
				siteIds: [siteId],
				currencyId: payloads.currencyId || currencyList?.[0].value,
				withdrawalId,
				status:
					payloads.status ||
					WithdrawalInfoStatusEnum_options?.[0].value,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				pageSize,
				pageNumber: page
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
		try {
			const res = await api_Finance_WithdrawalTimeReport_Export({
				siteIds: [siteId],
				currencyId: payloads.currencyId || currencyList?.[0].value,
				withdrawalId,
				status:
					payloads.status ||
					WithdrawalInfoStatusEnum_options?.[0].value,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate
			});

			setLoading(false);

			const today = dayjs().format("YYYYMMDD");
			downloadExcelFile(res, `WithdrawalTime_${today}`);
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
		<main className="col-md-9 col-lg-10">
			<h1 className="h2">
				{t("Finance.WithdrawalTimeReport.WithdrawalTime")}
			</h1>
			<div className="bd-example">
				<div className="row">
					<div className="btn-group col-md-5">
						<h6>{t("Common.DateRange")}</h6>
						<Datetimepicker setDateRange={setDateRange} />
					</div>
					<div className="col-3">
						<Dropdown
							required={true}
							title={t("WithdrawalListing.Status")}
							options={WithdrawalInfoStatusEnum_options}
							onSelect={args => {
								handleSelect({ col: "status" }, args);
							}}
							selected={WithdrawalInfoStatusEnum_selected}
						/>
					</div>
					<div className="col-3">
						<Dropdown
							required={true}
							title={t("DepositList.Currency")}
							options={currencyList}
							onSelect={args => {
								handleSelect({ col: "currencyId" }, args);
							}}
							selected={currencies_selected}
						/>
					</div>
				</div>
				<div className="row">
					<InputBox
						className="btn-group col-md-3"
						title={t("DepositList.ReferenceId")}
						value={withdrawalId}
						onChange={e => setWithdrawalId(e.target.value)}
					/>
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
												{t("DepositList.ReferenceId")}
											</th>
											<th scope="col">
												{t("DepositList.Currency")}
											</th>
											<th scope="col">
												{t("DepositList.MemberCode")}
											</th>
											<th scope="col">
												{t("DepositList.Type")}
											</th>
											<th scope="col">
												{t("DepositList.Status")}
											</th>
											<th scope="col">
												{t(
													"Finance.WithdrawalTimeReport.ApprovedBy"
												)}
											</th>
											<th scope="col">
												{t(
													"WithdrawalListing.CreateDate"
												)}
											</th>
											<th scope="col">
												{t(
													"WithdrawalListing.UpdatedDate"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.WithdrawalTimeReport.ApprovedDate"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.WithdrawalTimeReport.VerifyTimeSpent"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.WithdrawalTimeReport.ApproveTimeSpent"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.WithdrawalTimeReport.CompleteTime"
												)}
											</th>
										</tr>
									</thead>
									<tbody>
										{tableContent.rows.map((el, idx) => (
											<tr
												key={`${startEntry}-${el.withdrawalId}`}>
												<th>{startEntry + idx}</th>
												<td>{el.withdrawalId}</td>
												<td>{el.isoCode}</td>
												<td>
													<Link
														to={`/${siteInfo.newSitePrefixUrl}/member/memberDetail/${el.custId}`}>
														{el.userName}
													</Link>
												</td>
												<td>{el.withdrawalTypeName}</td>
												<td>
													{statusMapping[el.status]}
												</td>
												<td>{el.operator}</td>
												<td>
													{dayjs(
														el.createTime
													).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>
													{dayjs(
														el.updateTime
													).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>
													{dayjs(
														el.flowEndTime
													).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>{el.toVerifyTime}</td>
												<td>{el.toApprovedTime}</td>
												<td>{el.completeTime}</td>
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

export default WithdrawalTimeReport;
