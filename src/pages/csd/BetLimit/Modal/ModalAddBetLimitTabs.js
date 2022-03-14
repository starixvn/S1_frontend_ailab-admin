/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, func, objectOf } from "prop-types";
import { Card, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { numericRegex } from "../../../../components/common";

const ModalAddBetLimitTabs = ({
	selectedTpCategoryOptions,
	setSelectedTpCategoryOptions
}) => {
	const handleItemChange = (key, index, value) => {
		const result = [...selectedTpCategoryOptions];

		if (result[index][key] !== value) {
			result[index][key] = value;

			setSelectedTpCategoryOptions(result);
		}
	};

	const handleSubItemChange = (key, index, subIndex, value) => {
		const result = [...selectedTpCategoryOptions];

		result[index].tpBetSetting[subIndex][key] = value;

		setSelectedTpCategoryOptions(result);
	};

	return (
		<Tabs className="mb-3">
			{selectedTpCategoryOptions.map((item, index) => (
				<Tab
					key={item.value}
					eventKey={item.value}
					title={item.displayText}>
					<Row className="mb-3">
						<Form.Group as={Col} lg={6}>
							<Form.Label>Min Bet</Form.Label>

							<Form.Control
								value={item.minBet}
								onChange={event => {
									const minBet = numericRegex(
										event.target.value
									);
									handleItemChange("minBet", index, minBet);
								}}
								placeholder="0"
							/>
						</Form.Group>
						<Form.Group as={Col} lg={6}>
							<Form.Label>Max Bet</Form.Label>

							<Form.Control
								value={item.maxBet}
								onChange={event => {
									const maxBet = numericRegex(
										event.target.value
									);
									handleItemChange("maxBet", index, maxBet);
								}}
								placeholder="0"
							/>
						</Form.Group>

						{item.tpBetSetting.map((subItem, subIndex) => (
							<Col key={subItem.typeId} lg={6}>
								<Card>
									<Card.Body>
										<Row>
											<Col lg={6}>{subItem.typeName}</Col>
											<Col
												lg={6}
												className="d-flex justify-content-end">
												<Form.Switch
													checked={subItem.checked}
													onChange={() =>
														handleSubItemChange(
															"checked",
															index,
															subIndex,
															!subItem.checked
														)
													}
												/>
											</Col>
										</Row>

										<Row>
											<Form.Group as={Col} lg={6}>
												<Form.Label>Min Bet</Form.Label>

												<Form.Control
													value={subItem.minBet}
													onChange={event => {
														const minBet = numericRegex(
															event.target.value
														);

														handleSubItemChange(
															"minBet",
															index,
															subIndex,
															minBet
														);
													}}
													placeholder="0"
												/>
											</Form.Group>

											<Form.Group as={Col} lg={6}>
												<Form.Label>Max Bet</Form.Label>

												<Form.Control
													value={subItem.maxBet}
													onChange={event => {
														const maxBet = numericRegex(
															event.target.value
														);

														handleSubItemChange(
															"maxBet",
															index,
															subIndex,
															maxBet
														);
													}}
													placeholder="0"
												/>
											</Form.Group>
										</Row>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Tab>
			))}
		</Tabs>
	);
};

ModalAddBetLimitTabs.propTypes = {
	selectedTpCategoryOptions: objectOf(any).isRequired,
	setSelectedTpCategoryOptions: func.isRequired
};
export { ModalAddBetLimitTabs };
