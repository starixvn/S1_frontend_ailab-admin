import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { Pencil } from "react-bootstrap-icons";
import { datetime_format } from "../../common";
import {
	useHandlePage,
	// useGetCryptoCurrenciesAndNetwork,
	useSelectCurrencies
} from "../../../hook";
import { popBoxContext, allSiteListContext } from "../../context";
import { Pagination } from "../../pagination";
import { Empty } from "../../empty";
import { defPopBoxType } from "../../popBox";
import DropdownWithSearch from "../../dropdownWithSearch";
import Dropdown from "../../dropdown";
import { Loading } from "../../loading";
import { api_WithdrawalLimit_GetList } from "../../../service/api/withdrawalLimitManagement";

const WithdrawalLimitManagement = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [loading, setLoading] = useState(null);
	const { allSiteList, siteId } = useContext(allSiteListContext);
	const [tableContent, setTableContent] = useState({
		rows: null,
		totalPages: 0,
		pageNumber: 0,
		rowCount: 0
	});
	// const [selNetWork, setSelNetWork] = useState();
	// const [selCrypto, setSelCrypto] = useState();
	// const { cryptoData } = useGetCryptoCurrenciesAndNetwork({
	// 	setInitValue: { setSelCrypto, setSelNetWork }
	// });

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

	const getList = async ({ page, pageSize }) => {
		setLoading(true);
		try {
			const res = await api_WithdrawalLimit_GetList({
				pageNumber: page,
				siteIds: [siteId],
				pageSize,
				currencyIds: currency_getAPIPayload(currencies_selected)
			});
			setLoading(false);
			const { errorCode, data, totalPages, pageNumber, rowCount } = res;

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
	// #	Action	Currency	VIP Level	Minimum Amount	Maximum Amount	Updated Date	Updated By
	return (
		<main className="col-md-9 col-lg-10">
			<h1 className="h2">
				{t("WithdrawalLimitManagement.WithdrawalLimit")}
			</h1>
			<div className="bd-example">
				<div className="row">
					<DropdownWithSearch
						title={t("DepositList.Currency")}
						options={currencyList}
						onSelect={OnSelectCurrency}
						selected={currencies_selected}
						className="btn-group col-md-3"
					/>
				</div>

				<button
					disabled={
						currency_getAPIPayload(currencies_selected).length < 1
					}
					onClick={() => getList({ page: 1, pageSize: 10 })}
					type="button"
					className="btn btn-primary float-end">
					{t("Menu.CSD.Search")}
				</button>
				<button
					type="button"
					onClick={() =>
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.addWithdrawalLimitPopBox,
							title: t("Common.AddNew"),
							currencyList,
							refresh: () => getList({ page: 1, pageSize: 10 })
						})
					}
					className="btn btn-success float-end">
					{t("Menu.CSD.Create")}
				</button>
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
												{t("Menu.CSD.Action")}
											</th>
											<th scope="col">
												{t("WithdrawalDetail.Currency")}
											</th>
											<th scope="col">
												{t(
													"WithdrawalListing.VIPLevel"
												)}
											</th>
											<th scope="col">
												{t("Common.MinimumAmount")}
											</th>
											<th scope="col">
												{t("Common.MaximumAmount")}
											</th>
											<th scope="col">
												{t("Common.UpdatedDate")}
											</th>
											<th scope="col">
												{t("Common.UpdatedBy")}
											</th>
										</tr>
									</thead>
									<tbody>
										{tableContent.rows.map((el, idx) => (
											<tr key={el.id}>
												<th>{startEntry + idx}</th>
												<td>
													<button
														onClick={() =>
															setPopBox({
																isOpen: true,
																popBoxType:
																	defPopBoxType.editWithdrawalLimitPopBox,
																title: t(
																	"WithdrawalSetting.Edit"
																),
																limitData: el,
																currencyList,
																refresh: () =>
																	getList({
																		page: 1,
																		pageSize: 10
																	})
															})
														}
														type="button"
														className="btn btn-primary btn-sm m-2">
														<Pencil />
													</button>
												</td>
												<td>
													{
														currencyList.find(
															c =>
																el.currencyId ===
																c.value
														).displayText
													}
												</td>
												<td>{el.vipLevel}</td>
												<td>{el.withdrawalMin}</td>
												<td>{el.withdrawalMax}</td>
												<td>
													{datetime_format(
														el.updateTime
													)}
												</td>
												<td>{el.updateOperator}</td>
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

export default WithdrawalLimitManagement;
