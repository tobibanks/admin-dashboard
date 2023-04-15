import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Container, Image, Form, Button } from "react-bootstrap";
import taskform from "./task.module.css";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  useAddTaskDetailsMutation,
  useGetProjectDetailsQuery,
} from "../../app/services/auth/authService";
import { useParams, useNavigate } from "react-router-dom";

const TaskFormDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState();
  const { data: AdminProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [addtaskdetailsmutation] = useAddTaskDetailsMutation();

  const ProjectCollection = AdminProjects || [];

  const filtereddata = ProjectCollection.filter((item) => item._id === id);

  console.log(filtereddata);

  const filtereddatarevised = filtereddata.find((obj) => {
    return obj._id === id;
  });

  console.log(filtereddatarevised);

  const projectcurrentid = id;

  // console.log(filtereddatarevised);
  const { register, control, reset, handleSubmit } = useForm();

  const submitForm = async (data) => {
    const completeform = {
      ...filtereddatarevised,
      ...data,
    };

    try {
      await toast.promise(
        addtaskdetailsmutation({
          id: projectcurrentid,
          data: completeform,
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
      console.log("error", error);
    }
  };
  return (
    <Container className={taskform.container}>
      <DashboardLayout name="Tasks">
        <div className={taskform.overallcontainer}>
          <p className={taskform.taskapprovaltitle}>New Task Form</p>
          <div className={taskform.secondtitlecontainer}>
            <p className={taskform.secondtitle}>{filtereddatarevised.name}</p>
          </div>
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
                    value={
                      filtereddatarevised?.assigned_to?.firstname +
                        " " +
                        filtereddatarevised?.assigned_to?.lastname || null
                    }
                    // {...register("name")}
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
                  {...register("title")}
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
                {...register("comments")}
                placeholder="Type here"
              />
            </Form.Group>
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
