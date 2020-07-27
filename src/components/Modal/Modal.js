import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";
import CloseIcon from '@material-ui/icons/Close';
import { ModalContext } from "context/ModalContext";

const Modal = () => {
  const [modalState, modalDispatch] = useContext(ModalContext);

  const closeModal = () => {
    modalDispatch({type: "CLOSE" });
  }

  if(modalState.show){
    return ReactDOM.createPortal(
      <>
        <div className="modal-container">
          <div className={modalState.show ? "modal  modal-open" : "modal"}>
            <div className="modal-header">
              <h2 className="modal-title">{modalState.title}</h2>
              <CloseIcon onClick={closeModal} className="close" />
            </div>
            <div className="modal-body">
              {modalState.render}
            </div>
          </div>
        </div>
        <Backdrop show={modalState.show} clicked={closeModal} />
      </>,
      document.getElementById("root-modal")
    )
  }
  return null;
};

export default Modal;