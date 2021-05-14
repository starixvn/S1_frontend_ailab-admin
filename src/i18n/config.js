import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { siteInfo } from "../config";
import en from "./en.json";

const resources = {
	en: { translations: en }
};

i18next.use(initReactI18next).init({
	lng: siteInfo.defaultLang,
	fallbackLng: siteInfo.defaultLang,
	debug: process.env.NODE_ENV === "development",
	supportedLngs: siteInfo.langList,
	interpolation: {
		escapeValue: false
	},
	// transSupportBasicHtmlNodes: true,
	// transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
	resources,
	defaultNS: "translations",
	react: {
		wait: true
	}
});

export default i18next;
