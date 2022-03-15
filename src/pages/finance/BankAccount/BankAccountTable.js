import React from "react";
import { Table } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Badge, ButtonWithLoading, Loading } from "../../../components";

// * remove later
const data = [
	{
		bankId: 0,
		accountName: "string",
		accountNo: "string",
		ifscCode: "string",
		minAmount: 0,
		maxAmount: 0,
		dailyLimitAmount: 0,
		purpose: 0,
		dummy: 0,
		memo: "string",
		bSort: 0,
		currencyId: 0,
		bankCode: "string",
		bankName: "string",
		bankLogo: "string",
		bankSite: "string",
		sort: 0,
		status: 0,
		pointLevel: 0,
		sysId: 0
	}
];

const BankAccountTable = () => {
	const { t } = useTranslation();

	const loading = false;
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
						<th>purpose</th>
						<th className="text-center">Status</th>
						<th>Dummy</th>
						<th>Sort</th>

						<th className="text-center">{t("Common.Action")}</th>
					</tr>
				</thead>

				<tbody>
					{data.map((item, index) => (
						<tr key={item.sysId}>
							<td>{index}</td>
							<td>{item.bankCode}</td>
							<td>{item.bankName}</td>
							<td>{item.accountNo}</td>
							<td>{item.accountName}</td>
							<td>{item.pointLevel}</td>
							<td>{item.minAmount}</td>
							<td>{item.maxAmount}</td>
							<td>{item.dailyLimitAmount}</td>
							<td>{item.purpose}</td>
							<td className="text-center">
								<Badge bg="success">{item.status}</Badge>
							</td>
							<td>{item.dummy}</td>
							<td>{item.sort}</td>

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
										tooltip="Delete"
										variant="danger">
										<Trash />
									</ButtonWithLoading>
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export { BankAccountTable };
