import React, { useContext, useEffect } from "react";
import "./Modal.scss";
import "./Modal-dark.scss";
import Backdrop from "../Backdrop";
import Portal from "@/components/layout/Portal";

import { FaTimes } from "react-icons/fa";

import { ModalContext, ModalActionType } from "@/context/ModalContext";

const Modal: React.FC = () => {
  const {
    modalState: { show, title, render, size },
    modalDispatch,
  } = useContext(ModalContext);

  useEffect(() => {
    const escKeyDown = (e: any) => {
      if (e.code === "Escape") modalDispatch({ type: ModalActionType.CLOSE });
    };
    document.addEventListener("keydown", escKeyDown, false);
    return () => {
      document.removeEventListener("keydown", escKeyDown);
    };
  }, [modalDispatch]);

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
                <FaTimes
                  role="button"
                  aria-label="Close"
                  tabIndex={0}
                  onClick={closeModal}
                  className="modal__header__close-icon"
                />
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
