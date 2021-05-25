import { homeRequest } from "./base";

export const api_home_Signin = (username, password) =>
	homeRequest.post("/Signin", { txtID: username, txtPW: password });

export const api_home_CheckSignIn = () => homeRequest.post("/CheckSignIn/");

export const api_home_SignOut = () => homeRequest.post("/SignOut");
