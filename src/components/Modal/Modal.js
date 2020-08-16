import React, { useContext } from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";
import CloseIcon from "@material-ui/icons/Close";
import { ModalContext } from "context/ModalContext";
import Portal from "HOC/Portal";

const Modal = () => {
	const [modalState, modalDispatch] = useContext(ModalContext);

	const closeModal = () => {
		modalDispatch({ type: "CLOSE" });
	};

	if (modalState.show) {
		return (
			<Portal mountTo="root-modal">
				<>
					<div className="modal-container">
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
