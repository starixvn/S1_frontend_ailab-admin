import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import path from "../../path";

const defOptions = {
	csd: [
		{
			displayText: "VIP Log",
			path: path.memberInformation.sub.vipLog
		},
		{
			displayText: "Referral Log",
			path: "ReferralLog"
		},
		{
			displayText: "Internal Message Log",
			path: "InternalMessageLog"
		},
		{
			displayText: "External Message Log",
			path: "ExternalMessageLog"
		},
		{
			displayText: "Login Log",
			path: "LoginLog"
		},
		{
			displayText: "Member Audit Log",
			path: "MemberAuditLog"
		}
	],
	finance: [
		{
			displayText: "Deposit Log",
			path: "DepositLog"
		},
		{
			displayText: "Withdrawal Log",
			path: "WithdrawalLog"
		},
		{
			displayText: "Adjustment Log",
			path: "AdjustmentLog"
		},
		{
			displayText: "Fund Transfer Log",
			path: "FundTransferLog"
		},
		{
			displayText: "Transaction Log",
			path: "TransactionLog"
		},
		{
			displayText: "Bank Account Log",
			path: "BankAccountLog"
		},
		{
			displayText: "Crypto Account Log",
			path: "CryptoAccountLog"
		}
	],
	game: [
		{
			displayText: "Bet Summary",
			path: "BetSummary"
		},
		{
			displayText: "Bet Detail",
			path: "BetDetail"
		}
	],
	marketing: [
		{
			displayText: "Rebate Log",
			path: "RebateLog"
		},
		{
			displayText: "Bonus Wallet",
			path: "BonusWallet"
		},
		{
			displayText: "Bonus Log",
			path: "BonusLog"
		},
		{
			displayText: "VIP Rebate Log",
			path: "VIPRebateLog"
		},
		{
			displayText: "Promotion Log",
			path: "PromotionLog"
		}
	]
};

const NavBar = ({ custId }) => {
	const { t } = useTranslation();

	return (
		<nav className="navbar navbar-expand-lg bg-dark">
			<div className="container-fluid">
				<Link
					to={`/${path.memberInformation.root.replace(
						":id",
						custId
					)}`}>
					User Name
				</Link>
				<Dropdown
					t={t}
					title="CSD"
					icon="icon icon-admin"
					options={defOptions.csd}
					custId={custId}
				/>
				<Dropdown
					t={t}
					title="Finance"
					icon="icon icon-finance"
					options={defOptions.finance}
					custId={custId}
				/>
				<Dropdown
					t={t}
					title="Game"
					icon="icon icon-game"
					options={defOptions.game}
					custId={custId}
				/>
				<Dropdown
					t={t}
					title="Marketing"
					icon="icon icon-marketing"
					options={defOptions.marketing}
					custId={custId}
				/>
			</div>
		</nav>
	);
};

const Dropdown = ({ t, options = [], title, icon, custId }) => {
	const ref = useRef(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	const rows = options?.map(o => (
		<li key={o.displayText}>
			<Link
				className="dropdown-item"
				to={`/${path.memberInformation.root.replace(":id", custId)}/${
					o.path
				}`}>
				{o.displayKey ? t(o.displayKey) : o.displayText}
			</Link>
		</li>
	));

	const ClickDropdown = e => {
		e.preventDefault();
		setOpen(prev => !prev);
	};

	return (
		<div className="btn-group" ref={ref}>
			<button
				className={`btn dropdown-toggle${open ? " show" : ""}`}
				data-bs-toggle="dropdown"
				aria-expanded={open}
				onClick={ClickDropdown}>
				<span>
					<i className={icon} />
					<span>{title}</span>
				</span>
			</button>
			<ul className={`dropdown-menu${open ? " show" : ""}`}>{rows}</ul>
		</div>
	);
};

export { NavBar };
