import React, { useContext } from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";
import CloseIcon from "@material-ui/icons/Close";
import { ModalContext } from "context/ModalContext";
import { UserContext } from "context/UserContext";
import Portal from "HOC/Portal";

const Modal = () => {
	const [modalState, modalDispatch] = useContext(ModalContext);
	const [{theme}] = useContext(UserContext);

	const closeModal = () => {
		modalDispatch({ type: "CLOSE" });
	};

	const bodyElement = document.getElementsByTagName("body")[0];

	if (modalState.show) {
		bodyElement.style.overflowY = "hidden";
		window.scrollTo(0, 0);
	} else bodyElement.style.overflowY = "auto";

	if (modalState.show) {
		return (
			<Portal mountTo="root-modal">
				<>
					<div className={`modal-container ${theme ? "theme-light": "theme-dark"}`}>
						<div className={modalState.show ? "modal  modal-open" : "modal"}>
							<div className="modal-header">
								<h2 className="modal-title">{modalState.title}</h2>
								<CloseIcon onClick={closeModal} className="close" />
							</div>
							<div className="modal-body">{modalState.render}</div>
						</div>
					</div>
					<Backdrop show={modalState.show} clicked={closeModal} />
				</>
			</Portal>
		);
	}
	return null;
};

export default Modal;
