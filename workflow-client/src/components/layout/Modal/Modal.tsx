import React, { useContext, useEffect } from "react";

import { IModalProps } from "./types";

import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { ModalContext, ModalActionType } from "@/context/ModalContext";

import Portal from "@/components/layout/Portal";

import "./Modal-dark.scss";
import "./Modal.scss";

import Backdrop from "../Backdrop";

const Modal: React.FC<React.PropsWithChildren<IModalProps>> = ({
  show,
  title,
  children,
  size,
  onClose,
}) => {
  // const {
  //   modalState: { show, title, render, size },
  //   modalDispatch,
  // } = useContext(ModalContext);
  const lcoation = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const escKeyDown = (e: any) => {
  //     if (e.code === "Escape") modalDispatch({ type: ModalActionType.CLOSE });
  //   };
  //   document.addEventListener("keydown", escKeyDown, false);
  //   return () => {
  //     document.removeEventListener("keydown", escKeyDown);
  //   };
  // }, [modalDispatch]);

  const closeModal = () => {
    // modalDispatch({ type: ModalActionType.CLOSE });
    // FIXME after refacor
    // if(lcoation.hash.includes("#login")) {
    //   navigate("/")
    // }
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
                  onClick={onClose}
                  className="modal__header__close-icon"
                />
              </header>
              <section className="modal__content scrollbar">{children}</section>
            </aside>
          </div>
          <Backdrop show={show} clicked={onClose} />
        </>
      </Portal>
    );
  }
  return null;
};

export default Modal;
