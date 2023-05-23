import React from "react";

import Modal from "../Modal/Modal";
import Button from "../../FormElements/Button/Button";

import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p className={classes.error}>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
