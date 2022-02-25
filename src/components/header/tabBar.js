import { useContext, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { menuContext } from "../context";
import { siteInfo } from "../../config";
import MenuList from "../../datas/menu";

const getPathName = state => `${state.Controller}/${state.Action}`;

const useHandleTab = ({ locationFuncKey, currentState }) => {
	const { t } = useTranslation();
	const history = useHistory();
	const { menu, setMenu } = useContext(menuContext);

	useEffect(() => {
		if (
			menu.tabBar?.length === 0 ||
			!menu.tabBar?.some(tab => tab.FuncKey === locationFuncKey)
		) {
			setMenu(prev => {
				let tabBar = currentState;
				if (!currentState || currentState.isIndex) {
					MenuList.every(x => {
						const { Childs } = x;
						if (Childs) {
							return Childs.every(c => {
								if (c.isIndex) {
									const { Controller, FuncKey, Action } = c;
									tabBar = {
										Controller,
										FuncKey,
										Action,
										Title: t(c.displayKey)
									};
									return false;
								}
								return true;
							});
						}

						return true;
					});
				}

				return {
					...prev,
					tabBar:
						prev.tabBar?.length &&
						prev.tabBar.some(
							prevT => prevT.FuncKey !== tabBar.FuncKey
						)
							? [...prev.tabBar, tabBar]
							: [tabBar]
				};
			});
		}
	}, [locationFuncKey]);

	const clickClose = ({ FuncKey, afterCloselinkState }) => {
		setMenu(prev => ({
			...prev,
			tabBar: prev.tabBar.filter(tab => tab.FuncKey !== FuncKey)
		}));

		if (locationFuncKey === FuncKey) {
			history.push({
				pathname: `/${siteInfo.oldSitePrefixUrl}/${getPathName(
					afterCloselinkState
				)}`,
				state: afterCloselinkState
			});
		}
	};

	return { menu, clickClose };
};

const TabBar = () => {
	const location = useLocation();
	const { FuncKey: locationFuncKey } = location?.state ?? {};
	const { menu, clickClose } = useHandleTab({
		locationFuncKey: locationFuncKey ?? siteInfo.defaultFuncKey,
		currentState: location?.state
	});

	const length = menu.tabBar?.length - 1 ?? 0;
	const allowToClose = length !== 0;
	const tabs = menu.tabBar?.map(
		({ Category, Controller, Action, Title, FuncKey }, idx) => {
			const linkState = { Category, Controller, Action, Title, FuncKey };

			const afterCloselinkState =
				idx === length ? menu.tabBar[idx - 1] : menu.tabBar[idx + 1];
			return (
				<TabItem
					key={`header-tabs-${FuncKey}`}
					linkState={linkState}
					clickClose={() =>
						clickClose({ FuncKey, afterCloselinkState })
					}
					active={
						locationFuncKey
							? FuncKey === locationFuncKey
							: FuncKey === siteInfo.defaultFuncKey
					}
					afterCloselinkState={afterCloselinkState}
					allowToClose={allowToClose}
				/>
			);
		}
	);
	return (
		<div className="quickLink">
			<h6>
				<i className="icon icon-quicklink" />
				Quick Link :
			</h6>
			{tabs}
		</div>
	);
};

const TabItem = ({ linkState, clickClose, active, allowToClose }) => (
	<div className={`btn btn-outline-primary${active ? " active" : ""}`}>
		<Link
			to={{
				pathname: `/${siteInfo.oldSitePrefixUrl}/${getPathName(
					linkState
				)}`,
				state: linkState
			}}>
			{linkState.Title}
		</Link>
		{allowToClose && (
			<button
				onClick={clickClose}
				type="button"
				className="text-primary icon icon-close"
			/>
		)}
	</div>
);

TabItem.propTypes = {
	linkState: PropTypes.shape({
		Controller: PropTypes.string.isRequired,
		Action: PropTypes.string.isRequired,
		Title: PropTypes.string.isRequired
	}).isRequired,
	clickClose: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	allowToClose: PropTypes.bool.isRequired
};

export default TabBar;
