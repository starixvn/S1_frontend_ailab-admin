import { useEffect, useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAlert } from "react-alert";
import { InputGroup, FormControl } from "react-bootstrap";
import { FileEarmarkArrowDown } from "react-bootstrap-icons";
import { popBoxContext, allSiteListContext } from "../../components/context";
import { useHandlePage } from "../../hook";
import { ButtonWithLoading } from "../../components";
import { defPopBoxType } from "../../components/popBox";
import { api_vipLevel_ChangeVipLevelBatch } from "../../service/api/vipLevel";
import Layout from "../../components/layout";
import { Pagination } from "../../components/pagination";

const ChangeVIPLevel = () => {
	const { t } = useTranslation();
	const alert = useAlert();
	const { setPopBox } = useContext(popBoxContext);
	const { siteId } = useContext(allSiteListContext);
	const isMountedRef = useRef(null);
	const [file, setFile] = useState();
	const [tip, setTip] = useState("");
	const [result, setResult] = useState([]);

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

	const clickSubmit = () => {
		if (file) {
			const upload = () => {
				const formData = new FormData();
				formData.append("ExcelUpload", file);
				formData.append("SiteId", siteId);

				api_vipLevel_ChangeVipLevelBatch(formData).then(
					res => {
						if (!isMountedRef.current) return;

						setResult(res.data);
						setPopBox({ isOpen: false });
					},
					() => {
						if (!isMountedRef.current) return;
						alert.error(t("Error.DefaultError"));
					}
				);
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.default,
				content: <h3>{t("PopBox.AreYouSure")}</h3>,
				hasBtn: true,
				btnBar: (
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-success float-end"
							onClick={upload}>
							{t("PopBox.Yes")}
						</button>
						<button
							type="button"
							className="btn btn-danger float-end mx-1"
							onClick={() => {
								setPopBox({ isOpen: false });
							}}>
							{t("PopBox.lbl_Cancel")}
						</button>
					</div>
				)
			});
		} else {
			setTip(t("ChangeVipLevel.UploadFileIsRequired"));
		}
	};

	const arr = result?.map((el, i) => {
		const textArr = el.message.split(".");
		const userName = textArr[1].replace(" Username: ", "");
		const sabaId = textArr[2].replace(" SabaId: ", "");
		return (
			<tr key={`ChangeVipLevel-${el.message}`}>
				<th>{i + 1}</th>
				<td>{textArr[0]}</td>
				<td>{userName}</td>
				<td>{sabaId}</td>
				<td>{el.errorCode}</td>
				<td>{el.message}</td>
			</tr>
		);
	});

	return (
		<Layout afterLogin={true}>
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<h2>{t("Menu.CSD.ChangeVipLevel")}</h2>
				<div className="bd-example">
					<div className="row">
						<div className="col-md-6 mb-5">
							<h5>
								{t("ChangeVipLevel.UploadFile")}
								<span style={{ color: "red" }}>*</span>
							</h5>
							<InputGroup>
								<FormControl
									type="file"
									accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
									onChange={e => {
										setFile(e.target.files[0]);
										setTip("");
									}}
									placeholder="Recipient's username"
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
								/>
								<a
									role="button"
									href="../../../resource/exampleFile/ChangeVipLevelTemplateFile.xlsx"
									download="ChangeVipLevelTemplateFile.xlsx">
									<ButtonWithLoading
										tooltip={t(
											"ChangeVipLevel.DownloadTemplate"
										)}>
										<FileEarmarkArrowDown />
									</ButtonWithLoading>
								</a>
							</InputGroup>
							<div style={{ color: "red" }}>{tip}</div>
						</div>
					</div>
					<button
						type="button"
						className="btn btn-primary float-end"
						onClick={e => {
							e.preventDefault();
							clickSubmit();
						}}>
						{t("ChangeVipLevel.Submit")}
					</button>
				</div>

				{result.length > 0 && (
					<div className="bd-example">
						<div className="table-responsive">
							<Pagination
								t={t}
								currentPage={currentPage}
								totalPages={1}
								rowCount={result?.length}
								pageSize={pageSize}
								clickPageNumber={clickPageNumber}
								onSelectEntry={onSelectEntry}>
								<table className="table table-striped table-hover">
									<thead className="table-dark">
										<tr>
											<th scope="col">#</th>
											<th scope="col">
												{t("ChangeVipLevel.Status")}
											</th>
											<th scope="col">
												{t("ChangeVipLevel.MemberCode")}
											</th>
											<th scope="col">
												{t("ChangeVipLevel.SabaId")}
											</th>
											<th scope="col">
												{t("ChangeVipLevel.ErrorCode")}
											</th>
											<th scope="col">
												{t("ChangeVipLevel.Message")}
											</th>
										</tr>
									</thead>
									<tbody>{arr}</tbody>
								</table>
							</Pagination>
						</div>
					</div>
				)}
			</main>
		</Layout>
	);
};

export default ChangeVIPLevel;
