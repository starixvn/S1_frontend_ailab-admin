/* eslint-disable react/forbid-prop-types */
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { any, arrayOf, bool, func, number } from "prop-types";
import { Table } from "react-bootstrap";
import { ButtonWithLoading, Loading } from "../../../components";
import { popBoxContext } from "../../../components/context";
import { datetime_format } from "../../../components/common";

const BetLimitTable = ({
	loading,
	betLimitList,
	tableRowStartIndex,
	onUpdateBetLimit,
	onDeleteBetLimit
}) => {
	const { t } = useTranslation();
	const { confirm } = useContext(popBoxContext);

	const handleUpdateBetlimit = custId => () => {
		onUpdateBetLimit(custId);
	};

	const handleDeleteBetLimit = custId => () => {
		confirm({
			content: t("PopBox.AreYouSure"),
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
						<th>#</th>
						<th>{t("CSD.BetLimit.UserName")}</th>
						<th>{t("Common.CreatedBy")}</th>
						<th>{t("Common.CreatedDate")}</th>
						<th>{t("Common.UpdatedBy")}</th>
						<th>{t("Common.UpdatedDate")}</th>
						<th className="text-center w-25">
							{t("Common.Action")}
						</th>
					</tr>
				</thead>

				<tbody>
					{betLimitList.map((item, index) => (
						<tr key={`${item.createTime}-${item.updateTime}`}>
							<td>{tableRowStartIndex + index}</td>
							<td>{item.userName}</td>

							<td>{item.creator}</td>

							<td>{datetime_format(item.createTime)}</td>

							<td>{item.updateOperator}</td>

							<td>{datetime_format(item.updateTime)}</td>

							<td className="d-flex justify-content-center">
								<span role="button" className="m-2">
									<ButtonWithLoading
										onClick={handleUpdateBetlimit(
											item.custId
										)}
										tooltip="Edit"
										variant="primary">
										<i className="icon icon-edit" />
									</ButtonWithLoading>
								</span>
								<span role="button" className="m-2">
									<ButtonWithLoading
										onClick={handleDeleteBetLimit(
											item.custId
										)}
										tooltip="Delete"
										variant="danger">
										<i className="icon icon-del" />
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

BetLimitTable.propTypes = {
	loading: bool.isRequired,
	betLimitList: arrayOf(any).isRequired,
	tableRowStartIndex: number.isRequired,
	onUpdateBetLimit: func.isRequired,
	onDeleteBetLimit: func.isRequired
};
export { BetLimitTable };
