import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";
import CloseIcon from '@material-ui/icons/Close';
import { ModalContext } from "context/ModalContext";


const Modal = () => {
  const [renderComp, setRenderComp] = useContext(ModalContext);

  const closeModal = () => {
    setRenderComp({ render: null, show: false });
  }

  if(renderComp.show){
    return ReactDOM.createPortal(
      <>
        <div className="modal-container">
          <div className={renderComp.show ? "modal  modal-open" : "modal"}>
            <CloseIcon onClick={closeModal} className="close" />
            {renderComp.render}
          </div>
  
        </div>
        <Backdrop show={renderComp.show} clicked={closeModal} />
      </>,
      document.getElementById("root-modal")
    )
  }
  return null;
};

export default Modal;