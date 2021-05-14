import { homeRequest } from "./base";

export const api_home_Signin = (username, password) =>
	homeRequest.post("/Signin", { txtID: username, txtPW: password });
