import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import dayjs from "dayjs";
import {
	useGetDateRange,
	useSelectCurrencies,
	useSelectEnumTypes,
	useHandlePage
} from "../../../hook";

import { popBoxContext, allSiteListContext } from "../../context";
import InputBox from "../../inputBox";
import { Pagination } from "../../pagination";
import { Empty } from "../../empty";
import { defPopBoxType } from "../../popBox";
import Datetimepicker from "../../datetimePicker";
import DropdownWithSearch from "../../dropdownWithSearch";
import { Loading } from "../../loading";
import { api_Finance_AdjustmentReport_GetList } from "../../../service/api/balanceAdj";
import { siteInfo } from "../../../config";

const AdjustmentListing = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { dateRange, setDateRange } = useGetDateRange();
	const [loading, setLoading] = useState(null);
	const { allSiteList, siteId } = useContext(allSiteListContext);
	const alert = useAlert();
	const [tableContent, setTableContent] = useState({
		rows: null,
		totalPages: 0,
		pageNumber: 0,
		rowCount: 0
	});
	const [userName, setUserName] = useState("");

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
		selected: AdjustTypeEnum_selected,
		OnSelect: AdjustTypeEnum_OnSelect,
		options: AdjustTypeEnum_options,
		getAPIPayload: AdjustTypeEnum_getAPIPayload
	} = useSelectEnumTypes({
		enumName: "AdjustTypeEnum",
		defaultSelectAll: true,
		useFrontendFilter: true
	});

	const onVaild = () => {
		let checked = true;
		if (!currency_getAPIPayload(currencies_selected).length) {
			alert.error("Currencies does not allow null.");
			checked = false;
		} else if (dateRange?.startDate === "") {
			alert.error("Create date does not allow null.");
			checked = false;
		} else if (
			!AdjustTypeEnum_getAPIPayload(AdjustTypeEnum_selected).length
		) {
			alert.error("Adjustment type does not allow null.");
			checked = false;
		}

		return checked;
	};

	const getList = async ({ page, pageSize }) => {
		if (!onVaild()) return;
		setLoading(true);
		try {
			const res = await api_Finance_AdjustmentReport_GetList({
				siteIds: [siteId],
				currencyIds: currency_getAPIPayload(currencies_selected),
				userName,
				adjustTypes: AdjustTypeEnum_getAPIPayload(
					AdjustTypeEnum_selected
				),
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
			<h1 className="h2">{t("Menu.Finance.BalanceAdjustmentBatch")}</h1>
			<div className="bd-example">
				<div className="row">
					<div className="btn-group col-md-5">
						<h6>{t("Common.DateRange")}</h6>
						<Datetimepicker setDateRange={setDateRange} />
					</div>

					<DropdownWithSearch
						title={t("DepositList.Type")}
						options={AdjustTypeEnum_options}
						onSelect={AdjustTypeEnum_OnSelect}
						selected={AdjustTypeEnum_selected}
						className="btn-group col-md-3"
					/>
				</div>
				<div className="row">
					<DropdownWithSearch
						title={t("DepositList.Currency")}
						options={currencyList}
						onSelect={OnSelectCurrency}
						selected={currencies_selected}
						className="btn-group col-md-3"
					/>

					<InputBox
						className="btn-group col-md-3"
						title={t("DepositList.MemberCode")}
						value={userName}
						onChange={e => setUserName(e.target.value)}
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
							type="button"
							onClick={() =>
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.addAdjPopBox,
									title: t(
										"Finance.AdjustmentListing.AddBalanceAdjustment"
									),
									refresh: () =>
										getList({ page: 1, pageSize: 10 })
								})
							}
							className="btn btn-success m-2">
							{t("Common.AddNew")}
						</button>
						<button
							type="button"
							onClick={() =>
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.addBatchAdjPopBox,
									title: t(
										"Finance.AdjustmentListing.AddBatchBalanceAdjustment"
									),
									refresh: () =>
										getList({ page: 1, pageSize: 10 })
								})
							}
							className="btn btn-success m-2">
							{t("Common.AddBatch")}
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
												{t("DepositList.Currency")}
											</th>
											<th scope="col">
												{t("DepositList.MemberCode")}
											</th>
											<th scope="col">
												{t(
													"Finance.AdjustmentListing.AdjustmentType"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.AdjustmentListing.CreateDate"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.AdjustmentListing.CustId"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.AdjustmentListing.TransId"
												)}
											</th>
											<th scope="col">
												{t("DepositList.Amount")}
											</th>
											<th scope="col">
												{t("DepositList.Status")}
											</th>
											<th scope="col">
												{t("DepositList.Remark")}
											</th>
											<th scope="col">
												{t(
													"Finance.AdjustmentListing.SabaId"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.AdjustmentListing.Operator"
												)}
											</th>
											<th scope="col">
												{t(
													"Finance.AdjustmentListing.WalletType"
												)}
											</th>
										</tr>
									</thead>
									<tbody>
										{tableContent.rows.map((el, idx) => (
											<tr key={el.transId}>
												<th>{startEntry + idx}</th>
												<td>{el.currencyName}</td>
												<td>
													<Link
														to={`/${siteInfo.newSitePrefixUrl}/member/memberDetail/${el.custId}`}>
														{el.userName}
													</Link>
												</td>
												<td>{el.adjustTypeName}</td>
												<td>
													{dayjs(
														el.createTime
													).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>{el.custId}</td>
												<td>{el.transId}</td>
												<td>{el.amount}</td>
												<td>{el.statusName}</td>
												<td>{el.memo}</td>
												<td>{el.sabaID}</td>
												<td>{el.operator}</td>
												<td>{el.walletType}</td>
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

export default AdjustmentListing;
