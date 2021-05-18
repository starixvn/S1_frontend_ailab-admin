import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";

const DynamicAttr = () => (
	<Helmet
		bodyAttributes={{
			class: "text-center"
		}}
	/>
);

const Index = () => {
	const { t } = useTranslation();
	return (
		<>
			<HelmetProvider>
				<DynamicAttr />
			</HelmetProvider>
			<main className="form-signin">
				<form>
					<span data-feather="users" />
					<h1 className="h3 mb-3 fw-normal">
						{t("Login.lbl_AdminLogin")}
					</h1>
					<div className="form-floating">
						<input
							type="text"
							className="form-control"
							id="floatingInput"
						/>
						<label htmlFor="floatingInput">
							<span data-feather="user" />
							User Name
						</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
						/>
						<label htmlFor="floatingPassword">
							<span data-feather="lock" />
							User Password
						</label>
					</div>

					<div className="checkbox mb-3">
						<label>
							<input type="checkbox" value="remember-me" />{" "}
							Remember me
						</label>
					</div>
					<button
						className="w-100 btn btn-lg btn-primary"
						type="submit">
						Sign in
					</button>
				</form>
			</main>
		</>
	);
};

export default Index;
