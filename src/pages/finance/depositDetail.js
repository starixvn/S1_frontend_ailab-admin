import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { useAlert } from "react-alert";
import { defPopBoxType } from "../../components/popBox";
import { popBoxContext } from "../../components/context";
import path from "../../path";
import Layout from "../../components/layout";
import {
	api_Deposit_GetByTransId,
	api_Deposit_GetCommentByTransId,
	api_Deposit_SendToNext,
	api_Deposit_SetAmountByTransId
} from "../../service/api/deposit";
import { useGetCurrencyData, useSelectEnumTypes } from "../../hook";
import { datetime_format, number_format } from "../../components/common";
import { Empty } from "../../components/empty";
import { Loading } from "../../components/loading";

export default function Page(props) {
	const { setPopBox } = useContext(popBoxContext);
	const alert = useAlert();

	const [datas, setDatas] = useState(null);
	const [comments, setComments] = useState(null);
	const [comments_Loading, setComments_Loading] = useState(false);

	const { t } = useTranslation();
	const { getCurrencyName } = useGetCurrencyData({ singleMapping: true });

	const { options: DepositStatusEnum_options } = useSelectEnumTypes({
		enumName: "DepositStatusEnum",
		useFrontendFilter: false
	});

	const { options: DepositTypeEnum_options } = useSelectEnumTypes({
		enumName: "DepositTypeEnum"
	});

	const transId = props?.match?.params?.transId;

	const getComments = async () => {
		try {
			const res = await api_Deposit_GetCommentByTransId({ transId });
			const { errorCode, message } = res.data;

			if (errorCode === 0) {
				setComments(res.data.data);
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			alert.error(t("Error.DefaultError"));
		} finally {
			setComments_Loading(false);
		}
	};

	const getByTransId = async () => {
		try {
			const res = await api_Deposit_GetByTransId({ transId });
			const { errorCode, message } = res.data;

			if (errorCode === 0) {
				setDatas(res.data.data);
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			alert.error(t("Error.DefaultError"));
		}
	};

	useEffect(() => {
		if (transId) {
			getByTransId();
			getComments();
		}
	}, [transId]);

	const UpdateStatus = async ({ status, remark }) => {
		try {
			setComments_Loading(true);
			const res = await api_Deposit_SendToNext({
				transId,
				actualDeposit: datas?.actualDeposit,
				comment: remark,
				action: status
			});

			const { errorCode, message } = res.data;

			if (errorCode === 0) {
				getByTransId();
				getComments();
				setPopBox({ isOpen: false });
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			alert.error(t("Error.DefaultError"));
		}
	};

	const OnClickProcess = () => {
		setPopBox({
			isOpen: true,
			title: "Process Deposit",
			data: {
				transId,
				depositType: datas?.depositType,
				depositStatus: datas?.status,
				UpdateStatus
			},
			popBoxType: defPopBoxType.financeDepsoitProcess
		});
	};

	const AdjustAmount = async amount => {
		try {
			const res = await api_Deposit_SetAmountByTransId({
				transId,
				amount: Number(amount)
			});

			const { errorCode, message } = res.data;

			if (errorCode === 0) {
				getByTransId();
				setPopBox({ isOpen: false });
			} else {
				alert.error(`[${errorCode}] ${message || "error"}`);
			}
		} catch (error) {
			alert.error(t("Error.DefaultError"));
		}
	};

	const OnClickAdjAmount = () => {
		setPopBox({
			isOpen: true,
			title: "Edit Amount",
			data: {
				AdjustAmount
			},
			popBoxType: defPopBoxType.financeDepsoitAdjAmount
		});
	};

	const copyText = value => {
		const virtualInput = document.createElement("input");
		virtualInput.value = value;
		document.body.appendChild(virtualInput);
		virtualInput.select();
		document.execCommand("copy");
		document.body.removeChild(virtualInput);

		alert.success(`copied: ${value}`);
	};

	return (
		<Layout>
			<main className="col-md-9 col-lg-10">
				<Breadcrumb transId={transId} t={t} />
				<div className="row">
					<div className="col-xl-4">
						<MemberInformation
							datas={datas}
							getCurrencyName={getCurrencyName}
						/>
					</div>
					<div className="col-xl-8">
						<DepositInformation
							datas={datas}
							DepositStatusEnum_options={
								DepositStatusEnum_options
							}
							DepositTypeEnum_options={DepositTypeEnum_options}
							OnClickProcess={OnClickProcess}
							OnClickAdjAmount={OnClickAdjAmount}
							copyText={copyText}
						/>
						<Comments
							datas={comments}
							options={{
								DepositStatusEnum_options
							}}
							loading={comments_Loading}
						/>
					</div>
				</div>
			</main>
		</Layout>
	);
}

const Breadcrumb = ({ t, transId }) => (
	<nav aria-label="breadcrumb">
		<ol className="breadcrumb">
			<li className="breadcrumb-item">
				<Link to={`/${path.depositList.root}`}>
					{t("Menu.Finance.DepositRequest")}
				</Link>
			</li>
			<li className="breadcrumb-item active" aria-current="page">
				{transId}
			</li>
		</ol>
	</nav>
);

const MemberInformation = ({ getCurrencyName, datas }) =>
	datas && (
		<div className="card">
			<div className="card-body">
				<h6 className="card-title">Member Information</h6>
				<div className="row">
					<div className="col-5">Member Code</div>
					<div className="col-7 small">
						<Link
							to={`/${path.memberInformation.root.replace(
								":id",
								datas.custId
							)}`}>
							{datas.userName}
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-5">Currency</div>
					<div className="col-7 small">
						{getCurrencyName(datas.currencyId)}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Full Name</div>
					<div className="col-7 small">
						{datas.accountName ?? "N/A"}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Email</div>
					<div className="col-7 small">{datas.email ?? "N/A"}</div>
				</div>
				<div className="row">
					<div className="col-5">KYC</div>
					<div className="col-7 small">
						{datas.isKyc ? "Yes" : "No"}
					</div>
				</div>
				<div className="row">
					<div className="col-5">Risk</div>
					<div className="col-7 small">
						{datas.isRisk ? "Yes" : "No"}
					</div>
				</div>
			</div>
		</div>
	);

const DepositInformation = ({
	datas,
	DepositStatusEnum_options,
	DepositTypeEnum_options,
	OnClickProcess,
	OnClickAdjAmount,
	copyText
}) =>
	datas && (
		<div className="card">
			<div className="card-body">
				<h6 className="card-title">Deposit Information</h6>
				<div className="row">
					<div className="col-xl-6">
						<div className="row">
							<div className="col-12">Status</div>
							<div className="col-12 small">
								{
									DepositStatusEnum_options?.find(
										s => s.value === datas?.status
									)?.displayText
								}
							</div>
						</div>

						<div className="row">
							<div className="col-12">Type</div>
							<div className="col-12 small">
								{
									DepositTypeEnum_options?.find(
										s => s.value === datas?.depositType
									)?.displayText
								}
							</div>
						</div>

						<div className="row">
							<div className="col-12">Bank Code</div>
							<div className="col-12 small">
								{datas?.bankCode ?? "N/A"}
							</div>
						</div>

						<div className="row">
							<div className="col-12">Company Account No.</div>
							<div className="col-12 small">
								{datas?.accountNo ?? "N/A"}
								<i
									className="icon icon-copy text-primary"
									onClick={() => copyText(datas?.accountNo)}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-12">Submitted Date</div>
							<div className="col-12 small">
								{datetime_format(datas?.createTime)}
							</div>
						</div>

						<div className="row">
							<div className="col-12">Updated Date</div>
							<div className="col-12 small">
								{datetime_format(datas?.updateTime)}
							</div>
						</div>
					</div>
					<div className="col-xl-6">
						<div className="row">
							<div className="col-12">Amount</div>
							<div className="col-12 small">
								{number_format(datas?.amount)}
								<i
									className="icon icon-copy text-primary"
									onClick={() => copyText(datas?.amount)}
								/>
								<i
									className="icon icon-edit text-primary"
									onClick={OnClickAdjAmount}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-12">Reference Id</div>
							<div className="col-12 small">
								{datas?.refId ?? "N/A"}
							</div>
						</div>

						<div className="row">
							<div className="col-12">Bank Name</div>
							<div className="col-12 small">
								{datas?.bankName ?? "N/A"}
							</div>
						</div>

						<div className="row">
							<div className="col-12">Company Account Name</div>
							<div className="col-12 small">
								{datas?.accountName ?? "N/A"}
								<i
									className="icon icon-copy text-primary"
									onClick={() => copyText(datas?.accountName)}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-12">Deposit Time</div>
							<div className="col-12 small">
								{datetime_format(datas?.depositTime)}
							</div>
						</div>
					</div>
					<div>
						<Button
							className="mx-3 float-end btn btn-primary"
							onClick={OnClickProcess}>
							Process
						</Button>
					</div>
				</div>
			</div>
		</div>
	);

function convertToDisplayText(options, value) {
	return options.find(o => o.value === value)?.displayText;
}

const defColumnType = {
	default: "value",
	link: "link",
	checkbox: "checkbox",
	id: "id"
};

const defColumnTitle = {
	Remark: "Remark",
	Action: "Action",
	CreatedBy: "Created By",
	CreateDate: "CreateDate"
};

const defColumns = options => [
	{ columnType: defColumnType.id },
	{
		titleKey: defColumnTitle.Remark,
		dataColumn: "comment"
	},
	{
		titleKey: defColumnTitle.Action,
		dataColumn: "action",
		formatFunc: v =>
			convertToDisplayText(options.DepositStatusEnum_options, v)
	},
	{
		titleKey: defColumnTitle.CreatedBy,
		dataColumn: "operator"
	},
	{
		titleKey: defColumnTitle.CreateDate,
		dataColumn: "createTime",
		formatFunc: datetime_format
	}
];

const Comments = ({ datas, options, loading }) => {
	const titleRows = [];
	const bodyRows = [];

	const _defColumns = defColumns(options);

	_defColumns.forEach(def => {
		let key = `table-title-${def.titleKey}`;
		let content = null;
		if (def.columnType === defColumnType.id) {
			key = "title-action-id";
			content = "#";
		} else {
			content = def.titleKey;
		}

		titleRows.push(<td key={key}>{content}</td>);
	});

	datas?.forEach((data, idx) => {
		const row = [];
		_defColumns.forEach(def => {
			const key = `table-title-${def.titleKey}`;
			let content = data[def.dataColumn];

			if (def.formatFunc) {
				if (typeof def.formatFunc === "object") {
					content = data[def.dataColumn];
				} else {
					content = def.formatFunc(data[def.dataColumn]);
				}
			} else if (def.columnType === defColumnType.id) {
				content = idx + 1;
			}

			row.push(<td key={key}>{content}</td>);
		});

		// eslint-disable-next-line react/no-array-index-key
		bodyRows.push(<tr key={`row-${idx}`}>{row}</tr>);
	});

	return (
		datas && (
			<div className="bd-example">
				{loading && <Loading />}
				<div className="table-responsive d-flex">
					<table className="table table-striped table-hover">
						<thead className="table-dark">
							<tr>{titleRows}</tr>
						</thead>
						<tbody>{bodyRows?.length >= 1 && bodyRows}</tbody>
					</table>
				</div>
				{!bodyRows?.length && <Empty />}
			</div>
		)
	);
};
