import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../../components/layout";
import {
	useGetDateRange,
	useHandlePage,
	useSelectCurrencies
} from "../../../hook";

import { Empty, Pagination } from "../../../components";
import { RegistrationManagementFilter } from "./RegistrationManagementFilter";
import { MemoRegistrationManagementTable } from "./RegistrationManagementTable";
import { allSiteListContext, popBoxContext } from "../../../components/context";
import { STATUS_TYPE, AGENT_CODE_TYPE, DEPOSIT_STATUS } from "./def";
import {
	useGetRegLiveStatusListFetcher,
	useExportRegLiveStatusListFetcher
} from "./hook";
import { defPopBoxType } from "../../../components/popBox";

const RegistrationManagement = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { allSiteList, siteId } = useContext(allSiteListContext);

	const { currencyList } = useSelectCurrencies({
		siteId,
		allSiteList,
		defaultSelectFirst: true
	});

	const {
		dateRange: { startDate, endDate },
		setDateRange
	} = useGetDateRange();

	const {
		loading,
		regLiveStatusList,
		totalPages,
		rowCount,
		getRegLiveStatusList
	} = useGetRegLiveStatusListFetcher();

	const { exportRegLiveStatusList } = useExportRegLiveStatusListFetcher();

	const [form, setForm] = useState({
		currencyId: 0,
		depositStatus: DEPOSIT_STATUS[0].value,
		status: STATUS_TYPE[0].value,
		user: "",
		sort: 0,
		affiliatesCode: "",
		agentCodeType: AGENT_CODE_TYPE[0].value
	});

	const handleSearchSubmit = async pageData => {
		const { currentPage = 1, pageSize = 10 } = pageData ?? {};

		getRegLiveStatusList({
			...form,
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

	const handleExportReport = () => {
		exportRegLiveStatusList({
			...form,
			startDate,
			endDate,
			siteIds: [siteId]
		});
	};

	const handleEditStatueModal = useCallback(
		custId => () => {
			setPopBox({
				isOpen: true,
				title: "Edit Status",
				data: {
					custId,
					siteId,
					callBack: () => {
						handleSearchSubmit({ currentPage, pageSize });
					}
				},

				popBoxType: defPopBoxType.csdRegistrationManagementEditStatus
			});
		},
		[siteId]
	);

	const handleAddNotesModal = useCallback(
		custId => () => {
			setPopBox({
				isOpen: true,
				title: "Add Notes",
				data: { custId },
				popBoxType: defPopBoxType.csdRegistrationManagementAddNotes
			});
		},
		[siteId]
	);

	const handleNotesTableModal = useCallback(
		custId => () => {
			setPopBox({
				isOpen: true,
				title: "Note Log",
				data: { custId },
				popBoxType: defPopBoxType.csdRegistrationManagementNotesTable
			});
		},
		[siteId]
	);

	const tableRowStartIndex = (currentPage - 1) * pageSize + 1;

	const isEmpty = regLiveStatusList.length === 0 && loading === false;

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 col-lg-10">
				<h1 className="h2">{t("CSD.RegistrationManagement.Title")}</h1>
				<div className="bd-example">
					<RegistrationManagementFilter
						form={form}
						loading={loading}
						currencyList={currencyList}
						setDateRange={setDateRange}
						setField={setField}
						onSubmit={() => clickPageNumber(1)}
						onExportReport={handleExportReport}
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
								<MemoRegistrationManagementTable
									loading={loading}
									regLiveStatusList={regLiveStatusList}
									tableRowStartIndex={tableRowStartIndex}
									onEditStatueModal={handleEditStatueModal}
									onAddNotesModal={handleAddNotesModal}
									onNotesTableModal={handleNotesTableModal}
								/>
							</Pagination>
						)}
					</div>
				)}
			</main>
		</Layout>
	);
};

export { RegistrationManagement };
