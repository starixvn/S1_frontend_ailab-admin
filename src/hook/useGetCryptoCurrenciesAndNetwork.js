import { useState, useEffect } from "react";
import { api_getAllData_GetCryptoInfoData } from "../service/api/getAllData";

const useGetCryptoCurrenciesAndNetwork = ({ setInitValue }) => {
	const [cryptoData, setCryptoData] = useState(null);
	const { setSelNetWork, setSelCrypto } = setInitValue;
	useEffect(() => {
		const getCurrencyData = async () => {
			try {
				const res = await api_getAllData_GetCryptoInfoData();

				if (res.data.errorCode === 0) {
					const { data } = res.data;
					setCryptoData(() => ({
						cryptoCurrency: data.cryptoCurrency.map(el => ({
							value: el.currencyId,
							displayText: el.currencyName
						})),
						cryptoNetwork: data.cryptoNetwork.map(el => ({
							value: el.networkType,
							currencyId: el.currencyId,
							displayText: el.network
						}))
					}));
				}
			} catch (error) {
				console.error();
			}
		};

		getCurrencyData();
	}, []);

	useEffect(() => {
		if (cryptoData) {
			setSelCrypto(cryptoData.cryptoCurrency[0]);
			setSelNetWork(
				cryptoData.cryptoNetwork.find(
					network =>
						network.currencyId ===
						cryptoData.cryptoCurrency[0].value
				)
			);
		}
	}, [cryptoData]);

	return { cryptoData };
};

export { useGetCryptoCurrenciesAndNetwork };
