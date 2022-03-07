import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../../components/layout";
import { useHandlePage } from "../../../hook";

import { Pagination } from "../../../components";
import { RegistrationManagementFilter } from "./RegistrationManagementFilter";
import { RegistrationManagementTable } from "./RegistrationManagementTable";

const RegistrationManagement = () => {
	const { t } = useTranslation();

	const {
		currentPage,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({
		callback: () => null
	});

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 col-lg-10">
				<h1 className="h2">{t("CSD.RegistrationManagement.Title")}</h1>

				<div className="bd-example">
					<RegistrationManagementFilter />
				</div>

				<div className="bd-example">
					<Pagination
						t={t}
						currentPage={currentPage}
						totalPages={0}
						clickPageNumber={clickPageNumber}
						pageSize={pageSize}
						totalEntries={pageSize}
						onSelectEntry={onSelectEntry}>
						<RegistrationManagementTable
							loading={false}
							list={[]}
						/>
					</Pagination>
				</div>
			</main>
		</Layout>
	);
};

export { RegistrationManagement };
