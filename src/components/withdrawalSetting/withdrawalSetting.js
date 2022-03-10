import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import { popBoxContext, allSiteListContext } from "../context";
import { useGetCurrencyData, useHandlePage } from "../../hook";
import { api_withdrawalKYC_GetList } from "../../service/api/withdrawalKYC";
import { Pagination } from "../pagination";
import { number_format } from "../common";
import { defPopBoxType } from "../popBox";
import { ButtonWithLoading, Loading } from "..";

const WithdrawalSetting = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { siteId } = useContext(allSiteListContext);
	const [KYCList, setKYCList] = useState([]);
	const [loading, setLoading] = useState(false);
	const { getCurrencyName } = useGetCurrencyData({ singleMapping: true });
	const {
		currentPage,
		pageSize,
		clickPageNumber,
		onSelectEntry
	} = useHandlePage({ callback: () => {} });

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getKYCList = () => {
		setLoading(true);
		api_withdrawalKYC_GetList(siteId).then(
			res => {
				if (!isMountedRef.current) return;

				const { errorCode, data, message } = res.data;
				if (errorCode === 0) {
					setKYCList(data);
				} else {
					alert.error(message || `[${errorCode}] error`);
				}
				setLoading(false);
			},
			() => {
				if (!isMountedRef.current) return;
				alert.error(t("Error.DefaultError"));
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		if (siteId) {
			getKYCList();
		}
	}, [siteId]);

	const openPopBox = (currencyName, amount, currencyId) => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.withdrawalSetting,
			title: t("WithdrawalSetting.Edit"),
			params: {
				currencyName,
				amount,
				currencyId,
				siteId,
				getKYCList
			}
		});
	};

	const arr = KYCList.map((el, i) => {
		const { currencyId, amount } = el;
		const currencyName = getCurrencyName(currencyId);

		return (
			<tr key={`KYC-${currencyId}`}>
				<th>{i + 1}</th>
				<td>
					<button
						type="button"
						className="btn btn-primary btn-sm"
						onClick={() =>
							openPopBox(currencyName, amount, currencyId)
						}>
						<i className="icon icon-edit" />
					</button>
				</td>
				<td>{currencyName}</td>
				<td>{number_format(amount)}</td>
			</tr>
		);
	});

	return (
		<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
			<h2>{t("WithdrawalSetting.WithdrawalSetting")}</h2>

			<div className="bd-example">
				<ButtonWithLoading
					className="float-end my-4"
					loading={loading}
					onClick={getKYCList}>
					{t("WithdrawalSetting.Refresh")}
				</ButtonWithLoading>
			</div>

			<div className="bd-example">
				<div className="table-responsive">
					{loading && <Loading />}
					<Pagination
						t={t}
						currentPage={currentPage}
						totalPages={1}
						rowCount={KYCList.length}
						pageSize={pageSize}
						clickPageNumber={clickPageNumber}
						onSelectEntry={onSelectEntry}>
						<table className="table table-striped table-hover">
							<thead className="table-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">
										{t("WithdrawalSetting.Action")}
									</th>
									<th scope="col">
										{t("WithdrawalSetting.Currency")}
									</th>
									<th scope="col">
										{t("WithdrawalSetting.Amount")}
									</th>
								</tr>
							</thead>
							<tbody>{arr}</tbody>
						</table>
					</Pagination>
				</div>
			</div>
		</main>
	);
};

export default WithdrawalSetting;
