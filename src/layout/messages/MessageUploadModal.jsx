import React, { useState } from "react";
import { Modal, Image, Button, FormGroup, Spinner } from "react-bootstrap";
import modal from "./message.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useUpload } from "./../../hooks/useUpload";
import useSendMessage from "./../../hooks/useSendMessage";
import { useForm } from "react-hook-form";

export const MessageUploadModal = ({ show, onHide, id }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

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
    setLoading("loading");
    if (!files.length) return toast.error("Select a file");
    files.map(async (file) => {
      await upload(id, file).then((url) => {
        urls.push(url);
        setDownloadUrl(url);
        submitFile(file, url);
        setLoading("");
        onHide();
      });
    });
  };

  const submitFile = async (file, url) => {
    const time = new Date().getTime();
    reset();
    const fileDetails = {
      name: file.name,
      size: file.size,
      type: file.type,
    };
    await sendMessage(id, url, time, fileDetails).then(() => {
      toast.success("Successfully Uploaded");
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
              {loading === "loading" ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Attachment = (props) => {
  return (
    <div className={modal.attachmentcontainer1}>
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
        <p className={modal.attachmenttext1}>
          {props.attachmentname?.substring(0, 9)}
        </p>
        <p className={modal.attachmentsize1}>
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
