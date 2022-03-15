import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../../../components/context";
import Layout from "../../../components/layout";
import { defPopBoxType } from "../../../components/popBox";
import { BankAccountFilter } from "./BankAccountFilter";
import { BankAccountTable } from "./BankAccountTable";

const BankAccount = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const openAddModal = () => {
		setPopBox({
			isOpen: true,
			title: t("AddWithdrawalLimit"),
			data: {},
			popBoxType: defPopBoxType.financeBankAccountAddModal
		});
	};

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 col-lg-10">
				<h1 className="h2">{t("Finance.BankAccount.Title")}</h1>

				<div className="bd-example">
					<BankAccountFilter openAddModal={openAddModal} />
				</div>

				<div className="bd-example">
					<BankAccountTable />
				</div>
			</main>
		</Layout>
	);
};

export { BankAccount };
