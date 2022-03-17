import React, { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import {
	api_withdrawal_GetByTransId,
	api_withdrawal_GetCommentByTransId,
	api_withdrawal_UploadPicture,
	api_withdrawal_DeletePicture
} from "../../../service/api/withdrawal";
import { useSelectEnumTypes, useGetCurrencyData } from "../../../hook";
import { Loading, ButtonWithLoading } from "../..";
import path from "../../../path";
import Layout from "../../layout";
import { number_format, datetime_format } from "../../common";
import { Empty } from "../../empty";
import { popBoxContext } from "../../context";
import { defPopBoxType } from "../../popBox";

export const status = {
	Draft: 0,
	Pending: 1,
	OnHold: 2,
	Verify: 3,
	Process: 4,
	Cancelled: 5,
	Approved: 6,
	Rejected: 7,
	ToKyc: 8,
	Error: 99
};

const defCopyCol = {
	amount: "amount",
	companyAccountNo: "companyAccountNo",
	companyAccountName: "companyAccountName"
};

const WithdrawalDetail = props => {
	const { id: transId } = props?.match?.params;
	const { t } = useTranslation();
	const alert = useAlert();
	const { setPopBox, confirm } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [custInfo, setCustInfo] = useState({});
	const [comments, setComments] = useState([]);
	const { getCurrencyName } = useGetCurrencyData({ singleMapping: true });

	const { options: statusOptions } = useSelectEnumTypes({
		enumName: "WithdrawalStatusEnum",
		useFrontendFilter: false
	});

	const { options: typeOptions } = useSelectEnumTypes({
		enumName: "WithdrawalTypeEnum"
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getData = () => {
		try {
			Promise.allSettled([
				api_withdrawal_GetByTransId({ transId }),
				api_withdrawal_GetCommentByTransId({ transId })
			]).then(([resCustInfo, resComments]) => {
				if (resCustInfo.value.data.errorCode === 0) {
					isMountedRef && setCustInfo(resCustInfo.value.data.data);
				} else {
					const { errorCode, message } = resCustInfo.value.data;
					alert.error(`[${errorCode}] ${message || "error"}`);
				}
				if (resComments.value.data.errorCode === 0) {
					isMountedRef && setComments(resComments.value.data.data);
				} else {
					const { errorCode, message } = resComments.value.data;
					alert.error(`[${errorCode}] ${message || "error"}`);
				}
				setLoading(false);
			});
		} catch {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const onCopy = id => {
		const copyColumn = document.getElementById(id);
		window.getSelection().selectAllChildren(copyColumn);
		document.execCommand("copy");
	};

	const onProcess = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.withdrawalDetail,
			title: t("WithdrawalDetail.ProcessWithdrawal"),
			custInfo,
			transId,
			getData
		});
	};

	const deleteBankSlip = () => {
		const delSlip = () => {
			api_withdrawal_DeletePicture({ transId }).then(
				res => {
					if (!isMountedRef.current) return;

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						getData();
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				},
				() => {
					if (!isMountedRef.current) return;
					alert.error(t("Error.DefaultError"));
				}
			);
		};

		confirm({
			content: <h4>{t("PopBox.AreYouSure")}</h4>,
			onOk() {
				delSlip();
			}
		});
	};

	const onImgFileReaderHandlar = imgFile => {
		const imgReader = new FileReader();

		imgReader.readAsDataURL(imgFile);
		imgReader.onload = () => {
			api_withdrawal_UploadPicture({
				transId,
				pic: imgReader.result
			}).then(
				res => {
					if (!isMountedRef.current) return;

					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						getData();
					} else {
						alert.error(`[${errorCode}] ${message || "error"}`);
					}
				},
				() => {
					if (!isMountedRef.current) return;
					alert.error(t("Error.DefaultError"));
				}
			);
		};
	};

	const onUploadFile = e => {
		e.preventDefault();

		let file = null;
		if (e.clipboardData?.files.length) {
			[file] = e.clipboardData.files;
		}

		const isValid = file?.type.includes("image");
		if (isValid) {
			onImgFileReaderHandlar(file);
		}
	};

	const memberInformationPath = path.memberInformation.root;

	const commentsArr = comments?.map((el, i) => (
		<tr key={`comment-${el.action}-${el.createTime}`}>
			<th>{i + 1}</th>
			<td>{el.comment}</td>
			<td>{statusOptions[el.action]?.displayText}</td>
			<td>{el.operator}</td>
			<td>{datetime_format(el.createTime)}</td>
		</tr>
	));

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 finance-withdrawaldetail">
				<h2>{t("WithdrawalDetail.Title")}</h2>
				<div className="row">
					{loading && <Loading />}
					<div className="col-xl-4">
						<div className="card">
							<div className="card-body">
								<h6 className="card-title">
									{t("WithdrawalDetail.MemberInformation")}
								</h6>
								<div className="row">
									<div className="col">
										<div>
											{t("WithdrawalDetail.MemberCode")}
										</div>
										<div className="small text-break">
											<Link
												className="nav-link"
												to={{
													pathname: `/${memberInformationPath.replace(
														"/:id",
														""
													)}/${custInfo.custId}`,
													state: {
														data: custInfo.custId
													}
												}}>
												{custInfo.userName}
											</Link>
										</div>
									</div>
									<div className="col">
										<div>
											{t("WithdrawalDetail.Currency")}
										</div>
										<div className="small">
											{getCurrencyName(
												custInfo.currencyId
											)}
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<div>{t("WithdrawalDetail.Email")}</div>
										<div className="small text-break">
											{custInfo.email}
										</div>
									</div>
									<div className="col">
										<div>KYC</div>
										<div className="small">
											{custInfo.isKyc
												? t("MemberList.Yes")
												: t("MemberList.No")}
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<div>{t("WithdrawalDetail.Risk")}</div>
										<div className="small">
											{custInfo.isRisk
												? t("MemberList.Yes")
												: t("MemberList.No")}
										</div>
									</div>
								</div>
							</div>
						</div>
						{(custInfo.status === status.Process ||
							custInfo.status === status.Approved) && (
							<div className="card">
								<div className="card-body">
									<h6 className="card-title">
										{t("WithdrawalDetail.BankSlip")}
									</h6>
									{custInfo.hasPic ? (
										<img
											style={{ width: "100%" }}
											src={`/apiV2/Withdrawal/GetPicture/?transId=${transId}&BankSlipPicCount=${custInfo.bankSlipPicCount}`}
											alt="bank slip"
										/>
									) : (
										<div
											onPaste={e => onUploadFile(e)}
											style={{
												border:
													"1px solid rgba(0, 0, 0, 0.125)",
												height: "100px",
												textAlign: "center",
												borderRadius: "0.25rem",
												lineHeight: "100px",
												color: "rgba(0, 0, 0, 0.5)"
											}}>
											{t("WithdrawalDetail.PasteArea")}
										</div>
									)}
									{custInfo.hasPic && (
										<button
											type="button"
											className="btn btn-secondary float-end mt-2"
											onClick={deleteBankSlip}>
											{t("WithdrawalDetail.Delete")}
										</button>
									)}
								</div>
							</div>
						)}
					</div>

					<div className="col-xl-8">
						<div className="card financeInformation">
							<div className="card-body">
								<h6 className="card-title">
									{t(
										"WithdrawalDetail.WithdrawalInformation"
									)}
								</h6>

								<div className="row">
									<div className="col">
										<div>
											{t("WithdrawalDetail.Status")}
										</div>
										<div className="small">
											{
												statusOptions.find(
													el =>
														el.value ===
														custInfo.status
												)?.displayText
											}
										</div>
									</div>
									<div className="col">
										<div>
											{t("WithdrawalDetail.Amount")}
										</div>
										<div className="small">
											<span id={defCopyCol.amount}>
												{number_format(custInfo.amount)}
											</span>
											<i
												className="icon icon-copy text-primary"
												onClick={() => {
													onCopy(defCopyCol.amount);
												}}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<div>{t("WithdrawalDetail.Type")}</div>
										<div className="small">
											{
												typeOptions[
													custInfo.withdrawalType
												]?.displayText
											}
										</div>
									</div>
									<div className="col">
										<div>
											{t("WithdrawalDetail.ReferenceId")}
										</div>
										<div className="small">
											{custInfo.refId ?? (
												<span
													style={{
														fontStyle: "italic"
													}}>
													N/A
												</span>
											)}
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<div>
											{t("WithdrawalDetail.BankCode")}
										</div>
										<div className="small">
											{custInfo.fromBankCode ?? (
												<span
													style={{
														fontStyle: "italic"
													}}>
													N/A
												</span>
											)}
										</div>
									</div>
									<div className="col">
										<div>
											{t("WithdrawalDetail.BankName")}
										</div>
										<div className="small">
											{custInfo.fromBankName ?? (
												<span
													style={{
														fontStyle: "italic"
													}}>
													N/A
												</span>
											)}
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<div>
											{t(
												"WithdrawalDetail.CompanyAccountNo"
											)}
										</div>
										<div className="small">
											{custInfo.fromAccountNo ? (
												<>
													<span
														id={
															defCopyCol.companyAccountNo
														}>
														{custInfo.fromAccountNo}
													</span>
													<i
														className="icon icon-copy text-primary"
														onClick={() => {
															onCopy(
																defCopyCol.companyAccountNo
															);
														}}
													/>
												</>
											) : (
												<span
													id={defCopyCol.amount}
													style={{
														fontStyle: "italic"
													}}>
													N/A
												</span>
											)}
										</div>
									</div>
									<div className="col">
										<div>
											{t(
												"WithdrawalDetail.CompanyAccountName"
											)}
										</div>
										<div className="small">
											{custInfo.fromAccountName ? (
												<>
													<span
														id={
															defCopyCol.companyAccountName
														}>
														{
															custInfo.fromAccountName
														}
													</span>
													<i
														className="icon icon-copy text-primary"
														onClick={() => {
															onCopy(
																defCopyCol.companyAccountName
															);
														}}
													/>
												</>
											) : (
												<span
													style={{
														fontStyle: "italic"
													}}>
													N/A
												</span>
											)}
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<div>
											{t(
												"WithdrawalDetail.SubmittedDate"
											)}
										</div>
										<div className="small">
											{datetime_format(
												custInfo.createTime
											)}
										</div>
									</div>
									<div className="col">
										<div>
											{t("WithdrawalDetail.FlowEndDate")}
										</div>
										<div className="small">
											{datetime_format(
												custInfo.flowEndTime
											)}
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<div>
											{t("WithdrawalDetail.UpdatedDate")}
										</div>
										<div className="small">
											{datetime_format(
												custInfo.updateTime
											)}
										</div>
									</div>
									<div>
										<ButtonWithLoading
											type="button"
											className="btn btn-primary float-end col"
											onClick={onProcess}
											size="sm"
											tooltip="Process">
											{t("WithdrawalDetail.Process")}
										</ButtonWithLoading>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-body row">
								<div className="col gameInformation">
									<div className="table-responsive">
										<table className="table table-striped table-hover">
											<thead className="table-dark">
												<tr>
													<th scope="col">#</th>
													<th scope="col">
														{t(
															"WithdrawalDetail.Remark"
														)}
													</th>
													<th scope="col">
														{t(
															"WithdrawalDetail.Action"
														)}
													</th>
													<th scope="col">
														{t(
															"WithdrawalDetail.CreatedBy"
														)}
													</th>
													<th scope="col">
														{t(
															"WithdrawalDetail.CreatedDate"
														)}
													</th>
												</tr>
											</thead>
											{comments.length ? (
												<tbody>{commentsArr}</tbody>
											) : null}
										</table>
										{comments.length === 0 && <Empty />}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default WithdrawalDetail;
