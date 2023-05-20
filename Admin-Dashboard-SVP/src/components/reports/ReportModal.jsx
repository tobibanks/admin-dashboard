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
import Skeleton from "react-loading-skeleton";

const ReportModal = ({ show, onHide }) => {
  // const [modalShow, setModalShow] = React.useState(true);
  const [more, setMore] = useState(false);
  const [display, setDisplay] = useState(false);
  const [select, setSelect] = useState("");
  const [addReportsMutation] = useAddReportsDetailsMutation();
  const { data: TaskCollection } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });
  const TaskCollections = TaskCollection || [];

  const { data: Users, isLoading } = useGetAllUsersDetailsQuery({
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
    setFiles([...files, e.target.files[0]]);
  };

  const removeImage = (index) => {
    const newArray = [...files];
    newArray.splice(index, 1);
    setFiles(newArray);
  };

  const submitForm = async (data) => {
    console.log("batman");
    if (!files.length) return toast.error("Select a file");
    const conversion = { ...data };
    const stringid = conversion.send_to.toString();
    const formData = new FormData();
    files.map((file) => {
      return formData.append("attachments", file);
    });
    // formData.append("attachments", files);
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
      setFiles(null);
      // toast.success("Project Registered Successfully");
    } catch (error) {
      toast.error(error.status);
    }
    onHide();
  };

  // const filteredImage = ProjectCollections.filter((item) =>
  //   item.includes("image")
  // );

  const filteredAsignedtoProjects = ProjectCollections.filter(
    (item) => item.assigned_to != undefined
  );

  // collection.filter((collectionItem) =>
  //   Object.keys(constraint).every(
  //     (key) =>
  //       collectionItem.hasOwnProperty(key) &&
  //       constraint[key] === collectionItem[key]
  //   )
  // );

  return (
    <Modal
      className={modal.modal}
      size="md"
      show={show}
      onHide={onHide}
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
          <p className={modal.title}>Projects</p>
          {isLoading ? (
            <Skeleton
              width={300}
              baseColor="#ebab34"
              highlightColor="#f2cb07"
            />
          ) : (
            <>
              {more ? (
                <>
                  {filteredAsignedtoProjects.map((project, index) => (
                    <div style={{ margin: "8px 0px" }}>
                      <Form.Check
                        key={index}
                        type="radio"
                        required
                        onClick={handleChanges}
                        // key={index}
                        {...register("project")}
                        // name="project"
                        value={project._id}
                        label={project.name}
                      />
                    </div>
                  ))}
                </>
              ) : (
                // <div>
                <>
                  {filteredAsignedtoProjects
                    ?.slice(0, 5)
                    ?.map((project, index) => (
                      <div style={{ margin: "8px 0px" }}>
                        <Form.Check
                          type="radio"
                          // onClick={(e)=> setSelect(e.target.value)}
                          key={index}
                          required
                          onClick={handleChanges}
                          {...register("project")}
                          // name="project"
                          value={project._id}
                          label={project.name}
                        />
                      </div>
                    ))}
                </>
                // </div>
              )}
            </>
          )}
          {filteredAsignedtoProjects.length > 5 ? (
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
                      required
                      className={modal.radioinput}
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
                required
                className={modal.checkinput}
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
        </Form>
      </Modal.Body>
      <Toaster
        position="top-left"
        reverseOrder={false}
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
    </Modal>
  );
};

export default ReportModal;

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
