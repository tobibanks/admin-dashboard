import React, { useState } from "react";
import { Modal, Image, Button, FormGroup } from "react-bootstrap";
import modal from "./message.module.css";
import toast, { Toaster } from "react-hot-toast";

export const MessageUploadModal = ({ show, onHide }) => {
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles([...files, e.target.files[0]]);
  };

  const removeImage = (index) => {
    const newArray = [...files];
    newArray.splice(index, 1);
    setFiles(newArray);
  };

  return (
    <Modal
      className={modal.modal}
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={modal.modalbody}>
        <div className={modal.attachmentflex}>
          {!files ? null : (
            <>
              {files.map((file, index) => {
                return (
                  <Attachment
                    key={index}
                    attachmentname={file.name}
                    imagelink={file.type}
                    onClick={removeImage}
                    attachmentsize={file.size}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className={modal.fileabsolutecenter}>
          <div className={modal.customfileinput}>
            <p className={modal.fileinputbutton}>Add New File</p>
            <Image src="/icons/addreport.svg" alt="add" />
          </div>
          <input
            type="file"
            className={modal.fileinputhide}
            // className={modal.customfileinput}
            // {...register("attachments")}
            onChange={handleFileChange}
          ></input>
        </div>

        <div className={modal.absoluterightendcontainer}>
          <div className={modal.flexbuttoncontainer}>
            <Button type="submit" className={modal.sharebutton}>
              Upload
            </Button>
          </div>
        </div>
        <Toaster
          position="top-left"
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

const Attachment = (props) => {
  return (
    <div className={modal.attachmentcontainer}>
      <div className={modal.reportabsolutecenter}>
        {props.imagelink.startsWith("image") ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : props.imagelink.startsWith("application") ? (
          <Image src="/icons/pdf.svg" alt="jpg" />
        ) : props.imagelink.startsWith("video") ? (
          <Image src="/icons/reports/pdf.svg" alt="jpg" />
        ) : null}
      </div>
      <div>
        <p className={modal.attachmenttext}>
          {props.attachmentname?.substring(0, 5)}
        </p>
        <p className={modal.attachmentsize}>
          {Math.round(props.attachmentsize / 1000) + "kb"}
        </p>
      </div>
      <div className={modal.reportabsolutecenter}>
        <Image
          src="/icons/reportclose.svg"
          onClick={props.onClick}
          style={{ cursor: "pointer" }}
          alt="close"
        />
      </div>
    </div>
  );
};
