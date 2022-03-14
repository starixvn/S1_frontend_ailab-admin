import React, { useContext } from "react";
import { bool, func } from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Plus, Search } from "react-bootstrap-icons";
import { ButtonWithLoading } from "../../../components";
import { popBoxContext } from "../../../components/context";
import { defPopBoxType } from "../../../components/popBox";

const WithdrawableAdjustmentFilter = ({ loading, setField, onSubmit }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	const openAddModal = () => {
		setPopBox({
			isOpen: true,
			title: t("AddWithdrawalLimit"),
			data: {},
			popBoxType: defPopBoxType.financeWithdrawalLimitAdjustAddModal
		});
	};

	return (
		<>
			<Row>
				<Form.Group as={Col} lg={4}>
					<Form.Label>
						{t("Finance.WithdrawableAdjustment.MemberCode")}
					</Form.Label>

					<Form.Control
						onChange={event =>
							setField("userName", event.target.value)
						}
					/>
				</Form.Group>
			</Row>
			<Row>
				<Col lg={9} />

				<Col lg={3} className="d-flex justify-content-end">
					<Button
						onClick={openAddModal}
						type="button"
						className="me-2"
						style={{ width: "120px" }}
						variant="success">
						<Plus className="fs-5" />

						{t("Common.AddNew")}
					</Button>

					<ButtonWithLoading
						loading={loading}
						onClick={onSubmit}
						style={{ width: "120px" }}>
						<Search className="me-2" />

						{t("Common.Search")}
					</ButtonWithLoading>
				</Col>
			</Row>
		</>
	);
};

WithdrawableAdjustmentFilter.propTypes = {
	loading: bool.isRequired,
	setField: func.isRequired,
	onSubmit: func.isRequired
};
export { WithdrawableAdjustmentFilter };
