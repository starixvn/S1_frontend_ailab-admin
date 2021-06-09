import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import FeatherIcon from "feather-icons-react";
import { menuContext, userInfoContext } from "../context";
import useHandleAuth from "../../hook/useHandleAuth";

const Header = () => {
	const { t } = useTranslation();
	const { menu, setMenu } = useContext(menuContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { SignOut } = useHandleAuth({ userInfo, setUserInfo });

	const isCollapse = menu.collapse;
	return (
		<header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
			<a
				className={`navbar-brand col-md-3 col-lg-2 me-0 px-3${
					isCollapse ? " active" : ""
				}`}
				href="/">
				{t("Admin.lbl_Admin")}
			</a>
			<button
				onClick={() => {
					setMenu(prev => ({ ...prev, collapse: !prev.collapse }));
				}}
				className={`navbar-toggler position-absolute d-md-none${
					isCollapse ? " collapsed" : ""
				}`}
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#sidebarMenu"
				aria-controls="sidebarMenu"
				aria-expanded={!isCollapse}
				aria-label="Toggle navigation">
				{isCollapse ? (
					<span className="navbar-toggler-icon" />
				) : (
					<FeatherIcon icon="x" />
				)}
			</button>
			<ul className="navbar-nav px-3">
				<li className="nav-item text-nowrap">
					<a className="nav-link" href="#" onClick={SignOut}>
						{t("Admin.lbl_SignOut")}
					</a>
				</li>
			</ul>
		</header>
	);
};

export default Header;
