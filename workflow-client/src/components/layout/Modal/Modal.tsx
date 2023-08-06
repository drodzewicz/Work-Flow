import React from "react";

import { IModalProps } from "./types";

import { FaTimes } from "react-icons/fa";

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
