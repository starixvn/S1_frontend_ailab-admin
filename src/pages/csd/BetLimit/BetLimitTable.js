/* eslint-disable react/forbid-prop-types */
import React, { useContext } from "react";
import { any, arrayOf, bool, func } from "prop-types";
import { Table } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { ButtonWithLoading, Empty, Loading } from "../../../components";
import { popBoxContext } from "../../../components/context";

const BetLimitTable = ({
	loading,
	betLimitList,
	onUpdateBetLimit,
	onDeleteBetLimit
}) => {
	const { confirm } = useContext(popBoxContext);

	const handleUpdateBetlimit = custId => () => {
		onUpdateBetLimit(custId);
	};

	const handleDeleteBetLimit = custId => () => {
		confirm({
			title: "Are you sure ?",

			onOk() {
				onDeleteBetLimit(custId);
			}
		});
	};

	return (
		<div className="table-responsive">
			{loading && <Loading />}

			<Table striped bordered hover>
				<thead className="table-dark">
					<tr>
						<th>User Name</th>
						<th>Created By</th>
						<th>Created Date</th>
						<th>Updated By</th>
						<th>Updated Date</th>
						<th className="text-center w-25">Action</th>
					</tr>
				</thead>

				<tbody>
					{betLimitList.map(item => (
						<tr key={`${item.createTime}-${item.updateTime}`}>
							<td>{item.userName}</td>

							<td>{item.creator}</td>

							<td>{item.createTime}</td>

							<td>{item.updateOperator}</td>

							<td>{item.updateTime}</td>

							<td className="d-flex justify-content-center">
								<span role="button" className="m-2">
									<ButtonWithLoading
										onClick={handleUpdateBetlimit(
											item.custId
										)}
										tooltip="Edit"
										variant="primary">
										<Pencil />
									</ButtonWithLoading>
								</span>
								<span role="button" className="m-2">
									<ButtonWithLoading
										onClick={handleDeleteBetLimit(
											item.custId
										)}
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

			{betLimitList.length === 0 && <Empty />}
		</div>
	);
};

BetLimitTable.propTypes = {
	loading: bool.isRequired,
	betLimitList: arrayOf(any).isRequired,
	onUpdateBetLimit: func.isRequired,
	onDeleteBetLimit: func.isRequired
};
export { BetLimitTable };
