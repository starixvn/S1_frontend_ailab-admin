import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FeatherIcon from "feather-icons-react";
import { toggleSideMenuContext } from "./context";
import MenuList from "../datas/menu";

const MenuItems = ({ areaHandler, t, showArea }) => {
	const result = MenuList.map(m => {
		const menuKey = m.displayKey;
		const isOpen = showArea === m.Category;
		const subItems = m.Childs.map(s => {
			const { Controller, Action, FuncKey, displayKey, Title } = s;
			const pathName = `${Controller}/${Action}`;
			const displayText = displayKey ? t(displayKey) : Title;
			return (
				<Link
					key={`menu-${menuKey}-${FuncKey}`}
					className="nav-link"
					to={{
						pathname: `/${pathName}`,
						state: {
							Category: m.Category,
							Controller,
							Action,
							Title: displayText
						}
					}}>
					{displayText}
				</Link>
			);
		});
		return (
			<div className="accordion-item" key={`Menu-${menuKey}`}>
				<button
					onClick={() => areaHandler({ area: m.Category })}
					className={`accordion-button${isOpen ? "" : " collapsed"}`}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={`#${menuKey}`}
					aria-expanded={isOpen}
					aria-controls={menuKey}>
					<FeatherIcon icon={m.Icon} />
					{t(menuKey)}
				</button>
				<div
					id={menuKey}
					className={`accordion-collapse collapse${
						isOpen ? " show" : ""
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
	const { menu, setMenu } = useContext(toggleSideMenuContext);
	const areaHandler = ({ area }) => {
		setMenu(prev => ({
			...prev,
			showArea: prev.showArea === area ? "" : area
		}));
	};

	const isCollapse = menu.collapse;

	return (
		<nav
			id="sidebarMenu"
			className={`col-md-3 col-lg-2 bg-light sidebar collapse${
				isCollapse ? "" : " show"
			}`}>
			<div className="position-sticky pt-3">
				<div
					className="accordion accordion-flush"
					id="accordionFlushExample">
					<MenuItems
						areaHandler={areaHandler}
						t={t}
						showArea={menu.showArea}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Menu;
