import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../layout";
import { NavBar } from "./nav";

export default function Component({ children, custId }) {
	const { t } = useTranslation();
	return (
		<Layout>
			<main className="col-md-9 col-lg-10 customerInformation">
				<h1 className="h2">{t("Member.MemberDetail.Title")}</h1>
				<NavBar custId={custId} />
				{children}
			</main>
		</Layout>
	);
}
