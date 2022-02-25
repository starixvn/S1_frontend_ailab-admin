import { enumRequest } from "./base";

export const api_enum_GetEnumType = ({ enumName }) =>
	enumRequest.post("/GetEnumType", {
		enumName
	});
