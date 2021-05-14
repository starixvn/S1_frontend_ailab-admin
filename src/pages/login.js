import { useTranslation } from "react-i18next";

const Index = () => {
	const { t } = useTranslation();
	return <h1>{t("Common.lbl_Login")}</h1>;
};

export default Index;
