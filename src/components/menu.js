import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FeatherIcon from "feather-icons-react";
import { toggleSideMenuContext } from "../context";

const Menu = () => {
	const { t } = useTranslation();
	const { collapse } = useContext(toggleSideMenuContext);
	const [showArea, setShowArea] = useState([]);
	const areaHandler = ({ area }) => {
		if (showArea.includes(area)) {
			setShowArea(prev => prev.filter(el => el !== area));
		} else {
			setShowArea(prev => [...prev, area]);
		}
	};
	return (
		<nav
			id="sidebarMenu"
			className={`col-md-3 col-lg-2 bg-light sidebar collapse${
				collapse === true ? "" : " show"
			}`}>
			<div className="position-sticky pt-3">
				<div
					className="accordion accordion-flush"
					id="accordionFlushExample">
					<div className="accordion-item">
						<button
							onClick={() => areaHandler({ area: "reports" })}
							className={`accordion-button${
								showArea.includes("reports") ? "" : " collapsed"
							}`}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#Reports"
							aria-expanded={showArea.includes("reports")}
							aria-controls="Reports">
							<FeatherIcon icon="file-text" />
							{t("Reports.lbl_Reports")}
						</button>
						<div
							id="Reports"
							className={`accordion-collapse collapse${
								showArea.includes("reports") ? " show" : ""
							}`}
							aria-labelledby="flush-headingOne"
							data-bs-parent="#accordionFlushExample">
							<Link className="nav-link" to="/Report/LicWinLost">
								{t("Reports.lbl_WinLost")}{" "}
								{t("Reports.lbl_Report")}
							</Link>
							<Link
								className="nav-link"
								to="/Report/MainFinancialReport">
								{t("Reports.lbl_MainFinancial")}{" "}
								{t("Reports.lbl_Report")}
							</Link>
							<Link
								className="nav-link"
								to="/Report/DepositReport">
								{t("Reports.lbl_Deposit")}{" "}
								{t("Reports.lbl_Report")}
							</Link>
							<Link
								className="nav-link"
								to="/Report/StatisticalReport">
								{t("Reports.lbl_Statistical")}{" "}
								{t("Reports.lbl_Report")}
							</Link>
							<Link
								className="nav-link"
								to="/Report/CustomerStatisticalReport">
								{t("Reports.lbl_Customer")}{" "}
								{t("Reports.lbl_Statistical")}{" "}
								{t("Reports.lbl_Report")}
							</Link>
							<Link
								className="nav-link"
								to="/Report/UserOnlineReport">
								{t("Reports.lbl_UserOnline")}
							</Link>
						</div>
					</div>
					<div className="accordion-item">
						<button
							onClick={() => areaHandler({ area: "CSD" })}
							className={`accordion-button${
								showArea.includes("CSD") ? "" : " collapsed"
							}`}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#CSD"
							aria-expanded={showArea.includes("CSD")}
							aria-controls="CSD">
							<FeatherIcon icon="briefcase" />
							{t("CSD.lbl_CSD")}
						</button>
						<div
							id="CSD"
							className={`accordion-collapse collapse${
								showArea.includes("CSD") ? " show" : ""
							}`}
							aria-labelledby="flush-headingTwo"
							data-bs-parent="#accordionFlushExample">
							<Link
								className="nav-link"
								to="/CustManage/CustInfoList">
								{t("CSD.lbl_CustomerAdministration")}
							</Link>
							<Link
								className="nav-link"
								to="/Message/Announcement">
								{t("CSD.lbl_Announcement")}
							</Link>
							<Link
								className="nav-link"
								to="/Message/PersonalMsgBatch">
								{t("CSD.lbl_PersonalMsgBatch")}
							</Link>
							<Link
								className="nav-link"
								to="/Message/ChangeVipLevelBatch">
								{t("CSD.lbl_ChangeVipLevel")}
							</Link>
							<Link
								className="nav-link"
								to="/Message/WithdrawalKYCControl">
								{t("CSD.lbl_WithdrawalKYC")}
							</Link>
							<Link className="nav-link" to="/CustManage/TeleCSD">
								{t("CSD.lbl_TeleCSD")}
							</Link>
						</div>
					</div>
					<div className="accordion-item">
						<button
							onClick={() => areaHandler({ area: "Finance" })}
							className={`accordion-button${
								showArea.includes("Finance") ? "" : " collapsed"
							}`}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#Finance"
							aria-expanded={showArea.includes("Finance")}
							aria-controls="Finance">
							<FeatherIcon icon="dollar-sign" />
							{t("Finance.lbl_Finance")}
						</button>
						<div
							id="Finance"
							className={`accordion-collapse collapse${
								showArea.includes("Finance") ? " show" : ""
							}`}
							aria-labelledby="flush-headingTwo"
							data-bs-parent="#accordionFlushExample">
							<Link
								className="nav-link"
								to="/Finance/BankInfoList">
								{t("Finance.lbl_BankInfoList")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/DepositList">
								{t("Finance.lbl_DepositList")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/WithdrawalList">
								{t("Finance.lbl_WithdrawalList")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/BalanceAdjustment">
								{t("Finance.lbl_BalanceAdjustment")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/BalanceAdjustmentBatch">
								{t("Finance.lbl_BalanceAdjustmentBatch")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/WithdrawalLimitAdjust">
								{t("Finance.lbl_WithdrawalLimitAdjust")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/PaymentAdjustmentReport">
								{t("Finance.lbl_PaymentAdjustmentReport")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/PaymentManage">
								{t("Finance.lbl_PaymentManage")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/DepositLimitManagement">
								{t("Finance.lbl_DepositLimitManagement")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/ThirdPartyAdjustment">
								{t("Finance.lbl_ThirdPartyAdjustment")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/DepositSubmission">
								{t("Finance.lbl_DepositSubmission")}
							</Link>
							<Link
								className="nav-link"
								to="/Finance/WithdrawalLimitManage">
								{t("Finance.lbl_WithdrawalLimitManage")}
							</Link>
						</div>
					</div>
					<div className="accordion-item">
						<button
							onClick={() =>
								areaHandler({ area: "Administration" })
							}
							className={`accordion-button${
								showArea.includes("Administration")
									? ""
									: " collapsed"
							}`}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#Administration"
							aria-expanded={showArea.includes("Administration")}
							aria-controls="Administration">
							<FeatherIcon icon="user" />
							{t("Administration.lbl_Administration")}
						</button>
						<div
							id="Administration"
							className={`accordion-collapse collapse${
								showArea.includes("Administration")
									? " show"
									: ""
							}`}
							aria-labelledby="flush-headingOne"
							data-bs-parent="#accordionFlushExample">
							<Link
								className="nav-link"
								to="/Admin/GroupAuthoritySetting">
								{t("Administration.lbl_GroupAuthoritySetting")}
							</Link>
							<Link
								className="nav-link"
								to="/Admin/UserAuthoritySetting">
								{t("Administration.lbl_UserAuthoritySetting")}
							</Link>
						</div>
					</div>
					<div className="accordion-item">
						<button
							onClick={() => areaHandler({ area: "Marketing" })}
							className={`accordion-button${
								showArea.includes("Marketing")
									? ""
									: " collapsed"
							}`}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#Marketing"
							aria-expanded={showArea.includes("Marketing")}
							aria-controls="Marketing">
							<FeatherIcon icon="activity" />
							{t("Marketing.lbl_Marketing")}
						</button>
						<div
							id="Marketing"
							className={`accordion-collapse collapse${
								showArea.includes("Marketing") ? " show" : ""
							}`}
							aria-labelledby="flush-headingOne"
							data-bs-parent="#accordionFlushExample">
							<Link
								className="nav-link"
								to="/Admin/GroupAuthoritySetting">
								{t("Marketing.lbl_GroupAuthoritySetting")}
							</Link>
							<Link
								className="nav-link"
								to="/Admin/UserAuthoritySetting">
								{t("Marketing.lbl_GroupAuthoritySetting")}
							</Link>
						</div>
					</div>
					<div className="accordion-item">
						<button
							onClick={() =>
								areaHandler({ area: "BankTransfer" })
							}
							className={`accordion-button${
								showArea.includes("BankTransfer")
									? ""
									: " collapsed"
							}`}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#BankTransfer"
							aria-expanded={showArea.includes("BankTransfer")}
							aria-controls="BankTransfer">
							<FeatherIcon icon="dollar-sign" />
							{t("BankTransfer.lbl_BankTransfer")}
						</button>
						<div
							id="BankTransfer"
							className={`accordion-collapse collapse${
								showArea.includes("BankTransfer") ? " show" : ""
							}`}
							aria-labelledby="flush-headingOne"
							data-bs-parent="#accordionFlushExample">
							<Link
								className="nav-link"
								to="/BankFinancial/TransferAccountManage">
								{t("BankTransfer.lbl_TransferAccountManage")}
							</Link>
							<Link
								className="nav-link"
								to="/BankFinancial/TransferManage">
								{t("BankTransfer.lbl_TransferManage")}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Menu;
