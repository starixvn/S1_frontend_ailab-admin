import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../../components/layout";
import {
	useGetDateRange,
	useHandlePage,
	useSelectCurrencies
} from "../../../hook";
import { Empty, Pagination } from "../../../components";
import { allSiteListContext, popBoxContext } from "../../../components/context";
import { defPopBoxType } from "../../../components/popBox";
import { useDeleteBetLimitFetcher, useTpBetLimitListFetcher } from "./hook";
import { BetLimitFilter } from "./BetLimitFilter";
import { BetLimitTable } from "./BetLimitTable";
import { MODAL_TYPE } from "./def";

const BetLimit = () => {
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
		loading,
		totalPages,
		rowCount,
		betLimitList,
		getTpBetLimitList
	} = useTpBetLimitListFetcher();

	const { deleteBetLimit } = useDeleteBetLimitFetcher();

	const {
		dateRange: { startDate, endDate },
		setDateRange
	} = useGetDateRange();

	const [form, setForm] = useState({
		userName: ""
	});

	const handleSearchSubmit = async pageData => {
		const { currentPage = 1, pageSize = 10 } = pageData ?? {};

		const currencyIds = getCurrenciesAPIPayload();

		getTpBetLimitList({
			...form,
			currencyIds,
			startDate,
			endDate,
			pageNumber: currentPage,
			pageSize,
			siteIds: [siteId]
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

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value
		});
	};

	const openAddLimitModal = (type = MODAL_TYPE.NEW, custId) => {
		const title =
			type === MODAL_TYPE.EDIT ? "Update Bet Limit" : "Add Bet Limit";

		setPopBox({
			isOpen: true,
			title,
			data: { type, custId },
			popBoxType: defPopBoxType.csdBetLimitAddLimit
		});
	};

	const handleUpdateBetLimit = custId => {
		openAddLimitModal(MODAL_TYPE.EDIT, custId);
	};

	const handleDeleteBetLimit = async custId => {
		await deleteBetLimit(custId);

		handleSearchSubmit();
	};

	const tableRowStartIndex = (currentPage - 1) * pageSize + 1;

	const isEmpty = betLimitList.length === 0 && loading === false;

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 col-lg-10 custmanage-userbetlimit">
				<h1 className="h2">{t("CSD.BetLimit.Title")}</h1>

				<div className="bd-example">
					<BetLimitFilter
						currenciesSelected={currenciesSelected}
						currencyList={currencyList}
						onSelectCurrency={onSelectCurrency}
						setField={setField}
						openAddLimitModal={() => openAddLimitModal()}
						onSubmit={() => clickPageNumber(1)}
						setDateRange={setDateRange}
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
								<BetLimitTable
									loading={loading}
									betLimitList={betLimitList}
									tableRowStartIndex={tableRowStartIndex}
									onUpdateBetLimit={handleUpdateBetLimit}
									onDeleteBetLimit={handleDeleteBetLimit}
								/>
							</Pagination>
						)}
					</div>
				)}
			</main>
		</Layout>
	);
};
export { BetLimit };
