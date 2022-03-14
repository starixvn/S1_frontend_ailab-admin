/* eslint-disable react/forbid-prop-types */
import React from "react";
import { any, arrayOf, bool, number } from "prop-types";
import { Badge, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Loading } from "../../../components";
import { datetime_format, number_format } from "../../../components/common";
import { ADJUST_TYPE, STATUS_TYPE } from "./def";

const WithdrawableAdjustmentTable = ({
	loading,
	logList,
	tableRowStartIndex
}) => {
	const { t } = useTranslation();

	return (
		<div className="table-responsive">
			{loading && <Loading />}

			<Table striped bordered hover>
				<thead className="table-dark">
					<tr>
						<th>#</th>

						<th>
							{t("Finance.WithdrawableAdjustment.ReferenceId")}
						</th>
						<th>
							{t("Finance.WithdrawableAdjustment.AdjustType")}
						</th>
						<th>
							{t("Finance.WithdrawableAdjustment.AdjustAmount")}
						</th>
						<th className="text-center">
							{t("Finance.WithdrawableAdjustment.Status")}
						</th>

						<th>{t("Finance.WithdrawableAdjustment.Remark")}</th>

						<th>{t("Finance.WithdrawableAdjustment.CreatedBy")}</th>

						<th>
							{t("Finance.WithdrawableAdjustment.CreateDate")}
						</th>
					</tr>
				</thead>

				<tbody>
					{logList.map((item, index) => {
						const badgeBgType = {
							1: "secondary",
							2: "success",
							3: "danger"
						};

						return (
							<tr key={item.createTime}>
								<td>{tableRowStartIndex + index}</td>
								<td>{item.transId}</td>
								<td>{ADJUST_TYPE[item.adjustType]}</td>
								<td>{number_format(item.amount)}</td>
								<td className="text-center">
									<Badge bg={badgeBgType[item.status]}>
										{STATUS_TYPE[item.status]}
									</Badge>
								</td>
								<td>{item.memo}</td>
								<td>{item.operator}</td>
								<td>{datetime_format(item.createTime)}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

WithdrawableAdjustmentTable.propTypes = {
	loading: bool.isRequired,
	logList: arrayOf(any).isRequired,
	tableRowStartIndex: number.isRequired
};
export { WithdrawableAdjustmentTable };
