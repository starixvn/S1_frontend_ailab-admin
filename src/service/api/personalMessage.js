import { personalMessageRequest } from "./base";

export const api_personalMessage_GetBatchMessageList = async ({
	pageNumber,
	siteIds,
	startDate,
	endDate,
	pageSize
}) => {
	const { data } = await personalMessageRequest.post("/GetBatchMessageList", {
		pageNumber,
		siteIds,
		startDate,
		endDate,
		pageSize
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};

export const api_personalMessage_SendMessageBatch = formData =>
	personalMessageRequest.post("/SendMessageBatch", formData, {
		headers: {
			"content-type": "multipart/form-data"
		}
	});

export const api_personalMessage_UpdateBatchMessage = formData =>
	personalMessageRequest.post("/UpdateBatchMessage", formData);

export const api_personalMessage_DeleteBatchMessage = async batchId => {
	const { data } = await personalMessageRequest.post("/DeleteBatchMessage", {
		batchId
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}
};

export const api_personalMessage_ExportSendMessageBatchResultReport = async batchId => {
	const response = await personalMessageRequest.post(
		"/ExportSendMessageBatchResultReport",
		{
			batchId
		},
		{ responseType: "blob" }
	);

	return response;
};

export const api_personalMessage_GetBatchMessage = async batchId => {
	const { data } = await personalMessageRequest.post("/GetBatchMessage", {
		batchId
	});

	if (data.errorCode !== 0) {
		throw new Error(data.message);
	}

	return data;
};
