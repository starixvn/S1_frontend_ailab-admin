import React, { useContext, lazy, Suspense } from "react";
import { popBoxContext } from "./context";

export const defPopBoxType = {
	default: "default",
	changePwd: "changePwd"
};

const PopBox = () => {
	const { popBox, setPopBox } = useContext(popBoxContext);

	const handlePopBox = () => {
		setPopBox({ isOpen: false });
	};

	let content = null;
	switch (popBox.popBoxType) {
		case defPopBoxType.changePwd: {
			const ChangePWD = lazy(() => import("./header/changePwd"));
			content = (
				<Suspense fallback={<div />}>
					<ChangePWD />
				</Suspense>
			);

			break;
		}
		default: {
			content = (
				<div className="modal-body">
					{popBox.content}
					{popBox.hasBtn ? popBox.btnBar : null}
				</div>
			);
			break;
		}
	}

	return (
		<div
			className={`modal fade${popBox.isOpen ? " show" : ""}`}
			id="exampleModalCenter"
			tabIndex="-1"
			aria-labelledby="exampleModalCenterTitle"
			style={{ display: `${popBox.isOpen ? "block" : "none"}` }}
			aria-hidden={!popBox.isOpen}
			aria-modal={popBox.isOpen}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
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
			</div>
		</div>
	);
};

export default PopBox;
