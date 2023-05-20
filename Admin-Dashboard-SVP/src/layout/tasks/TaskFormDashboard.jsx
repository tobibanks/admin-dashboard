import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Container, Image, Form, Button } from "react-bootstrap";
import taskform from "./task.module.css";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  useAddTaskDetailsMutation,
  useGetProjectDetailsQuery,
  useGetSpecificProjectQuery,
} from "../../app/services/auth/authService";
import { useParams, useNavigate } from "react-router-dom";

const TaskFormDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState();
  const { data: AdminProjects, isFetching } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [addtaskdetailsmutation] = useAddTaskDetailsMutation();

  const ProjectCollection = AdminProjects || [];

  const filtereddata = ProjectCollection.filter((item) => item._id === id);

  const filtereddatarevised = filtereddata.find((obj) => {
    return obj._id === id;
  });

  const projectcurrentid = id;

  const { data: specificProjects } = useGetSpecificProjectQuery(id);

  const specificProject = specificProjects || [];

  const { register, setValue, reset, handleSubmit } = useForm();

  useEffect(() => {
    // you can do async server request and fill up form
    setValue("assign", specificProject.display_name);
  }, [filtereddatarevised]);

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
    const formData = new FormData();

    files.map((file) => {
      return formData.append("attachments", file);
    });
    formData.append("name", data.name);
    formData.append("instruction", data.instruction);
    formData.append("due", data.due);

    // formData.append();
    try {
      await toast.promise(
        addtaskdetailsmutation({
          id: projectcurrentid,
          data: formData,
        }).unwrap(),
        {
          loading: "Saving Form",
          success: "Project Form Created Successfully",
          error: "Failed to create form",
        }
      );
      reset();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.status);
    }
  };
  return (
    <Container className={taskform.container}>
      <DashboardLayout name="Tasks">
        <div className={taskform.overallcontainer}>
          <p className={taskform.taskapprovaltitle}>New Task Form</p>
          <div className={taskform.secondtitlecontainer}>
            <p className={taskform.secondtitle}>{filtereddatarevised?.name}</p>
          </div>
          {isFetching ? null : (
            <form onSubmit={handleSubmit(submitForm)}>
              <div className={taskform.formcontainer}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <div className={taskform.formcontainer1}>
                    <Form.Label className={taskform.form1}>
                      Assigned To
                    </Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      name="assign"
                      {...register("assign")}
                      // placeholder="Type here..."
                      required
                    />
                  </div>
                </Form.Group>
              </div>
              <div className={taskform.formcontainer1}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label className={taskform.form1}>
                    Task Title (for referencing project):
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    {...register("name")}
                    placeholder="Type here..."
                    required
                  />
                </Form.Group>
              </div>
              <div className={taskform.formcontainer}>
                <Form.Group className="mb-3" controlId="formBasicDue">
                  <Form.Label className={taskform.form1}>
                    When do you need this?
                  </Form.Label>
                  <input
                    type="date"
                    id="due"
                    value={type}
                    name="due"
                    {...register("due")}
                    required
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                </Form.Group>
              </div>
              <p className={taskform.taskformtitle}>TASK INFORMATION</p>
              <Form.Group className="mb-3" controlId="formBasicComment">
                <Form.Label className={taskform.form1}>
                  Please provide detailed informaton about your task:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  className={taskform.textarea1}
                  rows={3}
                  {...register("instruction")}
                  placeholder="Type here"
                />
              </Form.Group>
              <div className={taskform.attachmentflex}>
                {!files ? null : (
                  <>
                    {files.map((file, index) => {
                      return (
                        <Attachment
                          key={index}
                          attachmentname={file?.name}
                          imagelink={file?.type}
                          onClick={removeImage}
                          attachmentsize={file?.size}
                        />
                      );
                    })}
                  </>
                )}
              </div>
              <div className={taskform.fileabsolutecenter}>
                <input
                  type="file"
                  className={taskform.fileinputhide}
                  // className={modal.customfileinput}
                  // {...register("attachments")}
                  onChange={handleFileChange}
                ></input>
                <Button className={taskform.submitbutton}>
                  Upload Attachments
                </Button>
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
                }}
              />
              <div className={taskform.absoluterightendcontainer}>
                <div className={taskform.flexbuttoncontainer}>
                  <Button
                    className={taskform.cancelbutton}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className={taskform.submitbutton}>
                    Submit Form
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default TaskFormDashboard;

const DescritptionTextArea = (props) => {
  return (
    <div className={taskform.descriptioncontainer}>
      <p className={taskform.descriptiontitle}>{props.title}</p>
      {props.children}
    </div>
  );
};

const Attachment = (props) => {
  return (
    <div className={taskform.attachmentcontainer}>
      <div style={{ display: "flex", gap: "10px" }}>
        <div className={taskform.reportabsolutecenter}>
          {props.imagelink.startsWith("image") ? (
            <Image src="/icons/jpg.svg" alt="jpg" />
          ) : props.imagelink.startsWith("application") ? (
            <Image src="/icons/pdf.svg" alt="jpg" />
          ) : props.imagelink.startsWith("video") ? (
            <Image src="/icons/reports/pdf.svg" alt="jpg" />
          ) : null}
        </div>
        <div>
          <p className={taskform.attachmenttext}>
            {props.attachmentname?.substring(0, 12)}
          </p>
          <p className={taskform.attachmentsize}>
            {Math.round(props.attachmentsize / 1000) + "kb"}
          </p>
        </div>
      </div>
      <div className={taskform.reportabsolutecenter}>
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
