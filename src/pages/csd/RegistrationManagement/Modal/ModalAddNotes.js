/* eslint-disable react/forbid-prop-types */
import React, { useContext, useState } from "react";
import { any, objectOf } from "prop-types";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading } from "../../../../components";
import { popBoxContext } from "../../../../components/context";
import { useAddRegLiveStatusNoteFetcher } from "../hook";

const ModalAddNotes = ({ popBoxData }) => {
	const { t } = useTranslation();

	const { setPopBox, confirm } = useContext(popBoxContext);

	const { custId } = popBoxData;

	const [note, setNote] = useState("");

	const { loading, addRegLiveStatusNote } = useAddRegLiveStatusNoteFetcher();

	const handleInputChange = event => {
		setNote(event.target.value);
	};

	const closePopBox = () => {
		setPopBox(false);
	};

	const handleSubmit = () => {
		confirm({
			title: "Are you sure ?",

			onOk: () => {
				addRegLiveStatusNote({
					custId,
					note
				});
			}
		});
	};

	return (
		<>
			<Modal.Body>
				<Row>
					<Form.Group as={Col}>
						<Form.Label>Note</Form.Label>

						<Form.Control
							value={note}
							onChange={handleInputChange}
							as="textarea"
							rows={3}
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
					type="submit"
					loading={loading}
					onClick={handleSubmit}>
					{t("PopBox.lbl_Submit")}
				</ButtonWithLoading>
			</Modal.Footer>
		</>
	);
};

ModalAddNotes.propTypes = {
	popBoxData: objectOf(any).isRequired
};
export default ModalAddNotes;
