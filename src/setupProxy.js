const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
	app.use(
		[
			"/api",
			"/apiV2",

			"/lib",
			"/js",
			"/css",

			"/Home",
			"/Admin",
			"/BankFinancial",
			"/CustManage",
			"/Finance",
			"/Marketing",
			"/Message",
			"/Report",
			"/ServerInfo",
			"/common",
			"/ApiV2"
		],
		createProxyMiddleware({
			target: "http://admin.n88dev.com",
			changeOrigin: true
		})
	);
};
