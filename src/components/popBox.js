import React, { useContext, lazy, Suspense, useMemo } from "react";

import { popBoxContext } from "./context";
import { ModalConfirm } from "./Modal/modalConfirm";

export const defPopBoxType = {
	default: "default",
	changePwd: "changePwd",
	tagPopBox: "tagPopBox",
	csdAddPersonalMessage: "csdAddPersonalMessage",
	csdRegistrationManagementEditStatus: "csdRegistrationManagementEditStatus",
	csdRegistrationManagementAddNotes: "csdRegistrationManagementAddNotes",
	csdRegistrationManagementNotesTable: "csdRegistrationManagementNotesTable"
};

const PopBox = () => {
	const { popBox, setPopBox, conformPopBox } = useContext(popBoxContext);

	const handlePopBox = () => {
		setPopBox({ isOpen: false });
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

			case defPopBoxType.csdAddPersonalMessage: {
				const ModalAddPersonalMessage = lazy(() =>
					import(
						"../pages/csd/PersonalMessage/ModalAddPersonalMessage"
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
	}, [popBox.popBoxType]);

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
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={handlePopBox}
						/>
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
