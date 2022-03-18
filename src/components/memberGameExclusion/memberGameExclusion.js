import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import dayjs from "dayjs";
import { Pencil, Trash, CheckLg, XLg } from "react-bootstrap-icons";
import InputBox from "../inputBox";
import { useGetDateRange, useHandlePage } from "../../hook";
import { popBoxContext, allSiteListContext } from "../context";
import { Pagination } from "../pagination";
import { Empty } from "../empty";
import Datetimepicker from "../datetimePicker";
import Dropdown from "../dropdown";
import {
	api_CSD_TpDisable_GetList,
	api_CSD_TpDisable_UpdateStatus,
	api_CSD_TpDisable_Delete
} from "../../service/api/memberGameExc";
import path from "../../path";
import { api_getAllData_GetSlotTpList } from "../../service/api/getAllData";

import { siteInfo } from "../../config";

const initValue = {
	options: [
		{ value: 1, displayText: "Show All" },
		{ value: 0, displayText: "Active only" }
	]
};

const MemberGameExclusion = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { dateRange, setDateRange } = useGetDateRange();
	const [tableContent, setTableContent] = useState({
		rows: null,
		totalPages: 0,
		pageNumber: 0,
		rowCount: 0
	});
	const { siteId } = useContext(allSiteListContext);
	const alert = useAlert();
	const [userName, setUserName] = useState("");
	const [selected, setSelected] = useState(initValue.options[0]);

	const getList = async ({ page, pageSize }) => {
		try {
			const res = await api_CSD_TpDisable_GetList({
				pageSize,
				pageNumber: page,
				siteIds: [siteId],
				userName,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate
			});

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
			getTagByStatus({
				page: arg.currentPage,
				pageSize: arg.pageSize || pageSize
			})
	});

	const toggleStatus = async ({ custId, status }) => {
		try {
			const res = await api_CSD_TpDisable_UpdateStatus({
				custId,
				status
			});
			const { errorCode, message } = res.data;
			if (errorCode === 0) {
				getList({ page: 1, pageSize: 10 });
				setPopBox({
					isOpen: true,
					content: <p>{t("Alert.Success")}</p>
				});
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deleteRow = async ({ custId }) => {
		try {
			const res = await api_CSD_TpDisable_Delete({
				custId
			});
			const { errorCode, message } = res.data;
			if (errorCode === 0) {
				getList({ page: 1, pageSize: 10 });
				setPopBox({
					isOpen: true,
					content: <p>{t("Alert.Success")}</p>
				});
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const startEntry = (currentPage - 1) * pageSize + 1;
	return (
		<main className="col-md-9 col-lg-10">
			<h1 className="h2">{t("Menu.CSD.MemberGameExclusion")}</h1>
			<div className="bd-example">
				<div className="row">
					<div className="btn-group col-md-5">
						<h6>{t("Common.DateRange")}</h6>
						<Datetimepicker setDateRange={setDateRange} />
					</div>
					<InputBox
						className="btn-group col-md-3"
						title={t("DepositList.MemberCode")}
						value={userName}
						onChange={e => setUserName(e.target.value)}
					/>
				</div>
				<div className="row">
					<div className="col">
						<button
							onClick={() => getList({ page: 1, pageSize: 10 })}
							type="button"
							className="btn btn-primary m-2 float-end">
							{t("Menu.CSD.Search")}
						</button>
						<Link
							to={`/${path.addMGE.root}`}
							className="btn btn-success m-2 float-end">
							{t("Menu.CSD.Create")}
						</Link>
					</div>
				</div>
			</div>
			{tableContent.rows !== null && (
				<div className="bd-example">
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
												{t("Menu.CSD.Action")}
											</th>
											<th scope="col">
												{t("DepositList.MemberCode")}
											</th>
											<th scope="col">
												{t("Common.CreatedBy")}
											</th>
											<th scope="col">
												{t(
													"WithdrawalListing.CreateDate"
												)}
											</th>
											<th scope="col">
												{t("Menu.CSD.UpdatedBy")}
											</th>
											<th scope="col">
												{t("Menu.CSD.UpdatedDate")}
											</th>
										</tr>
									</thead>
									<tbody>
										{tableContent.rows.map((el, idx) => (
											<tr
												key={`${el.custId}${el.createTime}`}>
												<th>{startEntry + idx}</th>
												<td>
													<Link
														to={{
															pathname: `/${path.addMGE.root}`,
															state: {
																custId:
																	el.custId,
																userName:
																	el.userName
															}
														}}
														className="btn btn-primary btn-sm m-1">
														<Pencil />
													</Link>
													<button
														type="button"
														onClick={() =>
															deleteRow({
																custId:
																	el.custId
															})
														}
														className="btn btn-primary btn-sm m-1">
														<Trash />
													</button>
													<button
														type="button"
														onClick={() =>
															toggleStatus({
																custId:
																	el.custId,
																status: el.status
																	? 0
																	: 1
															})
														}
														className={`btn ${
															el.status
																? "btn-danger"
																: "btn-success"
														} btn-sm m-1`}>
														{el.status ? (
															<XLg />
														) : (
															<CheckLg />
														)}
													</button>
												</td>
												<td>
													<Link
														to={`/${siteInfo.newSitePrefixUrl}/member/memberDetail/${el.custId}`}>
														{el.userName}
													</Link>
												</td>
												<td>
													<div>{el.creator}</div>
												</td>
												<td>
													{dayjs(
														el.createTime
													).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>{el.updateOperator}</td>
												<td>
													{dayjs(
														el.updateTime
													).format(
														"YYYY-MM-DD HH:mm:ss"
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

export default MemberGameExclusion;
