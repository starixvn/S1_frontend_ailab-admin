import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { menuContext } from "../context";
import { siteInfo } from "../../config";

const TabBar = () => {
	const location = useLocation();
	const { FuncKey: locationFuncKey } = location?.state ?? {};
	const { menu, setMenu } = useContext(menuContext);

	const clickClose = ({ FuncKey }) => {
		setMenu(prev => ({
			...prev,
			tabBar: prev.tabBar.filter(tab => tab.FuncKey !== FuncKey)
		}));
	};

	const length = menu.tabBar.length - 1;
	const allowToClose = length !== 0;
	const tabs = menu.tabBar.map(
		({ Category, Controller, Action, Title, FuncKey }, idx) => {
			const linkState = { Category, Controller, Action, Title, FuncKey };

			const afterCloselinkState =
				idx === length ? menu.tabBar[idx - 1] : menu.tabBar[idx + 1];
			return (
				<TabItem
					key={`header-tabs-${FuncKey}`}
					linkState={linkState}
					clickClose={() => clickClose({ FuncKey })}
					active={FuncKey === locationFuncKey}
					afterCloselinkState={afterCloselinkState}
					allowToClose={allowToClose}
				/>
			);
		}
	);
	return <div className="quickLink">{tabs}</div>;
};

const TabItem = ({
	linkState,
	clickClose,
	active,
	afterCloselinkState,
	allowToClose
}) => {
	const getPathName = state => `${state.Controller}/${state.Action}`;
	return (
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
				<Link
					to={{
						pathname: `/${siteInfo.oldSitePrefixUrl}/${getPathName(
							afterCloselinkState
						)}`,
						state: afterCloselinkState
					}}
					type="button"
					onClick={clickClose}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-x text-primary">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</Link>
			)}
		</div>
	);
};

TabItem.propTypes = {
	linkState: PropTypes.shape({
		Controller: PropTypes.string.isRequired,
		Action: PropTypes.string.isRequired,
		Title: PropTypes.string.isRequired
	}).isRequired,
	clickClose: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	afterCloselinkState: PropTypes.shape({
		Controller: PropTypes.string.isRequired,
		Action: PropTypes.string.isRequired,
		Title: PropTypes.string.isRequired
	}).isRequired,
	allowToClose: PropTypes.bool.isRequired
};

export default TabBar;
