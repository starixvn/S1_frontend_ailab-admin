import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./css/bootstrap-grid.css";
import "./css/bootstrap-reboot.css";
import "./css/bootstrap-utilities.css";
import "./css/bootstrap.css";
import "./css/css.css";
import "./css/dashboard.css";
import "./css/docs.css";
import "./css/signin.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
