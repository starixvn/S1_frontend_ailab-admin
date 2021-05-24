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
import MenuList from "./datas/menu";

const reactAlertOptions = {
	timeout: 2500,
	position: positions.MIDDLE
};

const iframeRoutes = () => {
	const result = [];

	MenuList.forEach(m => {
		if (m.Childs) {
			m.Childs.forEach(c => {
				result.push(
					<ContextRoute
						path={`/${c.Controller}/${c.Action}`}
						afterLogin={true}>
						<IframePage />
					</ContextRoute>
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
							{iframeRoutes()}
						</Switch>
					</Router>
				</ReactAlertProvider>
			</I18nextProvider>
		</Suspense>
	);
}

export default App;
