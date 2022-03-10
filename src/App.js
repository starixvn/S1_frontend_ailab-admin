import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { positions, Provider as ReactAlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import i18n from "./i18n/config";
import Login from "./pages/login";
import Tagmanagement from "./pages/csd/tagManagement";
import Dashboard from "./pages/dashboard";
import path from "./path";
import NoMatch from "./pages/404";
import IframePage from "./pages/iframePage";
import MenuList from "./datas/menu";
import Wrapper from "./components/wrapper";
import { siteInfo } from "./config";
import WithdrawalSetting from "./pages/csd/kyc/withdrawalSetting";
import DepositListing from "./pages/finance/depositListing";
import { PersonalMessage, RegistrationManagement } from "./pages/csd";
import MemberList from "./pages/csd/memberList";
import WithdrawalListing from "./pages/finance/withdrawalListing";
import { PersonalMessage } from "./pages/csd";

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

								<Route path={`/${path.tagManagement.root}`}>
									<Tagmanagement />
								</Route>
								<Route exact path={`/${path.dashboard.root}`}>
									<Dashboard />
								</Route>

								<Route
									path={`/${path.personalMessage.root}`}
									component={PersonalMessage}
								/>

								<Route
									path={`/${path.registrationManagement.root}`}
									component={RegistrationManagement}
								/>

								<Route
									path={`/${path.memberList.root}`}
									component={MemberList}
								/>
								<Route
									path={`/${path.withdrawalListing.root}`}
									component={WithdrawalListing}
								/>
								<Route exact path="/" component={IframePage} />
								{iframeRoutes()}
								<Route
									component={DepositListing}
									path={`/${path.depositList.root}`}
								/>
								<Route
									component={WithdrawalSetting}
									path={`/${path.withdrawalSetting.root}`}
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
