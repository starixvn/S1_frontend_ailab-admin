import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import FeatherIcon from "feather-icons-react";
import { toggleSideMenuContext } from "../context";

const Header = () => {
	const { t } = useTranslation();
	const { setCollapse, collapse } = useContext(toggleSideMenuContext);
	return (
		<header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
			<a
				className={`navbar-brand col-md-3 col-lg-2 me-0 px-3${
					collapse === true ? " active" : ""
				}`}
				href="#">
				{t("Admin.lbl_Admin")}
			</a>
			<button
				onClick={() => {
					setCollapse(prev => !prev);
				}}
				className={`navbar-toggler position-absolute d-md-none${
					collapse === true ? "" : " collapsed"
				}`}
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#sidebarMenu"
				aria-controls="sidebarMenu"
				aria-expanded={collapse}
				aria-label="Toggle navigation">
				{collapse === true ? (
					<span className="navbar-toggler-icon" />
				) : (
					<FeatherIcon icon="x" />
				)}
			</button>
			<ul className="navbar-nav px-3">
				<li className="nav-item text-nowrap">
					<a className="nav-link" href="#">
						{t("Admin.lbl_SignOut")}
					</a>
				</li>
			</ul>
		</header>
	);
};

export default Header;
