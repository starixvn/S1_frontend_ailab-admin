import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Search, Plus } from "react-bootstrap-icons";
import Layout from "../../../components/layout";
import DatetimePicker from "../../../components/datetimePicker";
import { allSiteListContext, popBoxContext } from "../../../components/context";
import { defPopBoxType } from "../../../components/popBox";
import { ButtonWithLoading, Pagination } from "../../../components";
import { MODAL_TYPE } from "./def";
import { useGetDateRange, useHandlePage } from "../../../hook";
import { PersonalMessageTable } from "./PersonalMessageTable";
import {
	useDeleteBatchMessageFetcher,
	useExportMessageReportFetcher,
	useGetBatchMessageListFetcher
} from "./hook";

const PersonalMessage = () => {
	const { t } = useTranslation();

	const { setPopBox } = useContext(popBoxContext);
	const { siteId } = useContext(allSiteListContext);

	const {
		dateRange: { startDate, endDate },
		setDateRange
	} = useGetDateRange();

	const {
		loading,
		rowCount,
		totalPages,
		batchMessageList,
		getBatchMessageList
	} = useGetBatchMessageListFetcher();

	const { deleteBatchMessage } = useDeleteBatchMessageFetcher();

	const { exportMessageReport } = useExportMessageReportFetcher();

	const handleSearchSubmit = async pageData => {
		const { currentPage, pageSize } = pageData ?? {};

		getBatchMessageList({
			currentPage,
			pageSize,
			siteId,
			startDate,
			endDate
		});
	};

	const {
		currentPage,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({
		callback: handleSearchSubmit
	});

	const openAddMessageModal = (type = MODAL_TYPE.NEW, batchId) => {
		setPopBox({
			isOpen: true,
			title: "Add Personal Message",
			data: { type, batchId },
			popBoxType: defPopBoxType.csdAddPersonalMessage
		});
	};

	const handleDeleteBatchMessage = async batchId => {
		await deleteBatchMessage(batchId);

		handleSearchSubmit();
	};

	const handleUpdateBatchMessage = async batchId => {
		openAddMessageModal(MODAL_TYPE.EDIT, batchId);
	};

	const handleExportReport = batchId => {
		exportMessageReport(batchId);
	};

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 col-lg-10">
				<h1 className="h2">{t("CSD.PersonalMessage.Title")}</h1>
				<i className="bi bi-align-bottom" />

				<div className="bd-example">
					<Row>
						<Form.Group as={Col} lg={4}>
							<Form.Label>{t("Common.DateRange")}</Form.Label>

							<DatetimePicker setDateRange={setDateRange} />
						</Form.Group>
					</Row>

					<Row>
						<Col lg={9} />
						<Col lg={3} className="d-flex justify-content-end">
							<Button
								onClick={() => openAddMessageModal()}
								type="button"
								className="me-2"
								style={{ width: "120px" }}
								variant="success">
								<Plus className="fs-5" />

								{t("CSD.PersonalMessage.AddNew")}
							</Button>

							<ButtonWithLoading
								style={{ width: "120px" }}
								loading={loading}
								onClick={() => clickPageNumber(1)}>
								<Search className="me-2" />

								{t("Common.Search")}
							</ButtonWithLoading>
						</Col>
					</Row>
				</div>

				{loading !== undefined && (
					<div className="bd-example">
						<Pagination
							t={t}
							currentPage={currentPage}
							totalPages={totalPages || 1}
							pageSize={pageSize}
							rowCount={rowCount}
							onSelectEntry={onSelectEntry}
							clickPageNumber={clickPageNumber}>
							<PersonalMessageTable
								loading={loading}
								batchMessageList={batchMessageList}
								onUpdateBatchMessage={handleUpdateBatchMessage}
								onDeleteBatchMessage={handleDeleteBatchMessage}
								onExportReport={handleExportReport}
							/>
						</Pagination>
					</div>
				)}
			</main>
		</Layout>
	);
};

export { PersonalMessage };
