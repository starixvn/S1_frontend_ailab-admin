import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Button,
	Form,
	Modal,
	Row,
	Col,
	InputGroup,
	DropdownButton,
	Dropdown,
	FormControl
} from "react-bootstrap";
import { ButtonWithLoading, Loading } from "../../../../components";
import { useSendWithdrawalLimitAdjustmentFetcher } from "../hook/useSendWithdrawalLimitAdjustmentFetcher";
import { ADJUST_TYPE, ADJUST_TYPE_LIST } from "../def";
import { numericRegex } from "../../../../components/common";
import { popBoxContext } from "../../../../components/context";

const ModalAddWithdrawalAdjust = () => {
	const { t } = useTranslation();
	const { setPopBox, confirm } = useContext(popBoxContext);

	const [form, setForm] = useState({
		userName: "",
		adjustType: ADJUST_TYPE_LIST[0].value,
		amount: "",
		memo: ""
	});

	const {
		loading,
		sendWithdrawalLimitAdjustment
	} = useSendWithdrawalLimitAdjustmentFetcher();

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value
		});
	};

	const handleDropdownClick = option => () => {
		if (form.adjustType !== option.value) {
			setField("adjustType", option.value);
		}
	};

	const closePopBox = () => {
		setPopBox({
			isOpen: false
		});
	};

	const handleSubmit = () => {
		confirm({
			content: t("PopBox.AreYouSure"),
			onOk() {
				sendWithdrawalLimitAdjustment({
					...form
				});
			}
		});
	};

	return (
		<>
			{loading && <Loading />}

			<Modal.Body>
				<Row>
					<Form.Group as={Col} lg={12}>
						<Form.Label>
							{t("Finance.WithdrawableAdjustment.MemberCode")}
						</Form.Label>

						<Form.Control
							value={form.userName}
							onChange={event =>
								setField("userName", event.target.value)
							}
						/>
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>
							{t("Finance.WithdrawableAdjustment.Balance")}
						</Form.Label>

						<Form.Control disabled={true} />
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>
							{t(
								"Finance.WithdrawableAdjustment.DifferenceAmount"
							)}
						</Form.Label>

						<Form.Control disabled={true} />
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>
							{t(
								"Finance.WithdrawableAdjustment.EligibleWithdrawalAmount"
							)}
						</Form.Label>

						<Form.Control disabled={true} />
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label>
							{t("Finance.WithdrawableAdjustment.AdjustAmount")}
						</Form.Label>

						<InputGroup className="mb-3">
							<DropdownButton
								variant="outline-secondary"
								title={ADJUST_TYPE[form.adjustType]}>
								{ADJUST_TYPE_LIST.map(option => (
									<Dropdown.Item
										onClick={handleDropdownClick(option)}
										key={option.value}
										value={option.value}>
										{option.displayText}
									</Dropdown.Item>
								))}
							</DropdownButton>
							<FormControl
								value={form.amount}
								onChange={event => {
									const _amount = numericRegex(
										event.target.value
									);

									setField("amount", _amount || "");
								}}
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group as={Col} lg={12}>
						<Form.Label> {t("Common.Remark")}</Form.Label>

						<Form.Control
							onChange={event =>
								setField("memo", event.target.value)
							}
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
					loading={loading}
					onClick={handleSubmit}>
					{t("PopBox.lbl_Submit")}
				</ButtonWithLoading>
			</Modal.Footer>
		</>
	);
};

export default ModalAddWithdrawalAdjust;
