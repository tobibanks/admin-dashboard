import React from "react";
import input from "./general.module.css";
import { Button } from "react-bootstrap";
import { MdOutlineCloudUpload } from "react-icons/md";

const FileInputContainer = () => {
  return (
    <div className={input.absolutecenter}>
      <div className={input.innercontainer}>
        <div className={input.innercontainer1}>
          <Button className={input.button}>
            Upload
            <MdOutlineCloudUpload className={input.icon} />
          </Button>
          <p className={input.text}>or</p>
          <p className={input.text}>Drag files here</p>
        </div>
      </div>
    </div>
  );
};

export default FileInputContainer;
