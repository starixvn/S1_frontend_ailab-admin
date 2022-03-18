import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Button, InputGroup, FormCheck } from "react-bootstrap";
import { useAlert } from "react-alert";
import { CaretRight, CaretDown } from "react-bootstrap-icons";
import styled from "styled-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { popBoxContext, allSiteListContext } from "../context";
import { useSelectEnumTypes } from "../../hook/index";
import Dropdown from "../dropdown";
import { api_getAllData_GetSlotTpList } from "../../service/api/getAllData";
import { api_BaseData_GetGameCasinoByTpId } from "../../service/api/baseData";
import {
	api_CSD_TpDisable_Set,
	api_CSD_TpDisable_GetByCustId
} from "../../service/api/memberGameExc";
import InputBox from "../inputBox";
import path from "../../path";

const errorFeedBacks = {
	userName: "User name does not allow null."
};

const AddMGE = () => {
	const { t } = useTranslation();
	const location = useLocation();
	// const { setPopBox } = useContext(popBoxContext);
	// const [payloads, setPayloads] = useState(initValue);
	// const [excelUpload, setExcelUpload] = useState("");
	// const [errors, setErrors] = useState(initErrValue);
	const { siteId } = useContext(allSiteListContext);
	const [checkBoxTree, setCheckBoxTree] = useState({
		parent: [],
		children: {},
		checked: {}
	});
	const [userName, setUserName] = useState("");
	const isMountedRef = useRef(null);
	const alert = useAlert();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onCollapse = tpId => {
		setCheckBoxTree(prev => {
			const newChildren = JSON.parse(JSON.stringify(prev.children));
			const newChecked = JSON.parse(JSON.stringify(prev.checked));
			delete newChildren[tpId];
			delete newChecked[tpId];
			return {
				...prev,
				children: newChildren,
				checked: newChecked
			};
		});
	};

	const checkChild = (e, tpId) => {
		setCheckBoxTree(prev => {
			const newChecked = JSON.parse(JSON.stringify(prev.checked));
			if (!e.target.checked) {
				newChecked[tpId] = newChecked[tpId].filter(
					s => s !== e.target.value
				);
			} else {
				if (!newChecked[tpId]) {
					newChecked[tpId] = [];
				}
				newChecked[tpId].push(e.target.value);
			}

			return {
				...prev,
				checked: newChecked
			};
		});
	};

	const onExpand = async e => {
		if (!e.target.checked) {
			onCollapse(e.target.value);
			return;
		}
		try {
			const res = await api_BaseData_GetGameCasinoByTpId({
				tpId: e.target.value
			});
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setCheckBoxTree(prev => {
					const newChildren = JSON.parse(
						JSON.stringify(prev.children)
					);
					const newChecked = JSON.parse(JSON.stringify(prev.checked));
					newChildren[e.target.value] = data;
					newChecked[e.target.value] = [];
					return {
						...prev,
						children: newChildren,
						checked: newChecked
					};
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onSubmit = async () => {
		if (userName === "") {
			alert.error(errorFeedBacks.userName);
			return;
		}
		try {
			const res = await api_CSD_TpDisable_Set({
				userName,
				siteId,
				disableTpGame: Object.entries(checkBoxTree.checked).map(el => ({
					tpId: el[0],
					gameList: el[1]
				}))
			});
			const { errorCode } = res.data;
			if (errorCode === 0) {
				alert.show(t("Alert.Success"));
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
			window.location.replace(`/${path.memberGameExclusion.root}`);
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
					parent: data
				}));
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(async () => {
		try {
			const res = await api_CSD_TpDisable_GetByCustId({
				custId: location.state.custId
			});
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setCheckBoxTree(prev => {
					const newChildren = {};
					const newChecked = {};
					data.disableGames.forEach(el => {
						if (el.checked) {
							newChecked[el.tpId] = el.gameList.reduce(
								(acc, cur) => {
									if (cur.checked) acc.push(cur.gameId);
									return acc;
								},
								[]
							);
						}
						if (el.gameList) {
							newChildren[el.tpId] = el.gameList;
						}
					});

					return {
						...prev,
						children: newChildren,
						checked: newChecked
					};
				});
				setUserName(location.state.userName);
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			console.error(error);
		}
	}, [checkBoxTree.parent]);

	return (
		<main className="col-md-9 col-lg-10">
			<h1 className="h2">{t("MemberGameExclusion.AddDisableGame")}</h1>
			<div className="bd-example">
				<div className="row">
					<InputBox
						className="btn-group col-md-3"
						title={t("DepositList.MemberCode")}
						value={userName}
						required={true}
						onChange={e => setUserName(e.target.value)}
					/>
				</div>
				<div className="row">
					<div className="col">
						<button
							onClick={onSubmit}
							type="button"
							className="btn btn-primary m-2 float-end">
							{t("PopBox.Submit")}
						</button>
						<Link
							to={`/${path.memberGameExclusion.root}`}
							className="btn btn-secondary m-2 float-end">
							{t("MemberGameExclusion.Back")}
						</Link>
					</div>
				</div>
			</div>
			<div className="bd-example">
				<Parent
					checkBoxTree={checkBoxTree}
					checkChild={checkChild}
					onExpand={onExpand}
				/>
			</div>
		</main>
	);
};

const Parent = ({ checkBoxTree, onExpand, checkChild }) =>
	checkBoxTree.parent.map(p => (
		<div key={p.tpId} className="bd-example">
			<Form.Check.Input
				value={p.tpId}
				type="checkbox"
				onChange={onExpand}
				checked={checkBoxTree.checked[p.tpId]}
			/>
			<Form.Check.Label>{p.tpName}</Form.Check.Label>

			<Children
				_children={checkBoxTree.children[p.tpId]}
				checkBoxTree={checkBoxTree}
				checkChild={checkChild}
				tpId={p.tpId}
			/>
		</div>
	));

// 4 items a row

const Children = ({ _children = [], checkBoxTree, tpId, checkChild }) =>
	_children.map((child, idx) => {
		if ((idx + 1) % 4 === 0) {
			return (
				<Row
					checkBoxTree={checkBoxTree}
					key={child.gameCasinoId}
					tpId={tpId}
					checkChild={checkChild}
					col={_children.slice(idx - 3, idx + 1)}
				/>
			);
		}
		return null;
	});

const Row = ({ col, checkBoxTree, tpId, checkChild }) => (
	<div className="row parentRow">
		{col.map(c => (
			<div key={c.gameId} className="col-6 col-md-3">
				<Form.Check.Input
					value={c.gameId}
					checked={checkBoxTree.checked[tpId]?.includes(c.gameId)}
					onChange={e => checkChild(e, tpId)}
					type="checkbox"
				/>
				<Form.Check.Label>{c.name}</Form.Check.Label>
			</div>
		))}
	</div>
);

export default AddMGE;
