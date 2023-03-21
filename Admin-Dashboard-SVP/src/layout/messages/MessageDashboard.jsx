import React from "react";
import { Container } from "react-bootstrap";
import message from "./message.module.css";
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const MessageDashboard = () => {
  return (
    <Container className={message.container}>
      <DashboardLayout name="Messages">
        <div className={message.overallcontainer}></div>
      </DashboardLayout>
    </Container>
  );
};

export default MessageDashboard;
