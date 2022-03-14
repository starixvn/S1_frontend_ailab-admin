import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Empty, Pagination } from "../../../components";

import Layout from "../../../components/layout";
import { WithdrawableAdjustmentTable } from "./WithdrawableAdjustmentTable";
import { WithdrawableAdjustmentFilter } from "./WithdrawableAdjustmentFilter";
import { useGetWithdrawalLimitAdjustmentLogFetcher } from "./hook/useGetWithdrawalLimitAdjustmentLogFetcher";
import { allSiteListContext } from "../../../components/context";
import { useHandlePage } from "../../../hook";

const WithdrawableAdjustment = () => {
	const { t } = useTranslation();
	const { siteId } = useContext(allSiteListContext);

	const [form, setForm] = useState({
		userName: ""
	});

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value
		});
	};

	const {
		loading,
		logList,
		totalPages,
		rowCount,
		getLog
	} = useGetWithdrawalLimitAdjustmentLogFetcher();

	const handleSearchSubmit = pageData => {
		const { currentPage = 1, pageSize = 10 } = pageData ?? {};

		getLog({
			...form,
			pageNumber: currentPage,
			pageSize,
			siteId
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

	const tableRowStartIndex = (currentPage - 1) * pageSize + 1;

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 col-lg-10">
				<h1 className="h2">
					{t("Finance.WithdrawableAdjustment.Title")}
				</h1>

				<div className="bd-example">
					<WithdrawableAdjustmentFilter
						setField={setField}
						onSubmit={() => clickPageNumber(1)}
						loading={loading}
					/>
				</div>

				{loading !== undefined && (
					<div className="bd-example">
						{logList.length === 0 && loading === false ? (
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
								<WithdrawableAdjustmentTable
									loading={loading}
									logList={logList}
									tableRowStartIndex={tableRowStartIndex}
								/>
							</Pagination>
						)}
					</div>
				)}
			</main>
		</Layout>
	);
};

export { WithdrawableAdjustment };
