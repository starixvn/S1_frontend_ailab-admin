import { useState, useEffect, useRef, useContext } from "react";
import { useAlert } from "react-alert";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dropdown from "../../dropdown";
import { popBoxContext, allSiteListContext } from "../../context";
import { useSelectEnumTypes } from "../../../hook";
import { api_withdrawal_SendToNext } from "../../../service/api/withdrawal";
import {
	api_BaseData_GetPayList,
	api_BaseData_GetBankInfoOffList,
	api_BaseData_GetCryptoPayList
} from "../../../service/api/baseData";
import { Loading, ButtonWithLoading } from "../..";
import { status } from "./withdrawalDetail";

const withdrawalAction = {
	[status.Pending]: [
		status.Rejected,
		status.Verify,
		status.ToKyc,
		status.OnHold,
		status.Draft
	],
	[status.OnHold]: [status.Rejected, status.Verify, status.Draft],
	[status.Verify]: [
		status.Pending,
		status.Rejected,
		status.Process,
		status.Draft
	],
	[status.Process]: [status.Approved, status.Verify, status.Draft],
	[status.Cancelled]: [status.Draft],
	[status.Approved]: [status.Draft],
	[status.Rejected]: [status.Draft],
	[status.ToKyc]: [status.Pending, status.Rejected, status.Draft]
};

const statusBtn = {
	[status.Draft]: "info",
	[status.Pending]: "warning",
	[status.OnHold]: "warning",
	[status.Verify]: "success",
	[status.Process]: "success",
	[status.Cancelled]: "secondary",
	[status.Approved]: "success",
	[status.Rejected]: "danger",
	[status.ToKyc]: "warning"
};

const type = {
	Undefine: 0,
	OnlinePayment: 1,
	LocalBank: 2,
	CryptoPay: 4
};

const WithdrawalDeailPopBox = ({ custInfo, transId, getData }) => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const alert = useAlert();
	const { setPopBox, confirm } = useContext(popBoxContext);
	const { siteId } = useContext(allSiteListContext);
	const [loading, setLoading] = useState(false);
	const [text, setText] = useState("");
	const [paymentList, setPaymentList] = useState([]);
	const [selPayment, setSelPayment] = useState({});

	const { options: statusOptions } = useSelectEnumTypes({
		enumName: "WithdrawalStatusEnum",
		useFrontendFilter: false
	});

	useEffect(() => {
		if (custInfo.status === status.Verify) {
			setLoading(true);

			try {
				Promise.allSettled([
					api_BaseData_GetPayList({
						currencyId: custInfo.currencyId,
						payId: custInfo.sysId
					}),
					api_BaseData_GetBankInfoOffList({
						siteId,
						currencyId: custInfo.currencyId
					}),
					api_BaseData_GetCryptoPayList({
						currencyId: custInfo.currencyId,
						channelName:
							custInfo.cryptoCurrency === custInfo.network
								? custInfo.cryptoCurrency
								: `${custInfo.cryptoCurrency}-${custInfo.network}`
					})
				]).then(([OnlineBankRes, LocalBankRes, CryptoPayRes]) => {
					if (
						OnlineBankRes.value.data.errorCode === 0 &&
						custInfo.withdrawalType !== type.CryptoPay &&
						OnlineBankRes.value.data.data.length
					) {
						isMountedRef &&
							setPaymentList(prev => [
								...prev,
								{
									value: type.OnlinePayment,
									displayText: t(
										"WithdrawalDetail.OnlinePayment"
									),
									data: OnlineBankRes.value.data.data
								}
							]);
					}
					if (
						LocalBankRes.value.data.errorCode === 0 &&
						custInfo.withdrawalType !== type.CryptoPay &&
						LocalBankRes.value.data.data.length
					) {
						isMountedRef &&
							setPaymentList(prev => [
								...prev,
								{
									value: type.LocalBank,
									displayText: t(
										"WithdrawalDetail.LocalBank"
									),
									data: LocalBankRes.value.data.data
								}
							]);
					}
					if (
						CryptoPayRes.value.data.errorCode === 0 &&
						CryptoPayRes.value.data.data.length
					) {
						isMountedRef &&
							setPaymentList(prev => [
								...prev,
								{
									value: type.CryptoPay,
									displayText: t(
										"WithdrawalDetail.CryptoPay"
									),
									data: CryptoPayRes.value.data.data
								}
							]);
					}

					setLoading(false);
				});
			} catch {
				console.error();
			}
		}
	}, [custInfo.status]);
	const clickAction = action => {
		const sendToNext = () => {
			setLoading(true);

			let selId = null;
			let channelId = null;
			let withdrawalType = null;

			if (custInfo.status === status.Verify) {
				withdrawalType = selPayment.type?.value;

				if (
					custInfo.withdrawalType === type.OnlinePayment ||
					custInfo.withdrawalType === type.CryptoPay
				) {
					selId = selPayment.pay.payId;
					channelId = selPayment.pay.channelId;
				} else if (custInfo.withdrawalType === type.LocalBank) {
					selId = selPayment.pay.bankId;
				}
			}

			const payload = {
				transId,
				comment: text,
				action,
				withdrawalInfo: custInfo.withdrawalInfo,
				withdrawalType,
				selId,
				channelId
			};

			api_withdrawal_SendToNext({ ...payload }).then(res => {
				const { errorCode, message } = res.data;
				if (errorCode === 0) {
					setPopBox({ isOpen: false });
					getData();
				} else {
					alert.error(`[${errorCode}] ${message || "error"}`);
				}
				setLoading(false);
			});
		};

		if (
			custInfo.status === status.Verify &&
			action === status.Process &&
			(!selPayment.type || selPayment?.type.value === type.Undefine)
		) {
			setSelPayment(prev => ({
				...prev,
				tip: t("WithdrawalDetail.SelectOneTypeWithdrawal")
			}));
		} else {
			confirm({
				content: <h4>{t("PopBox.AreYouSure")}</h4>,
				onOk() {
					sendToNext();
				}
			});
		}
	};

	const onSelect = ({ col, val }) => {
		let _val = val;

		if (col === "type") {
			if (
				val.value === type.OnlinePayment ||
				val.value === type.CryptoPay
			) {
				const _data = val.data.map(el => ({
					...el,
					displayText: el.payName,
					value: el.payId
				}));
				_val = { ...val, data: _data };
			} else if (val.value === type.LocalBank) {
				const _data = val.data.map(el => ({
					...el,
					displayText: `${el.bankCode}-${el.accountName}-${el.accountNo}`,
					value: el.bankId
				}));
				_val = { ...val, data: _data };
			}

			setSelPayment({ type: _val, pay: _val.data[0] });
		} else {
			setSelPayment(prev => ({ ...prev, [col]: _val }));
		}
	};

	const getBtnBar = () =>
		withdrawalAction[statusOptions[custInfo.status]?.value]?.map(el => {
			const displayText =
				el === status.Draft
					? t("WithdrawalDetail.Draft")
					: statusOptions[el]?.displayText;
			return (
				<ButtonWithLoading
					key={`action-${el}`}
					type="button"
					size="sm"
					className={`btn btn-${statusBtn[el]} mx-1 float-end`}
					onClick={() => clickAction(el)}>
					{displayText}
				</ButtonWithLoading>
			);
		});

	return (
		<div className="modal-body mb-5">
			{loading && <Loading />}
			{custInfo.status === status.Verify && (
				<div className="mb-3">
					<Dropdown
						title={t("WithdrawalDetail.Type")}
						options={[
							{
								displayText: t("WithdrawalDetail.Undefine"),
								value: type.Undefine,
								data: []
							},
							...paymentList
						]}
						value={selPayment.type}
						onSelect={val => onSelect({ col: "type", val })}
					/>
					<div style={{ color: "red" }}>{selPayment?.tip}</div>
				</div>
			)}
			{selPayment.type?.data.length > 0 && (
				<div className="mb-3">
					<Dropdown
						title={t("WithdrawalDetail.SelectPay")}
						options={selPayment.type?.data}
						value={selPayment.pay}
						onSelect={val => onSelect({ col: "pay", val })}
					/>
				</div>
			)}
			<h6>{t("WithdrawalDetail.Remark")}</h6>
			<Form.Group
				className="mb-3"
				controlId="exampleForm.ControlTextarea1">
				<Form.Control
					as="textarea"
					rows={10}
					onChange={e => setText(e.target.value)}
				/>
			</Form.Group>
			{getBtnBar()}
		</div>
	);
};

WithdrawalDeailPopBox.propTypes = {
	custInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	transId: PropTypes.string.isRequired,
	getData: PropTypes.func.isRequired
};

export default WithdrawalDeailPopBox;
