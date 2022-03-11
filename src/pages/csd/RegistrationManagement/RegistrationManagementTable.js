/* eslint-disable react/forbid-prop-types */
import React, { memo } from "react";
import { any, arrayOf, bool, func } from "prop-types";
import { Table } from "react-bootstrap";
import {
	CheckCircle,
	Pencil,
	Plus,
	XCircle,
	CardList
} from "react-bootstrap-icons";
import { ButtonWithLoading, Empty, Loading } from "../../../components";

import { DEPOSIT_STATUS, STATUS_TYPE } from "./def";

const RegistrationManagementTable = ({
	loading,
	regLiveStatusList,
	onEditStatueModal,
	onAddNotesModal,
	onNotesTableModal
}) => (
	<div className="table-responsive">
		{loading && <Loading />}

		<Table striped bordered hover>
			<thead className="table-dark">
				<tr>
					<th>Currency</th>
					<th>Affiliates Code </th>
					<th>Agent</th>
					<th className="text-center">Action</th>
					<th>UserName</th>
					<th>Full Name</th>
					<th>Phone No.</th>
					<th>Verify</th>
					<th>RegTime/Date GMT+8</th>
					<th>Deposit Status</th>
					<th>Status</th>
				</tr>
			</thead>

			<tbody>
				{regLiveStatusList.map(item => {
					const depositStatus =
						DEPOSIT_STATUS.find(
							({ value }) => value === item.actStatus
						)?.displayText ?? "";

					const status =
						STATUS_TYPE.find(({ value }) => value === item.status)
							?.displayText ?? "";

					return (
						<tr key={`${item.regTime}-${item.custId}`}>
							<td>{item.currency}</td>
							<td>{item.affCode}</td>
							<td>{item.agent}</td>

							<td className="d-flex justify-content-center">
								<span role="button" className="m-2">
									<ButtonWithLoading
										onClick={onEditStatueModal(item.custId)}
										tooltip="Edit"
										variant="primary">
										<Pencil />
									</ButtonWithLoading>
								</span>

								<span role="button" className="m-2">
									<ButtonWithLoading
										onClick={onAddNotesModal(item.custId)}
										tooltip="Add Notes"
										variant="success">
										<Plus className="fs-5" />
									</ButtonWithLoading>
								</span>

								<span role="button" className="m-2">
									<ButtonWithLoading
										onClick={onNotesTableModal(item.custId)}
										tooltip="Log Note"
										variant="secondary">
										<CardList />
									</ButtonWithLoading>
								</span>
							</td>

							<td>{item.userName}</td>
							<td>{item.accountName}</td>
							<td>{item.phoneNo}</td>
							<td className="text-center">
								{item.phoneVerified ? (
									<CheckCircle className="text-success" />
								) : (
									<XCircle className="text-danger" />
								)}
							</td>
							<td>{item.regTime}</td>
							<td>{depositStatus}</td>
							<td>{status}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>

		{regLiveStatusList.length === 0 && <Empty />}
	</div>
);

RegistrationManagementTable.propTypes = {
	loading: bool.isRequired,
	regLiveStatusList: arrayOf(any).isRequired,
	onEditStatueModal: func.isRequired,
	onAddNotesModal: func.isRequired,
	onNotesTableModal: func.isRequired
};

const MemoRegistrationManagementTable = memo(RegistrationManagementTable);

export { MemoRegistrationManagementTable };
