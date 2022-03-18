import { useState, useEffect, useRef, useContext } from "react";
import { useAlert } from "react-alert";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dropdown from "../dropdown";
import InputBox from "../inputBox";
import { api_withdrawalKYC_Update } from "../../service/api/withdrawalKYC";
import { popBoxContext } from "../context";

const WithdrawalSettingPopBox = ({
	currencyName,
	amount,
	currencyId,
	siteId,
	getKYCList
}) => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const { setPopBox, confirm } = useContext(popBoxContext);
	const [inputAmount, setInputAmount] = useState(amount);
	const [tip, setTip] = useState("");
	const alert = useAlert();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const updateAmount = () => {
		const update = () => {
			api_withdrawalKYC_Update({
				siteId,
				currencyId,
				amount: inputAmount
			}).then(
				res => {
					if (!isMountedRef.current) return;
					const { errorCode, message } = res.data;
					if (errorCode === 0) {
						setPopBox({ isOpen: false });
						getKYCList();
						alert.success(t("PopBox.Success"));
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

		if (!inputAmount) {
			setTip(t("WithdrawalSetting.PleaseEnterAmount"));
		} else if (inputAmount !== amount) {
			confirm({
				content: <h4>{t("PopBox.AreYouSure")}</h4>,
				onOk() {
					update();
				}
			});
		}
	};

	const handleInputChange = e => {
		setInputAmount(e.target.value);
	};

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				updateAmount();
			}}>
			<div className="modal-body mb-5">
				<Dropdown
					title={t("WithdrawalSetting.Currency")}
					options={[currencyName]}
					disabled={true}
				/>
				<br />
				<InputBox
					className=""
					title={t("WithdrawalSetting.Amount")}
					value={inputAmount}
					onChange={handleInputChange}
				/>
				<span style={{ color: "red" }}>{tip}</span>
			</div>

			<div className="modal-footer">
				<button
					type="button"
					className="btn btn-secondary float-end mx-1"
					onClick={() => {
						setPopBox({ isOpen: false });
					}}>
					{t("PopBox.lbl_Cancel")}
				</button>
				<button
					type="submit"
					className="btn btn-primary float-end"
					disabled={amount === inputAmount}>
					{t("PopBox.lbl_Submit")}
				</button>
			</div>
		</form>
	);
};

WithdrawalSettingPopBox.defaultProps = {
	getKYCList: () => {}
};

WithdrawalSettingPopBox.propTypes = {
	currencyName: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	currencyId: PropTypes.number.isRequired,
	siteId: PropTypes.number.isRequired,
	getKYCList: PropTypes.func
};

export default WithdrawalSettingPopBox;
