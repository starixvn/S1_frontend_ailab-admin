/* eslint-disable react/forbid-prop-types */
import { useContext } from "react";
import { any, arrayOf, bool, func } from "prop-types";
import { Pencil, Trash, FileEarmarkArrowDown } from "react-bootstrap-icons";
import { Table } from "react-bootstrap";
import { popBoxContext } from "../../../components/context";
import { ButtonWithLoading, Empty, Loading } from "../../../components";

const PersonalMessageTable = ({
	loading,
	batchMessageList,
	onUpdateBatchMessage,
	onDeleteBatchMessage,
	onExportReport
}) => {
	const { confirm } = useContext(popBoxContext);

	const handleUpdateBatchMessage = batchId => () => {
		onUpdateBatchMessage(batchId);
	};

	const handleDeleteBatchMessage = batchId => () => {
		confirm({
			title: "Are you sure ?",

			onOk() {
				onDeleteBatchMessage(batchId);
			}
		});
	};

	return (
		<div className="table-responsive">
			{loading && <Loading />}

			<Table striped bordered hover>
				<thead className="table-dark">
					<tr>
						<th>Title</th>
						<th>Content</th>
						<th>Updated By</th>
						<th className="text-center">Action</th>
						<th>Updated Date</th>
					</tr>
				</thead>
				<tbody>
					{batchMessageList.map(item => (
						<tr key={`${item.createTime}-${item.updateTime}`}>
							<td>{item.title}</td>
							<td>{item.content}</td>
							<td>{item.author}</td>
							<td className="d-flex justify-content-center">
								<span role="button" className="m-2">
									<ButtonWithLoading
										tooltip="Edit"
										onClick={handleUpdateBatchMessage(
											item.batchId
										)}
										variant="primary">
										<Pencil />
									</ButtonWithLoading>
								</span>

								<span role="button" className="m-2">
									<ButtonWithLoading
										tooltip="Delete"
										onClick={handleDeleteBatchMessage(
											item.batchId
										)}
										variant="danger">
										<Trash />
									</ButtonWithLoading>
								</span>

								<span role="button" className="m-2">
									<ButtonWithLoading
										tooltip="Export"
										onClick={() =>
											onExportReport(item.batchId)
										}
										variant="secondary">
										<FileEarmarkArrowDown />
									</ButtonWithLoading>
								</span>
							</td>
							<td>{item.updateTime}</td>
						</tr>
					))}
				</tbody>
			</Table>

			{batchMessageList.length === 0 && <Empty />}
		</div>
	);
};

PersonalMessageTable.propTypes = {
	loading: bool.isRequired,
	batchMessageList: arrayOf(any).isRequired,
	onUpdateBatchMessage: func.isRequired,
	onDeleteBatchMessage: func.isRequired,
	onExportReport: func.isRequired
};
export { PersonalMessageTable };
