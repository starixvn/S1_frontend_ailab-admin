import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FeatherIcon from "feather-icons-react";
import { toggleSideMenuContext } from "./context";
import MenuList from "../datas/menu";

const MenuItems = ({ areaHandler, t, showArea }) => {
	const result = MenuList.map(m => {
		const menuKey = m.displayKey;
		const subItems = m.Childs.map(s => {
			const { Controller, Action, FuncKey } = s;
			const pathName = `/${Controller}/${Action}`;
			return (
				<Link
					key={`menu-${menuKey}-${s.FuncKey}`}
					className="nav-link"
					to={{
						pathname: pathName,
						state: {
							url: pathName,
							funcKey: FuncKey
						}
					}}>
					{s.displayKey ? t(s.displayKey) : s.Title}
				</Link>
			);
		});
		return (
			<div className="accordion-item" key={`Menu-${menuKey}`}>
				<button
					onClick={() => areaHandler({ area: menuKey })}
					className={`accordion-button${
						showArea.includes(menuKey) ? "" : " collapsed"
					}`}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={`#${menuKey}`}
					aria-expanded={showArea.includes(menuKey)}
					aria-controls={menuKey}>
					<FeatherIcon icon="file-text" />
					{t(menuKey)}
				</button>
				<div
					id={menuKey}
					className={`accordion-collapse collapse${
						showArea.includes(menuKey) ? " show" : ""
					}`}
					aria-labelledby="flush-headingOne"
					data-bs-parent="#accordionFlushExample">
					{subItems}
				</div>
			</div>
		);
	});

	return result;
};

const Menu = () => {
	const { t } = useTranslation();
	const { collapse } = useContext(toggleSideMenuContext);
	const [showArea, setShowArea] = useState([]);
	const areaHandler = ({ area }) => {
		if (showArea.includes(area)) {
			setShowArea(prev => prev.filter(el => el !== area));
		} else {
			setShowArea(prev => [...prev, area]);
		}
	};

	return (
		<nav
			id="sidebarMenu"
			className={`col-md-3 col-lg-2 bg-light sidebar collapse${
				collapse === true ? "" : " show"
			}`}>
			<div className="position-sticky pt-3">
				<div
					className="accordion accordion-flush"
					id="accordionFlushExample">
					<MenuItems
						areaHandler={areaHandler}
						t={t}
						showArea={showArea}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Menu;
