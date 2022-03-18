import { useState, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { allSiteListContext } from "../../context";
import {
	useGetDateRange,
	useSelectCurrencies,
	useSelectEnumTypes,
	useHandlePage,
	useAmountFilter,
	useGetCurrencyData
} from "../../../hook";
import DatetimePicker from "../../datetimePicker";
import DropdownWithSearch from "../../dropdownWithSearch";
import InputBox from "../../inputBox";
import ButtonWithDropdown from "../../buttonWithDropdown";
import { Pagination } from "../../pagination";
import { Empty } from "../../empty";
import {
	api_withdrawal_GetList,
	api_withdrawal_Export
} from "../../../service/api/withdrawal";
import {
	number_format,
	downloadExcelFile,
	datetime_format
} from "../../common";
import { ButtonWithLoading, Loading, Badge } from "../..";
import path from "../../../path";

const defInputCol = {
	withdrawalId: "withdrawalId",
	userName: "userName"
};

const defResultTitle = {
	ReferenceId: "ReferenceId",
	Currency: "Currency",
	MemberCode: "MemberCode",
	VIPLevel: "VIPLevel",
	Type: "Type",
	Status: "Status",
	KYC: "KYC",
	Risk: "Risk",
	WithdrawalCount: "WithdrawalCount",
	Amount: "Amount",
	Bank: "Bank",
	CreateDate: "CreateDate",
	FlowEndDate: "FlowEndDate",
	UpdatedDate: "UpdatedDate"
};

const statusStyle = {
	1: "warning",
	2: "warning",
	3: "success",
	4: "warning",
	5: "dark",
	6: "success",
	7: "danger",
	8: "warning",
	99: "danger"
};

const WithdrawalListing = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const isMountedRef = useRef(null);
	const { siteId } = useContext(allSiteListContext);
	const [inputValue, setInputValue] = useState({});
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const { getCurrencyName } = useGetCurrencyData({ singleMapping: true });

	const {
		dateRange: submitDate,
		setDateRange: setRegisterDate
	} = useGetDateRange();

	const {
		OnSelectCurrency,
		currencyList,
		selected: selectedCurrencies,
		getAPIPayload: getCurrencies
	} = useSelectCurrencies({ siteId, defaultSelectAll: true });

	const {
		selected: selectedStatus,
		OnSelect: onSelectStatus,
		options: statusOptions,
		getAPIPayload: getStatusPayload
	} = useSelectEnumTypes({
		enumName: "WithdrawalStatusEnum",
		useFrontendFilter: false
	});

	const {
		selected: selectedType,
		OnSelect: onSelectType,
		options: typeOptions,
		getAPIPayload: getTypePayload
	} = useSelectEnumTypes({
		enumName: "WithdrawalTypeEnum",
		defaultSelectAll: true
	});

	const {
		selected: selectedVIPLevel,
		OnSelect: onSelectVIPLevel,
		options: VIPLevelOPtions,
		getAPIPayload: getVIPLevelPayload
	} = useSelectEnumTypes({
		enumName: "VIPLevelEnum",
		defaultSelectAll: true
	});

	const {
		selected: selectedAmount,
		OnSelect: onelectAmount,
		options: amountOptions,
		getAPIPayload: getAmountPayload,
		amount: Amount,
		OnEditAmount
	} = useAmountFilter();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (statusOptions.length) {
			statusOptions.splice(0, 1);
			onSelectStatus(statusOptions[0]);
		}
	}, [statusOptions]);

	const editField = ({ col, val }) => {
		setInputValue(prev => ({ ...prev, [col]: val }));
	};

	const getPayload = ({ currentPage, pageSize }) => ({
		...inputValue,
		pageNumber: currentPage ?? 1,
		pageSize: pageSize ?? 10,
		siteIds: [siteId],
		withdrawalTypes: getTypePayload(),
		currencyIds: getCurrencies(),
		startDate: submitDate.startDate,
		endDate: submitDate.endDate,
		statuses: getStatusPayload(),
		levelStatuses: getVIPLevelPayload(),
		amountType: getAmountPayload(),
		amount: Amount
	});

	const search = ({ currentPage, pageSize, clickPageNumber, resetPage }) => {
		const payload = getPayload({ currentPage, pageSize });

		setLoading(true);
		api_withdrawal_GetList({ ...payload }).then(
			res => {
				if (!isMountedRef.current) return;
				const {
					errorCode,
					message,
					data,
					totalPages,
					rowCount
				} = res.data;

				if (errorCode === 0) {
					setResult({
						data,
						totalPages,
						rowCount
					});

					if (resetPage) {
						clickPageNumber({ pageNumber: 1, execCallback: false });
					}
				} else {
					alert.error(`[${errorCode}] ${message || "error"}`);
				}
				setLoading(false);
			},
			() => {
				if (!isMountedRef.current) return;
				setLoading(false);
				alert.error(t("Error.DefaultError"));
			}
		);
	};

	const {
		currentPage,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({ callback: search });

	const exportReport = () => {
		const payload = getPayload({ currentPage, pageSize });

		if (result.data.length) {
			api_withdrawal_Export({ ...payload }).then(
				res => {
					if (!isMountedRef.current) return;
					const today = dayjs().format("YYYYMMDD");
					downloadExcelFile(res, `exportWithdrawal${today}`);
				},
				() => {
					if (!isMountedRef.current) return;
					alert.error(t("Error.DefaultError"));
				}
			);
		}
	};

	const resultTitleArr = Object.values(defResultTitle).map(obj => (
		<th scope="col" key={obj}>
			{t(`WithdrawalListing.${obj}`)}
		</th>
	));

	const startEntry = (currentPage - 1) * pageSize + 1;

	const arr = result?.data?.map((el, i) => {
		const currencyName = getCurrencyName(el.currencyId);
		const memberInformationPath = path.memberInformation.root;
		const withdrawalDetailPath = path.withdrawalDetail.root;
		const custStatus = statusOptions.find(s => s.value === el.status);

		return (
			<tr key={`transId-${el.transId}`}>
				<th>{startEntry + i}</th>
				<td>
					<Link
						className="nav-link"
						to={{
							pathname: `/${withdrawalDetailPath.replace(
								"/:id",
								`/${el.transId}`
							)}`,
							state: { data: el.transId }
						}}>
						{el.transId}
					</Link>
				</td>
				<td>{currencyName}</td>
				<td>
					<Link
						className="nav-link"
						to={{
							pathname: `/${memberInformationPath.replace(
								"/:id",
								""
							)}/${el.custId}`,
							state: { data: el.custId }
						}}>
						{el.userName}
					</Link>
				</td>
				<td>{el.vipLevel}</td>
				<td>{typeOptions[el.withdrawalType]?.displayText}</td>
				<td>
					<Badge bg={statusStyle[custStatus?.value]}>
						{custStatus?.displayText}
					</Badge>
				</td>
				<td>{el.isKyc ? t("MemberList.Yes") : t("MemberList.No")}</td>
				<td>{el.isRisk ? t("MemberList.Yes") : t("MemberList.No")}</td>
				<td>{el.withdrawlCnt}</td>
				<td>{number_format(el.amount)}</td>
				<td>{el.bankName}</td>
				<td>{datetime_format(el.createTime)}</td>
				<td>{datetime_format(el.flowEndTime)}</td>
				<td>{datetime_format(el.updateTime)}</td>
			</tr>
		);
	});

	return (
		<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 finance-withdrawallist">
			<h2>{t("Menu.Finance.WithdrawalListing")}</h2>
			<form
				onSubmit={e => {
					e.preventDefault();
					search({
						currentPage,
						pageSize,
						clickPageNumber,
						resetPage: true
					});
				}}>
				<div className="bd-example">
					<div className="row">
						<h6>{t("WithdrawalListing.SubmitDate")}</h6>
						<DatetimePicker
							id="registerDate"
							setDateRange={setRegisterDate}
						/>
					</div>

					<div className="row">
						<DropdownWithSearch
							title={t("WithdrawalListing.Currency")}
							options={currencyList}
							selected={selectedCurrencies}
							onSelect={OnSelectCurrency}
							className="btn-group col-md-3"
						/>
						<DropdownWithSearch
							title={t("WithdrawalListing.Status")}
							options={statusOptions}
							selected={selectedStatus}
							onSelect={onSelectStatus}
							className="btn-group col-md-3"
						/>
						<DropdownWithSearch
							title={t("WithdrawalListing.Type")}
							options={typeOptions}
							selected={selectedType}
							onSelect={onSelectType}
							className="btn-group col-md-3"
						/>
						<InputBox
							title={t("DepositList.ReferenceId")}
							value={inputValue?.withdrawalId}
							onChange={e =>
								editField({
									col: defInputCol.withdrawalId,
									val: e.target.value
								})
							}
							className="btn-group col-md-3"
						/>
					</div>

					<div className="row">
						<InputBox
							title={t("WithdrawalListing.MemberCode")}
							value={inputValue?.userName}
							onChange={e =>
								editField({
									col: defInputCol.userName,
									val: e.target.value
								})
							}
							className="btn-group col-md-3"
						/>
						<DropdownWithSearch
							title={t("WithdrawalListing.VIPLevel")}
							options={VIPLevelOPtions}
							selected={selectedVIPLevel}
							onSelect={onSelectVIPLevel}
							className="btn-group col-md-3"
						/>
						<ButtonWithDropdown
							title={t("WithdrawalListing.Amount")}
							selected={selectedAmount}
							OnSelect={onelectAmount}
							options={amountOptions}
							OnEditAmount={OnEditAmount}
							amount={Amount}
						/>
					</div>

					<div>
						<button
							type="submit"
							className="btn btn-primary float-end">
							{t("WithdrawalListing.Search")}
						</button>
						<ButtonWithLoading
							type="button"
							className="btn btn-info float-end mx-2"
							disabled={!result?.data}
							onClick={exportReport}
							tooltip={t("WithdrawalListing.Export")}>
							{t("WithdrawalListing.Export")}
						</ButtonWithLoading>
					</div>
				</div>
			</form>

			{result?.data && (
				<div className="bd-example">
					{loading && <Loading />}
					{result?.data?.length ? (
						<Pagination
							t={t}
							currentPage={currentPage}
							totalPages={result.totalPages}
							rowCount={result.rowCount}
							pageSize={pageSize}
							clickPageNumber={clickPageNumber}
							onSelectEntry={onSelectEntry}>
							<div className="table-responsive">
								<table className="table table-striped table-hover">
									<thead className="table-dark">
										<tr>
											<th scope="col">#</th>
											{resultTitleArr}
										</tr>
									</thead>
									<tbody>{arr}</tbody>
								</table>
							</div>
						</Pagination>
					) : (
						<Empty />
					)}
				</div>
			)}
		</main>
	);
};

export default WithdrawalListing;
