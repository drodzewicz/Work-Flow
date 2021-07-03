import React, { useContext } from "react";
import "./Modal.scss";
import "./Modal-dark.scss";
import Backdrop from "../Backdrop";
import Portal from "HOC/Portal";

import CloseIcon from "@material-ui/icons/Close";

import { ModalContext, ModalActionType } from "context/ModalContext";

const Modal: React.FC = () => {
  const {
    modalState: { show, title, render, size },
    modalDispatch,
  } = useContext(ModalContext);

  const closeModal = () => {
    modalDispatch({ type: ModalActionType.CLOSE });
  };

  if (show) {
    return (
      <Portal mountTo="root-modal">
        <>
          <div className="modal-wrapper">
            <aside className={`modal size-${size}`}>
              <header className="modal__header">
                <h2 className="modal__header__title">{title}</h2>
                <CloseIcon onClick={closeModal} className="modal__header__close-icon" />
              </header>
              <section className="modal__content scrollbar">{render}</section>
            </aside>
          </div>
          <Backdrop show={show} clicked={closeModal} />
        </>
      </Portal>
    );
  }
  return null;
};

export default Modal;
