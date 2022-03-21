import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { Pencil } from "react-bootstrap-icons";
import { datetime_format } from "../../common";
import {
	useHandlePage,
	useGetCryptoCurrenciesAndNetwork,
	useSelectCurrencies
} from "../../../hook";
import { popBoxContext, allSiteListContext } from "../../context";
import { Pagination } from "../../pagination";
import { Empty } from "../../empty";
import { defPopBoxType } from "../../popBox";
import DropdownWithSearch from "../../dropdownWithSearch";
import Dropdown from "../../dropdown";
import { Loading } from "../../loading";
import { api_WithdrawalLimitCrypto_GetList } from "../../../service/api/usdtWithdrawalLimitManagement";

const USDTWithdrawalLimitManagement = () => {
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
	const [selNetWork, setSelNetWork] = useState();
	const [selCrypto, setSelCrypto] = useState();
	const { cryptoData } = useGetCryptoCurrenciesAndNetwork({
		setInitValue: { setSelCrypto, setSelNetWork }
	});

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
			const res = await api_WithdrawalLimitCrypto_GetList({
				pageNumber: page,
				siteIds: [siteId],
				pageSize,
				currencyIds: currency_getAPIPayload(currencies_selected),
				networkType: selNetWork.value,
				cryptoCurrency: selCrypto.value
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

	return (
		<main className="col-md-9 col-lg-10">
			<h1 className="h2">
				{t("USDTWithdrawalLimitManagement.CryptoWithdrawalLimit")}
			</h1>
			<div className="bd-example">
				<div className="row">
					<div className="col-3">
						<Dropdown
							options={cryptoData?.cryptoCurrency}
							value={selCrypto}
							onSelect={({ value, displayText }) => {
								setSelCrypto({ value, displayText });
								setSelNetWork(
									cryptoData.cryptoNetwork.find(
										network => network.currencyId === value
									)
								);
							}}
							title={t(
								"USDTWithdrawalLimitManagement.CryptoCurrency"
							)}
						/>
					</div>
					<div className="col-3">
						<Dropdown
							options={cryptoData?.cryptoNetwork?.filter(
								network =>
									network.currencyId === selCrypto?.value
							)}
							value={selNetWork}
							onSelect={({ value, displayText }) => {
								setSelNetWork({ value, displayText });
							}}
							title={t("USDTWithdrawalLimitManagement.Network")}
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
							popBoxType:
								defPopBoxType.addUSDTWithdrawalLimitPopBox,
							title: t("Common.AddNew"),
							cryptoData,
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
													"USDTWithdrawalLimitManagement.CryptoCurrency"
												)}
											</th>
											<th scope="col">
												{t(
													"USDTWithdrawalLimitManagement.Network"
												)}
											</th>
											<th scope="col">
												{t(
													"WithdrawalListing.VIPLevel"
												)}
											</th>
											<th scope="col">
												{t(
													"USDTWithdrawalLimitManagement.MinimumAmount"
												)}
											</th>
											<th scope="col">
												{t(
													"USDTWithdrawalLimitManagement.MaximumAmount"
												)}
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
																	defPopBoxType.editUSDTWithdrawalLimitPopBox,
																title: t(
																	"WithdrawalSetting.Edit"
																),
																limitData: el,
																cryptoData,
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
												<td>
													{
														cryptoData.cryptoCurrency.find(
															c =>
																el.cryptoCurrencyId ===
																c.value
														).displayText
													}
												</td>
												<td>{el.network}</td>
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

export default USDTWithdrawalLimitManagement;
