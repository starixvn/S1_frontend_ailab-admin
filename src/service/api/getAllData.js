import { getAllDataRequest } from "./base";

export const api_getAllData_GetCurrency = () =>
	getAllDataRequest.post("/GetCurrency");

export const api_getAllData_GetTpCategory = async () => {
	const { data } = await getAllDataRequest.post("/GetTpCategory");

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
	return data?.data ?? [];
};

export const api_getAllData_GetSlotTpList = () =>
	getAllDataRequest.post("/GetSlotTpList");
