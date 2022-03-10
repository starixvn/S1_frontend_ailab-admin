import React, { useContext } from "react";
import { Modal, Row, Col, Button, Table } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { ButtonWithLoading, Loading } from "../../../../components";
import { popBoxContext } from "../../../../components/context";
import {
	useDeleteRegLiveStatusNoteFetcher,
	useGetRegLiveStatusNotesFetcher
} from "../hook";

const ModalNotesTable = ({ popBoxData }) => {
	const { t } = useTranslation();
	const { confirm } = useContext(popBoxContext);

	const { custId } = popBoxData;

	const {
		loading: getLoading,
		regLiveStatusNotes,
		getRegLiveStatusNotes
	} = useGetRegLiveStatusNotesFetcher(custId);

	const {
		loading: deleteLoading,
		deleteRegLiveStatusNote
	} = useDeleteRegLiveStatusNoteFetcher();

	const handleDeleteClick = id => () => {
		confirm({
			title: "Are you sure ?",
			onOk: async () => {
				await deleteRegLiveStatusNote({ id, custId });

				getRegLiveStatusNotes(custId);
			}
		});
	};

	return (
		<Modal.Body>
			<div className="table-responsive">
				{(getLoading || deleteLoading) && <Loading />}

				<Table striped bordered hover>
					<thead className="table-dark">
						<tr>
							<th>Note</th>
							<th>Updated By</th>
							<th>Updated Date</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>

					<tbody>
						{regLiveStatusNotes.map(item => (
							<tr key={`${item.updateTime}-${item.createTime}`}>
								<td>{item.note}</td>
								<td>{item.operator}</td>
								<td>{item.updateTime}</td>
								<td className="d-flex justify-content-center">
									<span role="button" className="m-2">
										<ButtonWithLoading
											onClick={handleDeleteClick(item.id)}
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
		</Modal.Body>
	);
};

export default ModalNotesTable;
