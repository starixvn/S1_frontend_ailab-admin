import React from "react";
import Menu from "./menu";
import Header from "./header";

const Layout = ({ children }) => (
	<>
		<Header />
		<div className="container-fluid">
			<div className="row">
				<Menu />
				{children}
			</div>
		</div>
	</>
);

export default Layout;
