import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { positions, Provider as ReactAlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ContextRoute from "./components/context";

import i18n from "./i18n/config";
import Login from "./pages/login";
import path from "./path";
import Dashboard from "./pages/dashboard";
import IframePage from "./pages/iframePage";

const reactAlertOptions = {
	timeout: 2500,
	position: positions.MIDDLE
};

function App() {
	return (
		<Suspense fallback="loading">
			<I18nextProvider i18n={i18n}>
				<ReactAlertProvider
					template={AlertTemplate}
					{...reactAlertOptions}>
					<Router>
						<Switch>
							<ContextRoute
								path={`/${path.login.root}`}
								afterLogin={false}>
								<Login />
							</ContextRoute>

							<ContextRoute exact path="/" afterLogin={true}>
								<Dashboard />
							</ContextRoute>

							<ContextRoute
								path={`/${path.winLostReport.root}`}
								afterLogin={true}>
								<IframePage />
							</ContextRoute>
						</Switch>
					</Router>
				</ReactAlertProvider>
			</I18nextProvider>
		</Suspense>
	);
}

export default App;
