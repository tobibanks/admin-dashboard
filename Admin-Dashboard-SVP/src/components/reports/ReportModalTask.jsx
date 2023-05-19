import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import modal from "./general.module.css";
import { Modal, Image, Button, FormGroup } from "react-bootstrap";
// import "./modal.css";
import "./Reportmodal.css";
import toast, { Toaster } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import {
  useAddTaskReportMutation,
  useGetSpecificTaskQuery,
} from "../../app/services/auth/authService";

const ReportModalTask = ({ show, onHide, id }) => {
  const [addTaskReportsMutation] = useAddTaskReportMutation();

  const { register, reset, handleSubmit } = useForm();

  const { data: specificTask } = useGetSpecificTaskQuery(id);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles([...files, e.target.files[0]]);
  };

  const removeImage = (index) => {
    const newArray = [...files];
    newArray.splice(index, 1);
    setFiles(newArray);
  };

  const submitForm = async (data) => {
    if (!files.length) return toast.error("Select a file");
    const formData = new FormData();
    files.map((file) => {
      return formData.append("attachments", file);
    });
    formData.append("note", data.note);

    try {
      await toast.promise(
        addTaskReportsMutation({
          id: id,
          data: formData,
        }).unwrap(),
        {
          loading: "Saving Form",
          success: "File Uploaded Successfully",
          error: "Failed to create form",
        }
      );
      reset();
      setFiles(null);
      // toast.success("Project Registered Successfully");
    } catch (error) {
      toast.error(error.status);
    }
    onHide();
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
        <Form onSubmit={handleSubmit(submitForm)}>
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
          <p className={modal.title}>Note</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              className={modal.textarea}
              {...register("note")}
              rows={3}
              placeholder="Type here"
            />
          </Form.Group>
          <div className={modal.absoluterightendcontainer}>
            <div className={modal.flexbuttoncontainer}>
              <Button type="submit" className={modal.sharebutton}>
                Submit Form
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
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModalTask;

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

export const createPreviewURL = (file) => {
  return URL.createObjectURL(file);
};
