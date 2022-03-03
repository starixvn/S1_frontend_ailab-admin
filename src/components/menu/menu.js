import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { menuContext } from "../context";
import MenuList from "../../datas/menu";
import { siteInfo } from "../../config";

const Levels = ({
	level,
	areaHandler,
	t,
	isFirstLevel,
	showArea,
	allowfuncKeys,
	clickMenu
}) => {
	if (!level) return null;
	const subItems = level.map(s => {
		const { Controller, Action, FuncKey, displayKey, Title, NewAdmin } = s;
		const pathName = `${Controller}/${Action}`;
		const displayText = t(displayKey);

		const params = {
			Category: level.Category,
			Controller,
			Action,
			Title: displayText,
			FuncKey,
			NewAdmin
		};

		if (!s.Childs) {
			if (!(FuncKey in allowfuncKeys)) return null;
			return (
				<Link
					onClick={() => clickMenu(params)}
					key={`menu-${displayKey}-${FuncKey}`}
					className="nav-link"
					to={{
						pathname: `/${
							NewAdmin
								? siteInfo.newSitePrefixUrl
								: siteInfo.oldSitePrefixUrl
						}/${pathName}`,
						state: params
					}}>
					{displayText}
				</Link>
			);
		}
		const menuKey = s.displayKey;
		let isOpen = true;
		/* eslint no-useless-return: 0 */
		s.Category?.forEach((el, i) => {
			if (el !== showArea?.[i]) {
				isOpen = false;
				return;
			}
		});

		const links = Levels({
			isFirstLevel: false,
			level: s.Childs,
			areaHandler,
			t,
			showArea,
			allowfuncKeys,
			clickMenu
		});

		if (!links.length) return null;
		const content = (
			<Fragment key={`Menu-${displayKey}`}>
				<button
					onClick={() => areaHandler({ area: s.Category })}
					className={`accordion-button${isOpen ? "" : " collapsed"}`}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={`#${menuKey}`}
					aria-expanded={isOpen}
					aria-controls={menuKey}>
					{isFirstLevel && <i className={`icon icon-${s.Icon}`} />}
					{t(menuKey)}
				</button>
				<div
					id={menuKey}
					className={`accordion-collapse collapse${
						isOpen ? " show" : ""
					}`}
					aria-labelledby="flush-headingOne"
					data-bs-parent="#accordionFlushExample">
					{links}
				</div>
			</Fragment>
		);

		return isFirstLevel ? (
			<div className="accordion-item" key={`Menu-${displayKey}`}>
				{content}
			</div>
		) : (
			content
		);
	});
	return subItems.filter(r => r !== null);
};

const MenuItems = ({ areaHandler, t, showArea, allowfuncKeys, clickMenu }) => {
	const result = Levels({
		level: MenuList,
		areaHandler,
		t,
		isFirstLevel: true,
		showArea,
		allowfuncKeys,
		clickMenu
	});

	return result;
};

const Menu = () => {
	const { t } = useTranslation();
	const { menu, setMenu } = useContext(menuContext);
	const clickMenu = ({ Category, Controller, Action, Title, FuncKey }) => {
		const { tabBar } = menu;
		if (!tabBar.some(tab => tab.FuncKey === FuncKey)) {
			setMenu(prev => {
				const { tabBar: prevTabBar } = prev;
				const newTabBar = prevTabBar.some(
					prevTab => prevTab.FuncKey === FuncKey
				)
					? prevTabBar
					: [
							...prevTabBar,
							{ Category, Controller, Action, Title, FuncKey }
					  ];

				return { ...prev, tabBar: newTabBar };
			});
		}
	};

	const areaHandler = ({ area }) => {
		setMenu(prev => {
			let oldShowArea = JSON.parse(JSON.stringify(prev.showArea));

			if (area.length > prev.showArea) {
				// open
				oldShowArea.push(area[area.length - 1]);
			} else if (
				area[area.length - 2] === oldShowArea[oldShowArea.length - 2] &&
				area[area.length - 1] !== oldShowArea[oldShowArea.length - 1]
			) {
				// open
				oldShowArea = area;
			} else {
				// close

				const idx = oldShowArea.indexOf(area[area.length - 1]);
				if (idx >= 0) {
					oldShowArea = oldShowArea.slice(0, idx);
				} else {
					oldShowArea = area;
				}
			}

			return {
				...prev,
				showArea: oldShowArea
			};
		});
	};

	const isCollapse = menu.collapse;

	return (
		<nav
			id="sidebarMenu"
			className={`col-md-3 col-lg-2 bg-light overflow-auto sidebar collapse${
				isCollapse ? "" : " show"
			}`}>
			<div
				className="accordion accordion-flush"
				id="accordionFlushExample">
				<MenuItems
					areaHandler={areaHandler}
					t={t}
					showArea={menu.showArea}
					allowfuncKeys={menu.allowfuncKeys}
					clickMenu={clickMenu}
				/>
			</div>
		</nav>
	);
};

export default Menu;
