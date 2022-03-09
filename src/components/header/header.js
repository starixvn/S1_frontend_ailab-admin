import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { menuContext, userInfoContext, popBoxContext } from "../context";
import { useHandleAuth } from "../../hook";
import TabBar from "./tabBar";
import { defPopBoxType } from "../popBox";
import { siteInfo } from "../../config";
import { SiteIdDropdown } from "./SiteIdDropdown";

const Header = () => {
	const { t } = useTranslation();
	const { menu, setMenu } = useContext(menuContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { SignOut } = useHandleAuth({ userInfo, setUserInfo });

	const openChangePwd = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.changePwd,
			title: t("ChangePwd.lbl_ChangePassword")
		});
	};

	const isCollapse = menu.collapse;
	return (
		<header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap shadow">
			<Link
				className={`navbar-brand col-md-3 col-lg-2 me-0 px-3${
					isCollapse ? " active" : ""
				}`}
				to={`/${siteInfo.defaultIndex}`}>
				{t("Admin.lbl_Admin")}
			</Link>
			<TabBar />

			<SiteIdDropdown />

			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#sidebarMenu"
				aria-expanded="true"
				onClick={() => {
					setMenu(prev => ({ ...prev, collapse: !prev.collapse }));
				}}>
				<i className="icon icon-menu" />
			</button>
			<UserDropdown SignOut={SignOut} openChangePwd={openChangePwd} />
		</header>
	);
};

const UserDropdown = ({ SignOut, openChangePwd }) => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		<div className="btn-group" ref={ref}>
			<button
				type="button"
				className={`btn btn-outline-secondary btn-sm dropdown-toggle${
					isOpen ? " show" : ""
				}`}
				data-bs-toggle="dropdown"
				aria-expanded="false"
				onClick={() => setIsOpen(prev => !prev)}>
				<i className="icon icon-admin" />
			</button>
			<ul
				className={`dropdown-menu dropdown-menu-end${
					isOpen ? " show" : ""
				}`}
				data-bs-popper="none">
				<li>
					<a className="dropdown-item" href="#" onClick={SignOut}>
						{t("Admin.lbl_SignOut")}
					</a>
				</li>
				<li>
					<a
						className="dropdown-item"
						href="#"
						onClick={openChangePwd}>
						{t("ChangePwd.lbl_ChangePassword")}
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Header;
