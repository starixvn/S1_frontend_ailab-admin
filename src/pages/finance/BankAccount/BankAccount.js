import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Empty, Pagination } from "../../../components";
import { allSiteListContext, popBoxContext } from "../../../components/context";
import Layout from "../../../components/layout";
import { defPopBoxType } from "../../../components/popBox";
import {
	useHandlePage,
	useSelectCurrencies,
	useSelectEnumTypes
} from "../../../hook";
import { BankAccountFilter } from "./BankAccountFilter";
import { BankAccountTable } from "./BankAccountTable";
import { useDeleteBankCardFetcher } from "./hook";
import { useGetListBySiteIdFetcher } from "./hook/useGetListBySiteIdFetcher";

const BankAccount = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { allSiteList, siteId } = useContext(allSiteListContext);

	const {
		currencyList,
		selected: currenciesSelected,
		OnSelectCurrency: onSelectCurrency,
		getAPIPayload: getCurrenciesAPIPayload
	} = useSelectCurrencies({
		siteId,
		allSiteList,
		defaultSelectAll: true,
		defaultSelectFirst: false
	});

	const {
		selected: bankOptionSelected,
		OnSelect: onBankDetailSelect,
		options: bankDetailOptions,
		getAPIPayload: getBankDetailAPIPayload
	} = useSelectEnumTypes({
		enumName: "BankDetailOffStatusEnum",
		defaultSelectAll: false,
		defaultSelectFirst: true
	});

	const {
		loading,
		bankInfoList,
		totalPages,
		rowCount,
		getListBySiteId
	} = useGetListBySiteIdFetcher();

	const { deleteBankCard } = useDeleteBankCardFetcher();

	const handleSearchSubmit = pageData => {
		const { currentPage = 1, pageSize = 10 } = pageData ?? {};

		const currencyIds = getCurrenciesAPIPayload();
		const statuses = getBankDetailAPIPayload();

		getListBySiteId({
			pageNumber: currentPage,
			pageSize,
			siteIds: [siteId],
			currencyIds,
			statuses
		});
	};

	const {
		currentPage = 1,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({
		callback: handleSearchSubmit
	});

	const openAddModal = () => {
		setPopBox({
			isOpen: true,
			title: t("AddWithdrawalLimit"),
			data: {},
			popBoxType: defPopBoxType.financeBankAccountAddModal
		});
	};

	const handleDeleteBankCard = async bankId => {
		await deleteBankCard(bankId);

		handleSearchSubmit();
	};

	const tableRowStartIndex = (currentPage - 1) * pageSize + 1;

	const isEmpty = bankInfoList.length === 0 && loading === false;

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 col-lg-10">
				<h1 className="h2">{t("Finance.BankAccount.Title")}</h1>

				<div className="bd-example">
					<BankAccountFilter
						currenciesSelected={currenciesSelected}
						currencyList={currencyList}
						bankDetailOptions={bankDetailOptions}
						bankOptionSelected={bankOptionSelected}
						onBankDetailSelect={onBankDetailSelect}
						onSelectCurrency={onSelectCurrency}
						openAddModal={openAddModal}
						onSubmit={() => clickPageNumber(1)}
					/>
				</div>

				{loading !== undefined && (
					<div className="bd-example">
						{isEmpty ? (
							<Empty />
						) : (
							<Pagination
								t={t}
								currentPage={currentPage}
								totalPages={totalPages}
								pageSize={pageSize}
								rowCount={rowCount}
								onSelectEntry={onSelectEntry}
								clickPageNumber={clickPageNumber}>
								<BankAccountTable
									loading={loading}
									tableRowStartIndex={tableRowStartIndex}
									bankInfoList={bankInfoList}
									bankDetailOptions={bankDetailOptions}
									onDeleteBankCard={handleDeleteBankCard}
								/>
							</Pagination>
						)}
					</div>
				)}
			</main>
		</Layout>
	);
};

export { BankAccount };
