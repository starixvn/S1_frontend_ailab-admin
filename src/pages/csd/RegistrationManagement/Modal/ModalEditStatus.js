/* eslint-disable react/forbid-prop-types */
import React, { useContext, useState } from "react";
import { any, objectOf } from "prop-types";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading } from "../../../../components";
import { popBoxContext } from "../../../../components/context";
import { STATUS_TYPE } from "../def";
import Dropdown from "../../../../components/dropdown";
import { useSetRegLiveStatusFetcher } from "../hook";

const ModalEditStatus = ({ popBoxData }) => {
	const { t } = useTranslation();
	const { setPopBox, confirm } = useContext(popBoxContext);

	const { custId, siteId, callBack } = popBoxData;

	const [status, setStatus] = useState(STATUS_TYPE[0].value);

	const { loading, setRegLiveStatus } = useSetRegLiveStatusFetcher();

	const closePopBox = () => {
		setPopBox(false);
	};

	const handleSelect = data => {
		setStatus(data.value);
	};

	const handleSubmit = () => {
		confirm({
			title: "Are you sure ?",

			onOk: async () => {
				await setRegLiveStatus({
					siteId,
					custId,
					status
				});

				callBack();
			}
		});
	};

	return (
		<>
			<Modal.Body>
				<Row>
					<Form.Group as={Col}>
						<Form.Label>Status</Form.Label>
						<Dropdown
							value={{ value: status }}
							options={STATUS_TYPE}
							onSelect={handleSelect}
							placeholder="-"
						/>
					</Form.Group>
				</Row>
			</Modal.Body>

			<Modal.Footer>
				<Button
					className="w-25"
					variant="secondary"
					onClick={closePopBox}>
					{t("PopBox.lbl_Cancel")}
				</Button>
				<ButtonWithLoading
					className="w-25"
					loading={loading}
					type="submit"
					onClick={handleSubmit}>
					{t("PopBox.lbl_Submit")}
				</ButtonWithLoading>
			</Modal.Footer>
		</>
	);
};

ModalEditStatus.propTypes = {
	popBoxData: objectOf(any).isRequired
};

export default ModalEditStatus;
