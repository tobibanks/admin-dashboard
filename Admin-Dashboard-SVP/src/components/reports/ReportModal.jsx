import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Modal, Image, Button, FormGroup } from "react-bootstrap";
import modal from "./general.module.css";
import "./Reportmodal.css";
// import "./modal.css";
import toast, { Toaster } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import {
  useGetAllUsersDetailsQuery,
  useAddReportsDetailsMutation,
  useGetTaskDetailsQuery,
  useGetProjectDetailsQuery,
} from "../../app/services/auth/authService";

const ReportModal = (props) => {
  const [modalShow, setModalShow] = React.useState(true);
  const [more, setMore] = useState(false);
  const [display, setDisplay] = useState(false);
  const [select, setSelect] = useState("");
  const [addReportsMutation] = useAddReportsDetailsMutation();
  const { data: TaskCollection } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });
  const TaskCollections = TaskCollection || [];

  const { data: Users } = useGetAllUsersDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const UserCollection = Users || [];

  const { data: Projects } = useGetProjectDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const ProjectCollections = Projects || [];

  const { register, reset, handleSubmit } = useForm();

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleChanges = (e) => {
    setSelect(e.target.value);
    setDisplay(true);
  };

  const filteredtasks = useMemo(() => {
    const filtereddata = TaskCollections.filter(
      (item) => item.project.id === select
    );
    return filtereddata;
  }, [select, TaskCollections]);


  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const removeImage = (index) => {
    const newArray = [...files];
    newArray.splice(index, 1);
    setFiles(newArray);
    console.log("batman");
  };

  const submitForm = async (data) => {
    if (!files.length) return toast.error("Select a file");
    const conversion = { ...data };
    const stringid = conversion.send_to.toString();
    const formData = new FormData();
    formData.append("attachments", files);
    formData.append("send_to", stringid);
    formData.append("project", conversion.project);
    formData.append("task", conversion.task);
    formData.append("note", conversion.note);

    try {
      await toast.promise(addReportsMutation(formData).unwrap(), {
        loading: "Saving Form",
        success: "File Uploaded Successfully",
        error: "Failed to create form",
      });
      reset();
      setfile(null);
      // toast.success("Project Registered Successfully");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal
      className={modal.modal}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={modal.modalbody}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <div className={modal.attachmentflex}>
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
          <p className={modal.title}>Projects</p>
          {more ? (
            <>
              {ProjectCollections.map((project, index) => (
                // <FormGroup>
                <Form.Check
                  key={index}
                  type="radio"
                  onClick={handleChanges}
                  // key={index}
                  {...register("project")}
                  // name="project"
                  value={project._id}
                  label={project.name}
                />
                // </FormGroup>
              ))}
            </>
          ) : (
            // <div>
            <>
              {ProjectCollections?.slice(0, 3)?.map((project, index) => (
                // <FormGroup>
                <Form.Check
                  type="radio"
                  // onClick={(e)=> setSelect(e.target.value)}
                  key={index}
                  onClick={handleChanges}
                  {...register("project")}
                  // name="project"
                  value={project._id}
                  label={project.name}
                />
                // </FormGroup>
              ))}
            </>
            // </div>
          )}
          {ProjectCollections.length > 3 ? (
            more ? (
              <p className={modal.title1} onClick={() => setMore(!more)}>
                See Less
              </p>
            ) : (
              <p className={modal.title1} onClick={() => setMore(!more)}>
                See More
              </p>
            )
          ) : null}
          {display ? (
            <>
              <p className={modal.title}>Tasks</p>
              {filteredtasks.length < 1 ? (
                <p className={modal.notask}> There are no selected tasks</p>
              ) : (
                <>
                  {filteredtasks.map((task, index) => (
                    <Form.Check
                      type="radio"
                      key={index}
                      onChange={() => console.log("be batman")}
                      name="task"
                      {...register("task")}
                      value={task._id}
                      label={task.name}
                    />
                  ))}
                </>
              )}
            </>
          ) : null}
          <div className={modal.flexcontainer}>
            <p className={modal.title}>Send to:</p>
            <div className={modal.fileabsolutecenter}>
              <div className={modal.searchiconcontainer}>
                <input
                  type="text"
                  placeholder="Search Clients"
                  className={modal.search}
                ></input>
                <Image src="/icons/search.svg" className={modal.searchicon} />
              </div>
            </div>
          </div>

          {UserCollection.map((usercollect, index) => {
            return (
              <Form.Check
                type="checkbox"
                key={index}
                {...register("send_to")}
                value={usercollect._id}
                label={usercollect?.firstname}
              />
            );
          })}
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

export default ReportModal;

const Attachment = (props) => {
  return (
    <div className={modal.attachmentcontainer}>
      <div className={modal.reportabsolutecenter}>
        {props.imagelink === "image/jpeg" ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : props.imagelink === "image/png" ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : null}
      </div>
      <div>
        <p className={modal.attachmenttext}>
          {props.attachmentname?.substring(0, 7)}
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
