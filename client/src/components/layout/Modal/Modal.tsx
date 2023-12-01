import React from "react";

import { FaTimes } from "react-icons/fa";

import Portal from "@/components/layout/Portal";

import "./Modal.scss";

import Backdrop from "../Backdrop";

export type IModalProps = {
  show: boolean;
  title: string;
  scrollable?: boolean;
  onClose: () => void;
  size: "s" | "m" | "l";
};

const Modal: React.FC<React.PropsWithChildren<IModalProps>> = ({
  show,
  title,
  children,
  size,
  scrollable = false,
  onClose,
}) => {
  if (show) {
    return (
      <Portal mountTo="root-modal">
        <>
          <div className="modal-wrapper">
            <aside className={`modal modal_size--${size}`}>
              <header className="modal__header">
                <h2 className="modal__header__title">{title}</h2>
                <FaTimes
                  role="button"
                  aria-label="Close"
                  tabIndex={0}
                  onClick={onClose}
                  className="modal__header__close"
                />
              </header>
              <section
                className={`modal__content scrollbar ${
                  scrollable ? "modal__content--scrollable" : ""
                }`}
              >
                {children}
              </section>
            </aside>
          </div>
          <Backdrop show={show} onClick={onClose} />
        </>
      </Portal>
    );
  }
  return null;
};

export default Modal;
