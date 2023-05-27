import React, { useRef } from "react";

import Button from "../Button/Button";

import classes from "./ImageUpload.module.css";

function ImageUpload(props) {
  const filePickerRef = useRef();

  function pickImageHandler() {
    filePickerRef.current.click();
  }

  function pickedHandler(event) {
    console.log(event.target);
  }

  return (
    <div className={classes["form-control"]}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`${classes["image-upload"]} ${props.center && "center"}`}>
        <div className={classes["image-upload__preview"]}>
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
