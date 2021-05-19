import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import Login from "./pages/login";
import path from "./path";
import Dashboard from "./pages/dashboard";
import IframePage from "./pages/iframePage";

function App() {
	return (
		<Suspense fallback="loading">
			<I18nextProvider i18n={i18n}>
				<Router>
					<Switch>
						<Route path={`/${path.login.root}`}>
							<Login />
						</Route>
						<Route path="/">
							<Dashboard />
						</Route>
						<Route path={`/${path.winLostReport.root}`}>
							<IframePage />
						</Route>
					</Switch>
				</Router>
			</I18nextProvider>
		</Suspense>
	);
}

export default App;
