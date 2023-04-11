import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Container, Image, Form, Button } from "react-bootstrap";
import taskform from "./task.module.css";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const TaskFormDashboard = () => {
  return (
    <Container className={taskapproval.container}>
      <DashboardLayout name="Tasks">
        <div className={taskapproval.overallcontainer}>
          <p className={taskapproval.taskapprovaltitle}>Approval Request</p>
          <div className={taskapproval.secondtitlecontainer}>
            <p className={taskapproval.secondtitle}>Approval Information</p>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default TaskFormDashboard;
