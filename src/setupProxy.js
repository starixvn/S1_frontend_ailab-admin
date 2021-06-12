const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
	app.use(
		[
			"/api",

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
			"/ServerInfo"
		],
		createProxyMiddleware({
			target: "http://admin.n88dev.com",
			changeOrigin: true
		})
	);
};
