import React from "react";
import { Container, Image } from "react-bootstrap";
import message from "./message.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const MessageDashboard = () => {
  return (
    <Container className={message.container}>
      <DashboardLayout name="Messages">
        <div className={message.overallcontainer}>
          <Image src="/icons/frame.png" />
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default MessageDashboard;
