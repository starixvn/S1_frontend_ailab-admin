import { getAllDataRequest } from "./base";

export const api_getAllData_GetCurrency = () =>
	getAllDataRequest.post("/GetCurrency");
