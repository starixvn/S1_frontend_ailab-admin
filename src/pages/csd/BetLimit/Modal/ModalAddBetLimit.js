/* eslint-disable react/forbid-prop-types */
import React, { useContext, useEffect, useState } from "react";
import { objectOf, any } from "prop-types";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading, Empty, Loading } from "../../../../components";
import { multipleDropdownFilter } from "../../../../components/common";
import {
	allSiteListContext,
	popBoxContext
} from "../../../../components/context";
import DropdownWithSearch from "../../../../components/dropdownWithSearch";
import {
	useGetTpCategoryFetcher,
	useGetTpGameTypeListByCategoryFetcher
} from "../../../../hook";
import { MODAL_TYPE } from "../def";
import { useGetBetListByCustIdFetcher, useSetBetLimitFetcher } from "../hook";
import { ModalAddBetLimitTabs } from "./ModalAddBetLimitTabs";

const ModalAddBetLimit = ({ popBoxData }) => {
	const { t } = useTranslation();

	const { type, custId } = popBoxData;

	const { setPopBox } = useContext(popBoxContext);
	const { siteId } = useContext(allSiteListContext);

	const [userName, setUserName] = useState("");
	const [selectedTpCategoryOptions, setSelectedTpCategoryOptions] = useState(
		[]
	);
	const {
		loading: tpCategoryListLoading,
		tpCategoryList
	} = useGetTpCategoryFetcher();

	const tpCategoryListOptions = tpCategoryList.map(item => ({
		...item,
		tpCategory: item.categoryId,
		value: item.categoryId,
		displayText: item.categoryName
	}));

	const {
		loading: tpGameTypeListByCategoryLoading,
		getTpGameTypeListByCategory
	} = useGetTpGameTypeListByCategoryFetcher();

	const {
		loading: setBetLimitLoading,
		setBetLimit
	} = useSetBetLimitFetcher();

	const { getBetListByCustId } = useGetBetListByCustIdFetcher();

	const closePopBox = () => {
		setPopBox(false);
	};

	const handleTpCategorySelect = async option => {
		const newOptions =
			multipleDropdownFilter(selectedTpCategoryOptions, option) ?? [];

		const idx = newOptions.findIndex(({ value }) => value === option.value);

		if (idx !== -1) {
			let tpBetSetting = await getTpGameTypeListByCategory(
				option.categoryId
			);

			tpBetSetting = tpBetSetting.map(item => ({
				...item,
				gameTypeId: item.typeId
			}));

			newOptions[idx] = {
				...newOptions[idx],
				tpBetSetting
			};
		}

		setSelectedTpCategoryOptions(newOptions);
	};

	const handleSubmit = () => {
		setBetLimit({
			userName,
			siteId,
			betSetting: selectedTpCategoryOptions
		});
	};

	useEffect(() => {
		const asyncFetch = async () => {
			if (type === MODAL_TYPE.EDIT) {
				const _betLimit = await getBetListByCustId(custId);

				const tpBetSetting = _betLimit.betSetting.reduce((acc, cur) => {
					if (cur?.gameTypeBetLimit?.length > 0) {
						const mappingTpBetSetting = cur.gameTypeBetLimit.map(
							item => ({
								...item,
								gameTypeId: item.typeId
							})
						);

						return [
							...acc,
							{
								...cur,
								tpCategory: cur.categoryId,
								displayText: cur.categoryName,
								value: cur.categoryId,
								tpBetSetting: mappingTpBetSetting
							}
						];
					}

					return acc;
				}, []);

				setUserName(_betLimit.userName);
				setSelectedTpCategoryOptions(tpBetSetting);
			}
		};

		asyncFetch();
	}, [type, custId]);

	const loading =
		tpCategoryListLoading ||
		tpGameTypeListByCategoryLoading ||
		setBetLimitLoading;

	return (
		<>
			{loading && <Loading />}

			<Modal.Body>
				<Row>
					<Form.Group as={Col} lg={4}>
						<Form.Label>User Name</Form.Label>

						<Form.Control
							onChange={event => setUserName(event.target.value)}
							value={userName}
							placeholder="User Name"
						/>
					</Form.Group>

					<Form.Group as={Col} lg={5}>
						<Form.Label>Game Category</Form.Label>

						<div>
							<DropdownWithSearch
								options={tpCategoryListOptions}
								selected={selectedTpCategoryOptions}
								onSelect={handleTpCategorySelect}
							/>
						</div>
					</Form.Group>
				</Row>

				{selectedTpCategoryOptions.length === 0 ? (
					<Empty />
				) : (
					<ModalAddBetLimitTabs
						selectedTpCategoryOptions={selectedTpCategoryOptions}
						setSelectedTpCategoryOptions={
							setSelectedTpCategoryOptions
						}
					/>
				)}
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={closePopBox}>
					{t("PopBox.lbl_Cancel")}
				</Button>

				<ButtonWithLoading
					disabled={selectedTpCategoryOptions.length === 0}
					type="button"
					onClick={handleSubmit}>
					{t("PopBox.lbl_Submit")}
				</ButtonWithLoading>
			</Modal.Footer>
		</>
	);
};

ModalAddBetLimit.propTypes = {
	popBoxData: objectOf(any).isRequired
};
export default ModalAddBetLimit;
