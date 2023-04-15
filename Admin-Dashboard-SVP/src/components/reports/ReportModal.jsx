import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Image, Button } from "react-bootstrap";
import modal from "./general.module.css";
import "./modal.css";
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
  const [addReportsMutation] = useAddReportsDetailsMutation();
  const { data: TaskCollection } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });
  const TaskCollections = TaskCollection || [];
  console.log(TaskCollections);

  const { data: Users } = useGetAllUsersDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const UserCollection = Users || [];

  console.log(UserCollection);

  const { data: Projects } = useGetProjectDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const ProjectCollections = Projects || [];

  console.log(ProjectCollections);

  const { register, reset, handleSubmit } = useForm();

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const [Files, setFiles] = useState([]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFiles([...Files, file]);
  };

  const submitForm = async (data) => {
    if (!Files) return toast.error("Select a file");
    // const formData = new FormData();
    // formData.append("attachments", file);

    // console.log(formData);

    const conversion = { ...data };
    const stringid = conversion.send_to.toString();
    const formData = new FormData();
    formData.append("attachments", Files);
    console.log(Files);
    const newdetails = {
      ...data,
      attachments: Files,
      send_to: stringid,
    };

    console.log(newdetails);

    try {
      await toast.promise(
        addReportsMutation({
          newdetails,
        }).unwrap(),
        {
          loading: "Saving Form",
          success: "File Uploaded Successfully",
          error: "Failed to create form",
        }
      );
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
          <div className={modal.absolutecenter3}>
            {/* <Button className={modal.addfile}> */}
            <input
              type="file"
              className={modal.customfileinput}
              // {...register("attachments")}
              onChange={handleFileChange}
            ></input>
            {/* </Button> */}
          </div>
          <p className={modal.title}>Projects</p>
          {more ? (
            <div>
              {ProjectCollections.map((project, index) => (
                <Form.Check
                  type="radio"
                  key={index}
                  {...register("project")}
                  name="project"
                  value={project._id}
                  label={project.name}
                />
              ))}
            </div>
          ) : (
            <div>
              {ProjectCollections?.slice(0, 3)?.map((project, index) => (
                <Form.Check
                  type="radio"
                  key={index}
                  {...register("project")}
                  name="project"
                  value={project._id}
                  label={project.name}
                />
              ))}
            </div>
          )}
          <p className={modal.title1} onClick={() => setMore(!more)}>
            See More
          </p>
          <p className={modal.title}>Tasks</p>
          {TaskCollections.map((task, index) => (
            <Form.Check
              type="radio"
              key={index}
              name="task"
              {...register("task")}
              value={task._id}
              label={task.name}
            />
          ))}
          <div className={modal.flexcontainer}>
            <p className={modal.title}>Send to:</p>
            <div className={modal.absolutecenter3}>
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
            console.log(usercollect?._id);
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
      <div className={modal.absolutecenter1}>
        <Image
          src={`${props.imagelink}`}
          alt="image-link"
          className={modal.attachmentimage}
        />
      </div>
      <div>
        <p className={modal.attachmenttext}>{props.attachmentname}</p>
        <p className={modal.attachmentsize}>{props.attachmentsize}</p>
      </div>
    </div>
  );
};

export const createPreviewURL = (file) => {
  return URL.createObjectURL(file);
};
