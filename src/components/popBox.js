import React, { useContext, lazy, Suspense, useMemo } from "react";

import { popBoxContext } from "./context";
import { ModalConfirm } from "./Modal/modalConfirm";

export const defPopBoxType = {
	default: "default",
	changePwd: "changePwd",
	tagPopBox: "tagPopBox",
	withdrawalSetting: "withdrawalSetting",
	addAdjPopBox: "addAdjPopBox",
	addBatchAdjPopBox: "addBatchAdjPopBox",
	csdAddPersonalMessage: "csdAddPersonalMessage",
	csdRegistrationManagementEditStatus: "csdRegistrationManagementEditStatus",
	csdRegistrationManagementAddNotes: "csdRegistrationManagementAddNotes",
	csdRegistrationManagementNotesTable: "csdRegistrationManagementNotesTable",
	csdBetLimitAddLimit: "csdBetLimitAddLimit",
	withdrawalDetail: "withdrawalDetail",
	financeDepsoitProcess: "financeDepsoitProcess",
	financeDepsoitAdjAmount: "financeDepsoitAdjAmount",
	financeWithdrawalLimitAdjustAddModal:
		"financeWithdrawalLimitAdjustAddModal",
	memberDetailReasonModal: "memberDetailReasonModal",
	memberDetailEditProfileModal: "memberDetailEditProfileModal",
	editWithdrawalLimitPopBox: "editWithdrawalLimitPopBox",
	addWithdrawalLimitPopBox: "addWithdrawalLimitPopBox"
};

const PopBox = () => {
	const { popBox, setPopBox, conformPopBox } = useContext(popBoxContext);

	const handlePopBox = () => {
		if (popBox.handleClose) {
			popBox.handleClose();
		} else {
			setPopBox({ isOpen: false });
		}
	};

	const content = useMemo(() => {
		let _content = null;
		switch (popBox.popBoxType) {
			case defPopBoxType.changePwd: {
				const ChangePWD = lazy(() => import("./header/changePwd"));
				_content = (
					<Suspense fallback={<div />}>
						<ChangePWD />
					</Suspense>
				);

				break;
			}
			case defPopBoxType.withdrawalSetting: {
				const WithdrawalSettingPopBox = lazy(() =>
					import(
						"../components/withdrawalSetting/withdrawalSetting.popBox"
					)
				);
				_content = (
					<Suspense fallback={<div />}>
						<WithdrawalSettingPopBox {...popBox.params} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.addAdjPopBox: {
				const AddAdjPopBox = lazy(() =>
					import("./finance/adjustmentListing/addAdjPopBox")
				);
				_content = (
					<Suspense fallback={<div />}>
						<AddAdjPopBox refresh={popBox.refresh} />
					</Suspense>
				);

				break;
			}
			case defPopBoxType.addBatchAdjPopBox: {
				const AddBatchAdjPopBox = lazy(() =>
					import("./finance/adjustmentListing/addBatchAdjPopBox")
				);
				_content = (
					<Suspense fallback={<div />}>
						<AddBatchAdjPopBox refresh={popBox.refresh} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.csdAddPersonalMessage: {
				const ModalAddPersonalMessage = lazy(() =>
					import(
						"../pages/csd/PersonalMessage/Modal/ModalAddPersonalMessage"
					)
				);

				_content = (
					<Suspense fallback={<div />}>
						<ModalAddPersonalMessage popBoxData={popBox.data} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.csdRegistrationManagementEditStatus: {
				const RegistrationManagementModalEditStatus = lazy(() =>
					import(
						"../pages/csd/RegistrationManagement/Modal/ModalEditStatus"
					)
				);

				_content = (
					<Suspense fallback={<div />}>
						<RegistrationManagementModalEditStatus
							popBoxData={popBox.data}
						/>
					</Suspense>
				);

				break;
			}

			case defPopBoxType.csdRegistrationManagementAddNotes: {
				const RegistrationManagementAddNotes = lazy(() =>
					import(
						"../pages/csd/RegistrationManagement/Modal/ModalAddNotes"
					)
				);

				_content = (
					<Suspense fallback={<div />}>
						<RegistrationManagementAddNotes
							popBoxData={popBox.data}
						/>
					</Suspense>
				);

				break;
			}

			case defPopBoxType.csdRegistrationManagementNotesTable: {
				const RegistrationManagementNotesTable = lazy(() =>
					import(
						"../pages/csd/RegistrationManagement/Modal/ModalNotesTable"
					)
				);

				_content = (
					<Suspense fallback={<div />}>
						<RegistrationManagementNotesTable
							popBoxData={popBox.data}
						/>
					</Suspense>
				);

				break;
			}

			case defPopBoxType.csdBetLimitAddLimit: {
				const BetLimitModalAddBetLimit = lazy(() =>
					import("../pages/csd/BetLimit/Modal/ModalAddBetLimit")
				);

				_content = (
					<Suspense fallback={<div />}>
						<BetLimitModalAddBetLimit popBoxData={popBox.data} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.financeWithdrawalLimitAdjustAddModal: {
				const Modal = lazy(() =>
					import(
						"../pages/finance/WithdrawableAdjustment/Modal/ModalAddWithdrawalAdjust.js"
					)
				);

				_content = (
					<Suspense fallback={<div />}>
						<Modal popBoxData={popBox.data} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.tagPopBox: {
				const TagPopBox = lazy(() =>
					import("./tagManagement/tagPopBox")
				);
				_content = (
					<Suspense fallback={<div />}>
						<TagPopBox
							tagData={popBox.tagData}
							refresh={popBox.refresh}
						/>
					</Suspense>
				);

				break;
			}

			case defPopBoxType.withdrawalDetail: {
				const WithdrawalDetailPopBox = lazy(() =>
					import(
						"../components/finance/withdrawalListing/withdrawalDetail.popBox"
					)
				);
				_content = (
					<Suspense fallback={<div />}>
						<WithdrawalDetailPopBox
							custInfo={popBox.custInfo}
							transId={popBox.transId}
							getData={popBox.getData}
						/>
					</Suspense>
				);

				break;
			}
			case defPopBoxType.financeDepsoitProcess: {
				const Component = lazy(() =>
					import("./finance/depositListing/depositProcessPopBox")
				);

				_content = (
					<Suspense fallback={<div />}>
						<Component popBoxData={popBox.data} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.financeDepsoitAdjAmount: {
				const Component = lazy(() =>
					import("./finance/depositListing/adjustAmountPopBox")
				);

				_content = (
					<Suspense fallback={<div />}>
						<Component popBoxData={popBox.data} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.memberDetailReasonModal: {
				const Component = lazy(() =>
					import("./memberDetail/reasonPopBox")
				);

				_content = (
					<Suspense fallback={<div />}>
						<Component onUpdate={popBox.onUpdate} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.memberDetailEditProfileModal: {
				const Component = lazy(() =>
					import("./memberDetail/editProfilePopBox")
				);

				_content = (
					<Suspense fallback={<div />}>
						<Component onUpdate={popBox.onUpdate} />
					</Suspense>
				);

				break;
			}

			case defPopBoxType.addWithdrawalLimitPopBox: {
				const Component = lazy(() =>
					import(
						"./finance/withdrawalLimitManagement/addWithdrawalLimitPopBox"
					)
				);

				_content = (
					<Suspense fallback={<div />}>
						<Component
							currencyList={popBox.currencyList}
							refresh={popBox.refresh}
						/>
					</Suspense>
				);

				break;
			}

			case defPopBoxType.editWithdrawalLimitPopBox: {
				const Component = lazy(() =>
					import(
						"./finance/withdrawalLimitManagement/editWithdrawalLimitPopBox"
					)
				);
				console.log(popBox.limitData);
				_content = (
					<Suspense fallback={<div />}>
						<Component
							limitData={popBox.limitData}
							currencyList={popBox.currencyList}
							refresh={popBox.refresh}
						/>
					</Suspense>
				);

				break;
			}

			default: {
				_content = (
					<div className="modal-body">
						{popBox.content}
						{popBox.hasBtn ? popBox.btnBar : null}
					</div>
				);
				break;
			}
		}

		return _content;
	}, [popBox.popBoxType, popBox.content]);

	return (
		<div
			className={`modal fade${
				popBox.isOpen || conformPopBox.isOpen ? " show" : ""
			} modal-level-1`}
			id="exampleModalCenter"
			tabIndex="-1"
			aria-labelledby="exampleModalCenterTitle"
			style={{
				display: `${
					popBox.isOpen || conformPopBox.isOpen ? "block" : "none"
				}`
			}}
			aria-hidden={!popBox.isOpen || conformPopBox.isOpen}
			aria-modal={popBox.isOpen || conformPopBox.isOpen}>
			<div className="modal-dialog modal-dialog-centered">
				<div
					className="modal-content"
					style={{
						visibility: !conformPopBox.isOpen
							? "visible"
							: "hidden",
						position: "absolute"
					}}>
					<div className="modal-header">
						<h5
							className="modal-title"
							id="exampleModalCenterTitle">
							{popBox.title}
						</h5>
						{popBox.hideClosingBtn ? null : (
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={handlePopBox}
							/>
						)}
					</div>
					{content}
				</div>

				<div
					className="modal-content"
					style={{
						visibility: conformPopBox.isOpen ? "visible" : "hidden",
						position: "absolute"
					}}>
					<ModalConfirm />
				</div>
			</div>
		</div>
	);
};

export default PopBox;
