import { apiV2Request } from "./base";

export const api_DepositSubmission_Submit = formData =>
	apiV2Request.post("/DepositSubmission/Submit", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
