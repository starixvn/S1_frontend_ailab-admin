import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Button, InputGroup } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { popBoxContext, allSiteListContext } from "../context";
import { useSelectEnumTypes } from "../../hook/index";
import Dropdown from "../dropdown";
import { api_getAllData_GetSlotTpList } from "../../service/api/getAllData";
import { api_BaseData_GetGameCasinoByTpId } from "../../service/api/baseData";

const defColNames = {
	option: "option",
	withdrawal: "withdrawal",
	withdrawalLimitOption: "withdrawalLimitOption",
	SiteId: "SiteId"
};

const initValue = {
	[defColNames.option]: "",
	[defColNames.withdrawalLimitOption]: "",
	[defColNames.withdrawal]: "",
	[defColNames.SiteId]: ""
};

const errorFeedBacks = {
	excelUpload: "Batch excel file does not allow null."
};

const initErrValue = {
	excelUpload: ""
};

const Requried = styled.label`
	color: #a94442;
`;

const Title = ({ displayText, required }) => (
	<h6>
		{required && <Requried>*</Requried>}
		{displayText}
	</h6>
);

const AddMGE = ({ refresh }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [payloads, setPayloads] = useState(initValue);
	const { siteId } = useContext(allSiteListContext);
	const [excelUpload, setExcelUpload] = useState("");
	const [errors, setErrors] = useState(initErrValue);
	const [checkBoxTree, setCheckBoxTree] = useState({
		nodes: [],
		checked: [],
		expanded: []
	});
	const isMountedRef = useRef(null);
	const alert = useAlert();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onExpand = async targetNode => {
		try {
			const res = await api_BaseData_GetGameCasinoByTpId({
				tpId: targetNode.value
			});
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				let toExpand = null;
				setCheckBoxTree(prev => {
					// const parent = prev.nodes.find(
					// 	el => el.value === targetNode.value
					// );
					const newNodes = JSON.parse(JSON.stringify(prev.nodes));
					newNodes.forEach(parent => {
						if (parent.value === targetNode.value) {
							const c = data.map(child => ({
								...child,
								value: child.gameId,
								label: child.cName,
								className: "test123"
							}));
							toExpand = targetNode;
							toExpand.children = c;
							parent.children = c;
						}
					});
					return {
						...prev,
						nodes: newNodes
					};
				});
				setCheckBoxTree(prev => ({
					...prev,
					expanded: [...prev.expanded, targetNode.value]
				}));
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(async () => {
		try {
			const res = await api_getAllData_GetSlotTpList();
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setCheckBoxTree(prev => ({
					...prev,
					nodes: data.map(el => ({
						...el,
						value: el.tpId,
						label: el.tpName
					}))
				}));
			}
		} catch (error) {
			console.error(error);
		}
	}, []);
	console.log(checkBoxTree);
	return (
		<main className="col-md-9 col-lg-10">
			<h1 className="h2">{t("Menu.CSD.MemberGameExclusion")}</h1>
			<CheckboxTree
				nodes={checkBoxTree.nodes}
				checked={checkBoxTree.checked}
				expanded={checkBoxTree.expanded}
				expandOnClick={true}
				// onExpand={expanded =>
				// 	setCheckBoxTree(prev => ({ ...prev, expanded }))
				// }
				onClick={onExpand}
			/>
		</main>
	);
};

export default AddMGE;
