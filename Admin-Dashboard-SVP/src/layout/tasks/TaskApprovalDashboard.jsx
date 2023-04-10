import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Container, Image, Form, Button } from "react-bootstrap";
import taskapproval from "./task.module.css";
import "./taskapproval.css";
import { useParams } from "react-router-dom";
import { useGetTaskDetailsQuery } from "../../app/services/auth/authService";

const TaskApprovalDashboard = () => {
  const { data: AdminTasks } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });
  const { id } = useParams();
  const TaskCollection = AdminTasks || [];
  return (
    <Container className={taskapproval.container}>
      <DashboardLayout name="Tasks">
        <div className={taskapproval.overallcontainer}>
          <p className={taskapproval.taskapprovaltitle}>Approval Request</p>
          <div className={taskapproval.secondtitlecontainer}>
            <p className={taskapproval.secondtitle}>Approval Information</p>
          </div>
          {TaskCollection.map((task, index) =>
            id === task._id ? (
              <div key={index}>
                {console.log(task)}
                <Descritption title="Approval requested on:">
                  <p className={taskapproval.descriptioncontent}>
                    {new Date(task.date).toLocaleDateString()}
                  </p>
                </Descritption>
                <Descritption title="Task:">
                  <p className={taskapproval.descriptioncontent}>{task.name}</p>
                </Descritption>
                <Descritption title="Project:">
                  <p className={taskapproval.descriptioncontent}>
                    {task.project.name}
                  </p>
                </Descritption>
                <Descritption title="Requested by:">
                  <div className={taskapproval.yellowbackground}>
                    <Image src="/images/avatar.png" alt="avatar" />
                    <div className={taskapproval.absolutecenter}>
                      <p className={taskapproval.textname}>
                        {task?.assigned_to?.firstname} &nbsp;
                        {task?.assigned_to?.lastname}
                      </p>
                    </div>
                  </div>
                </Descritption>
                <Descritption title="Started:">
                  <p className={taskapproval.descriptioncontent}>
                    {" "}
                    {new Date(task.date).toLocaleDateString()}
                  </p>
                </Descritption>
                <Descritption title="Due date:">
                  <p className={taskapproval.descriptioncontent}>
                    {" "}
                    {new Date(task.due).toLocaleDateString()}
                  </p>
                </Descritption>
              </div>
            ) : null
          )}
          <div className={taskapproval.secondtitlecontainer}>
            <p className={taskapproval.secondtitle}>Response</p>
          </div>
          <Descritption title="Status">
            <Form.Check
              defaultChecked
              type="radio"
              id="custom-switch"
              label="Approved"
            />
            <Form.Check type="radio" id="custom-switch2" label="Declined" />
          </Descritption>
          <DescritptionTextArea title="Comments:">
            <Form.Control
              as="textarea"
              className={taskapproval.textarea}
              rows={3}
              placeholder="Type here"
            />
          </DescritptionTextArea>
          <div className={taskapproval.absoluterightendcontainer}>
            <div className={taskapproval.flexbuttoncontainer}>
              <Button
                className={taskapproval.cancelbutton}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button className={taskapproval.sharebutton}>Submit Form</Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default TaskApprovalDashboard;

const Descritption = (props) => {
  return (
    <div className={taskapproval.descriptioncontainer}>
      <div className={taskapproval.absolutecenter}>
        <p className={taskapproval.descriptiontitle}>{props.title}</p>
      </div>
      {props.children}
    </div>
  );
};

const DescritptionTextArea = (props) => {
  return (
    <div className={taskapproval.descriptioncontainer}>
      <p className={taskapproval.descriptiontitle}>{props.title}</p>
      {props.children}
    </div>
  );
};
