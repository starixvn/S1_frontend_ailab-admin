import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import {
	api_customerManage_GetTagByCustId,
	api_customerManage_SetTag
} from "../../../service/api/customerManage";
import { api_BaseData_GetTagByStatus } from "../../../service/api/baseData";

const useHandleTags = ({ custId }) => {
	const alert = useAlert();
	const [tag_Options, setTag_Options] = useState([]);
	const [tag_Selected, setTag_Selected] = useState([]);
	const [custTags, setCustTags] = useState([]);
	const [loading, setLoading] = useState(false);

	const getCustTags = async () => {
		let data = null;
		try {
			const res = await api_customerManage_GetTagByCustId({ custId });
			const { errorCode, message } = res.data;
			data = res.data.data;

			if (errorCode === 0) {
				setCustTags(data);
				return data;
			}

			alert.error(`[${errorCode}] ${message || "error"}`);
		} catch (error) {}

		return data;
	};

	useEffect(() => {
		const getTags = async () => {
			try {
				const res = await api_BaseData_GetTagByStatus(1);
				const { errorCode, message, data } = res.data;

				const _custTags = await getCustTags();

				if (errorCode === 0) {
					setTag_Options(
						data?.map(tag => ({
							value: tag.id,
							displayText: tag.tagName,
							tagColour: tag.tagColour
						}))
					);

					if (_custTags?.length && data?.length) {
						setTag_Selected(
							data
								?.filter(tag => _custTags.includes(tag.id))
								.map(tag => ({
									value: tag.id,
									displayText: tag.tagName,
									tagColour: tag.tagColour
								}))
						);
					}
				} else {
					alert.error(`[${errorCode}] ${message || "error"}`);
				}
			} catch (error) {}
		};

		getTags();
	}, []);

	const handleSelectTags = item => {
		setTag_Selected(prev => {
			if (prev.find(tag => tag.value === item.value)) {
				return prev.filter(tag => tag.value !== item.value);
			}

			return [...prev, item];
		});
	};

	const showSubmitBtn = () => {
		if (tag_Selected.length !== custTags.length) return true;

		return (
			JSON.stringify(tag_Selected?.map(tag => tag.value).sort()) !==
			JSON.stringify(custTags.sort())
		);
	};

	const onSubmitTag = async () => {
		try {
			setLoading(true);
			const res = await api_customerManage_SetTag({
				custId,
				tags: tag_Selected.map(tag => tag.value)
			});

			const { errorCode, message } = res.data;
			if (errorCode === 0) {
				getCustTags();
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	return {
		tag_Options,
		tag_Selected,
		setTag_Selected,
		handleSelectTags,
		showSubmitBtn,
		onSubmitTag,
		loading
	};
};

export { useHandleTags };
