import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

function Modal(props) {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={{
          enterActive: classes["modal-enter"],
          enterDone: classes["modal-enter-active"],
          exitActive: classes["modal-exit-active"],
          exitDone: classes["modal-exit"],
        }}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
}

function ModalOverlay(props) {
  const content = (
    <div className={`${classes.modal} ${props.className}`} style={props.style}>
      <header className={`${classes["modal__header"]} ${props.headerClass}`}>
        {props.header}
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`${classes["modal__content"]} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${classes["modal__footer"]} ${props.footer}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

export default Modal;
