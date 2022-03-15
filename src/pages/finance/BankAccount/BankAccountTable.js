/* eslint-disable react/forbid-prop-types */
import React, { useContext } from "react";
import { any, arrayOf, bool, number } from "prop-types";
import { Table } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Badge, ButtonWithLoading, Loading } from "../../../components";
import { number_format } from "../../../components/common";
import { PURPOSE_TYPE, Badge_BG_Type } from "./def";
import { popBoxContext } from "../../../components/context";

const BankAccountTable = ({
	loading,
	tableRowStartIndex,
	bankInfoList,
	bankDetailOptions,
	onDeleteBankCard
}) => {
	const { t } = useTranslation();
	const { confirm } = useContext(popBoxContext);

	const statusType = bankDetailOptions.reduce(
		(arr, cur) => ({ ...arr, ...{ [cur.value]: cur.displayText } }),
		{}
	);

	const handleDelete = bankId => () => {
		confirm({
			content: t("PopBox.AreYouSure"),
			onOk() {
				onDeleteBankCard(bankId);
			}
		});
	};

	return (
		<div className="table-responsive">
			{loading && <Loading />}

			<Table striped bordered hover>
				<thead className="table-dark">
					<tr>
						<th>#</th>

						<th>Bank Code</th>
						<th>Bank Name</th>
						<th>Account No</th>
						<th>Account Name</th>
						<th>Vip Level</th>

						<th>Min Amount</th>
						<th>Max Amount</th>
						<th>Daily Limit Amount</th>
						<th className="text-center">{t("Common.Action")}</th>
						<th className="text-center">Status</th>

						<th>purpose</th>
						<th>Dummy</th>
					</tr>
				</thead>

				<tbody>
					{bankInfoList.map((item, index) => (
						<tr key={`${item.index}-${item.bankId}`}>
							<td>{tableRowStartIndex + index}</td>

							<td>{item.bankCode}</td>
							<td>{item.bankName}</td>
							<td>{item.accountNo}</td>

							<td>{number_format(item.minAmount)}</td>
							<td>{number_format(item.maxAmount)}</td>
							<td>{number_format(item.dailyLimitAmount)}</td>

							<td>{item.accountName}</td>
							<td>{item.pointLevel}</td>

							<td className="d-flex justify-content-center">
								<span role="button" className="m-2">
									<ButtonWithLoading
										tooltip="Edit"
										variant="primary">
										<Pencil />
									</ButtonWithLoading>
								</span>

								<span role="button" className="m-2">
									<ButtonWithLoading
										onClick={handleDelete(item.bankId)}
										tooltip="Delete"
										variant="danger">
										<Trash />
									</ButtonWithLoading>
								</span>
							</td>
							<td className="text-center">
								<Badge
									bg={Badge_BG_Type[item.status] ?? "dark"}>
									{statusType[item.status]}
								</Badge>
							</td>

							<td>{PURPOSE_TYPE[item.purpose] ?? ""}</td>
							<td>{item.dummy}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

BankAccountTable.propTypes = {
	loading: bool.isRequired,
	tableRowStartIndex: number.isRequired,
	bankInfoList: arrayOf(any).isRequired,
	bankDetailOptions: arrayOf(any).isRequired,
	onDeleteBankCard: func.isRequired
};
export { BankAccountTable };
