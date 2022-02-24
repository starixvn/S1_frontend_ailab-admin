import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { menuContext } from "../context";
import MenuList from "../../datas/menu";
import { siteInfo } from "../../config";

const Levels = props => {
	const {
		areaHandler,
		t,
		showArea,
		allowfuncKeys,
		clickMenu,
		isFirstLevel
	} = props;
	const subItems = props.level.map(s => {
		if (!s.Childs) {
			const { Controller, Action, FuncKey, displayKey, Title } = s;
			const pathName = `${Controller}/${Action}`;
			const displayText = t(displayKey);

			const params = {
				Category: props.level.Category,
				Controller,
				Action,
				Title: displayText,
				FuncKey: s.FuncKey
			};
			return (
				<Link
					onClick={() => clickMenu(params)}
					key={`menu-${displayKey}-${FuncKey}`}
					className="nav-link"
					to={{
						pathname: `/${siteInfo.oldSitePrefixUrl}/${pathName}`,
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
			if (el !== props.showArea[i]) {
				isOpen = false;
				return;
			}
		});
		const content = (
			<>
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
					<Levels
						isFirstLevel={false}
						level={s.Childs}
						areaHandler={areaHandler}
						t={t}
						showArea={showArea}
						allowfuncKeys={allowfuncKeys}
						clickMenu={clickMenu}
					/>
				</div>
			</>
		);

		return isFirstLevel ? (
			<div className="accordion-item" key={`Menu-${s.displayKey}`}>
				{content}
			</div>
		) : (
			content
		);
	});
	return subItems.filter(r => r !== null);
};

const MenuItems = ({ areaHandler, t, showArea, allowfuncKeys, clickMenu }) => {
	const result = (
		<Levels
			level={MenuList}
			areaHandler={areaHandler}
			t={t}
			isFirstLevel={true}
			showArea={showArea}
			allowfuncKeys={allowfuncKeys}
			clickMenu={clickMenu}
		/>
	);
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
			if (prev.showArea.join("") === area.join("")) {
				return {
					...prev,
					showArea: oldShowArea.slice(0, -1)
				};
			}
			if (oldShowArea[oldShowArea.length - 1] === area[area.length - 2]) {
				oldShowArea.push(area[area.length - 1]);
			} else {
				oldShowArea = area;
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
