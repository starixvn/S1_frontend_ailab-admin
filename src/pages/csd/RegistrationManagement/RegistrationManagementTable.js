import React from "react";
import { Table } from "react-bootstrap";
import { Empty, Loading } from "../../../components";

const RegistrationManagementTable = ({ loading, list }) => (
	<div className="table-responsive">
		{loading && <Loading />}

		<Table striped bordered hover>
			<thead className="table-dark">
				<tr>
					<th>Currency</th>
					<th>Affiliates Code </th>
					<th>Agent</th>
					<th>UserName</th>
					<th>Full Name</th>
					<th>Phone No.</th>
					<th>Verify</th>
					<th>RegTime/Date GMT+8</th>
					<th>Deposit Staus</th>
					<th className="text-center">Action</th>
					<th>Status</th>
					<th>Note</th>
				</tr>
			</thead>

			<tbody>
				{list.map((item, index) => (
					<tr key={index}>
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
						<td />
					</tr>
				))}
			</tbody>
		</Table>

		{list.length === 0 && <Empty />}
	</div>
);

export { RegistrationManagementTable };
