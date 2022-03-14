/* eslint-disable react/forbid-prop-types */
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { any, arrayOf, bool, func, number } from "prop-types";
import { Pencil, Trash, FileEarmarkArrowDown } from "react-bootstrap-icons";
import { Table } from "react-bootstrap";
import { popBoxContext } from "../../../components/context";
import { ButtonWithLoading, Loading } from "../../../components";
import { datetime_format } from "../../../components/common";

const PersonalMessageTable = ({
	loading,
	batchMessageList,
	tableRowStartIndex,
	onUpdateBatchMessage,
	onDeleteBatchMessage,
	onExportReport
}) => {
	const { t } = useTranslation();
	const { confirm } = useContext(popBoxContext);

	const handleUpdateBatchMessage = batchId => () => {
		onUpdateBatchMessage(batchId);
	};

	const handleDeleteBatchMessage = batchId => () => {
		confirm({
			content: t("PopBox.AreYouSure"),
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
						<th>#</th>
						<th>{t("Common.Title")}</th>
						<th>{t("Common.Content")}</th>
						<th>{t("Common.UpdatedBy")}</th>
						<th className="text-center">{t("Common.Action")}</th>
						<th>{t("Common.UpdatedDate")}</th>
					</tr>
				</thead>
				<tbody>
					{batchMessageList.map((item, index) => (
						<tr key={`${item.createTime}-${item.updateTime}`}>
							<td>{tableRowStartIndex + index}</td>
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
							<td>{datetime_format(item.updateTime)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

PersonalMessageTable.propTypes = {
	loading: bool.isRequired,
	tableRowStartIndex: number.isRequired,
	batchMessageList: arrayOf(any).isRequired,
	onUpdateBatchMessage: func.isRequired,
	onDeleteBatchMessage: func.isRequired,
	onExportReport: func.isRequired
};
export { PersonalMessageTable };
