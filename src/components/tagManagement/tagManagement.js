import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHandlePage } from "../../hook/useHandlePage";
import { menuContext, userInfoContext, popBoxContext } from "../context";
import { Pagination } from "../pagination";
import { Empty } from "../empty";
import { defPopBoxType } from "../popBox";
import Dropdown from "../dropdown";
import {
	api_CSD_TagManagement_SetTagStatus,
	api_CSD_TagManagement_GetTagList
} from "../../service/api/csd";

const initValue = {
	options: [
		{ value: 1, displayText: "Show All" },
		{ value: 0, displayText: "Active only" }
	]
};

const TagManagement = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [tableContent, setTableContent] = useState({
		rows: null,
		totalPages: 0,
		pageNumber: 0,
		rowCount: 0
	});

	const [selected, setSelected] = useState(initValue.options[0]);

	const getTagByStatus = async ({ page, pageSize }) => {
		try {
			const res = await api_CSD_TagManagement_GetTagList({
				status: selected.value,
				pageSize,
				pageNumber: page
			});

			const {
				errorCode,
				data,
				totalPages,
				pageNumber,
				rowCount
			} = res.data;

			if (errorCode === 0) {
				setTableContent({
					rows: data,
					totalPages,
					pageNumber,
					rowCount
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const {
		currentPage,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({
		callback: arg =>
			getTagByStatus({
				page: arg.page,
				pageSize: arg.pageSize || pageSize
			})
	});

	const activateTag = async id => {
		try {
			const res = await api_CSD_TagManagement_SetTagStatus({
				id
			});
			const { errorCode, message } = res.data;
			if (errorCode === 0) {
				getTagByStatus({ page: 1, pageSize: 10 });
				setPopBox({
					isOpen: true,
					content: <p>{message}</p>
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main className="col-md-9 col-lg-10">
			<h1 className="h2">{t("Menu.CSD.TagManagement")}</h1>
			<div className="bd-example">
				<div className="btn-group">
					<Dropdown
						options={initValue.options}
						value={selected}
						onSelect={({ value, displayText }) =>
							setSelected({ value, displayText })
						}
					/>
				</div>
				<button
					onClick={() => getTagByStatus({ page: 1, pageSize: 10 })}
					type="button"
					className="btn btn-primary">
					{t("Menu.CSD.Search")}
				</button>
				<button
					type="button"
					onClick={() =>
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.tagPopBox,
							title: t("Menu.CSD.AddTag"),
							refresh: () =>
								getTagByStatus({ page: 1, pageSize: 10 })
						})
					}
					className="btn btn-success">
					{t("Menu.CSD.Create")}
				</button>
			</div>

			<div className="bd-example">
				{tableContent.rows?.length ? (
					<Pagination
						t={t}
						currentPage={currentPage}
						totalPages={tableContent.totalPages}
						totalEntries={tableContent.rowCount}
						pageSize={pageSize}
						clickPageNumber={clickPageNumber}
						onSelectEntry={({ value, displayText }) => {
							onSelectEntry({ value, displayText });
						}}>
						<div className="table-responsive">
							<table className="table table-striped table-hover">
								<thead className="table-dark">
									<tr>
										<th scope="col">#</th>
										<th scope="col">
											{t("Menu.CSD.Action")}
										</th>
										<th scope="col">
											{t("Menu.CSD.TagName")}
										</th>
										<th scope="col">
											{t("Menu.CSD.TagColor")}
										</th>
										<th scope="col">
											{t("Menu.CSD.Description")}
										</th>
										<th scope="col">
											{t("Menu.CSD.UpdatedBy")}
										</th>
										<th scope="col">
											{t("Menu.CSD.UpdatedDate")}
										</th>
									</tr>
								</thead>
								<tbody>
									{tableContent.rows.map(el => (
										<tr key={el.id}>
											<th>{el.id}</th>
											<td>
												<button
													type="button"
													onClick={() =>
														setPopBox({
															isOpen: true,
															popBoxType:
																defPopBoxType.tagPopBox,
															title: t(
																"Menu.CSD.EditTag"
															),
															tagData: {
																id: el.id,
																tagColour:
																	el.tagColour,
																description:
																	el.description,
																tagName:
																	el.tagName
															},
															refresh: () =>
																getTagByStatus({
																	page: 1,
																	pageSize: 10
																})
														})
													}
													className="btn btn-primary btn-sm">
													<i className="icon icon-edit" />
												</button>
												<button
													type="button"
													onClick={() =>
														activateTag(el.id)
													}
													className="btn btn-primary btn-sm">
													<i className="icon icon-check" />
												</button>
											</td>
											<td>{el.tagName}</td>
											<td>
												<div
													className="square"
													style={{
														background: `${el.tagColour}`
													}}>
													{el.tagColour}
												</div>
											</td>
											<td>{el.description}</td>
											<td>{el.updator}</td>
											<td>{el.updateTime}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Pagination>
				) : (
					<Empty />
				)}
			</div>
		</main>
	);
};

export default TagManagement;
