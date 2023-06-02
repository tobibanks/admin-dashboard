import React, { useState } from "react";
import { Modal, Image, Button, FormGroup } from "react-bootstrap";
import modal from "./message.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useUpload } from "./../../hooks/useUpload";
import useSendMessage from "./../../hooks/useSendMessage";
import { useForm } from "react-hook-form";

export const MessageUploadModal = ({ show, onHide, id }) => {
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");

  console.log(files);
  const handleFileChange = (e) => {
    if (!e.target.files) return;
    setFiles([...files, e.target.files[0]]);
  };

  const removeImage = (index) => {
    const newArray = [...files];
    newArray.splice(index, 1);
    setFiles(newArray);
  };
  const { register, reset, handleSubmit } = useForm();

  const { upload } = useUpload();
  const { error, sendMessage } = useSendMessage();
  const urls = [];

  const submit = async () => {
    if (!files.length) return toast.error("Select a file");
    files.map(async (file) => {
      await upload(id, file).then((url) => {
        urls.push(url);
        setDownloadUrl(url);
        submitFile(file, url);
      });
    });
    onHide();
  };

  const submitFile = async (file, url) => {
    console.log(file);
    console.log(url);
    const time = new Date().getTime();
    reset();
    const fileDetails = {
      name: file.name,
      size: file.size,
      type: file.type,
    };
    console.log(fileDetails);
    await sendMessage(id, url, time, fileDetails).then(() => {
      console.log("boy");
      reset();
      setFiles([]);
    });
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
            <Button
              type="submit"
              className={modal.sharebutton}
              onClick={submit}
            >
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
