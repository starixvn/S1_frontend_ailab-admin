import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { positions, Provider as ReactAlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import i18n from "./i18n/config";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import path from "./path";
import NoMatch from "./pages/404";
import IframePage from "./pages/iframePage";
import MenuList from "./datas/menu";
import Wrapper from "./components/wrapper";
import { siteInfo } from "./config";
import DepositListing from "./pages/finance/depositListing";

const reactAlertOptions = {
	timeout: 5000,
	position: positions.BOTTOM_RIGHT
};

const iframeRoutes = () => {
	const result = [];

	MenuList.forEach(m => {
		if (m.Childs) {
			m.Childs.forEach(c => {
				result.push(
					<Route
						key={`route-${m.displayKey}-${c.displayKey}`}
						path={`/${siteInfo.oldSitePrefixUrl}/${c.Controller}/${c.Action}`}>
						<IframePage />
					</Route>
				);
			});
		}
	});

	return result;
};

function App() {
	return (
		<Suspense fallback="loading">
			<I18nextProvider i18n={i18n}>
				<ReactAlertProvider
					template={AlertTemplate}
					{...reactAlertOptions}>
					<Wrapper>
						<Router>
							<Switch>
								<Route path={`/${path.login.root}`}>
									<Login />
								</Route>
								<Route exact path={`/${path.dashboard.root}`}>
									<Dashboard />
								</Route>

								<Route exact path="/" component={IframePage} />
								{iframeRoutes()}
								<Route
									component={DepositListing}
									path={`/${path.depositListing.root}`}
								/>
								<Route component={NoMatch} />
							</Switch>
						</Router>
					</Wrapper>
				</ReactAlertProvider>
			</I18nextProvider>
		</Suspense>
	);
}

export default App;
