import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import { Container, Image } from "react-bootstrap";
import taskboard from "./task.module.css";
import TaskHeader from "../../components/tasks/TaskHeader";
import { TaskBoardData } from "../../../data/task";

const TaskBoardDashboard = () => {
  const filteredInProgressData = TaskBoardData.filter(
    (item) => item.activestatus === "In Progress"
  );

  const filteredUpcomingData = TaskBoardData.filter(
    (item) => item.activestatus === "Upcoming"
  );

  const filteredCompleteData = TaskBoardData.filter(
    (item) => item.activestatus === "Complete"
  );

  return (
    <Container className={taskboard.container}>
      <DashboardLayout name="Tasks">
        <div className={taskboard.overallcontainer}>
          <TaskHeader name="My Tasks" />
          <div className={taskboard.rightboardcontainer}>
            <TableHeaderNav />
          </div>
          <div className={taskboard.flexboardcontainer}>
            <div className={taskboard.sizecontainer}>
              <BoarderHeader text="In Progress" />
              {filteredInProgressData.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  name={filtereddata.name}
                  headertext={filtereddata.projectname}
                  content={filtereddata.description}
                  date={filtereddata.duedate}
                  imagelink={filtereddata.imagelink}
                  priority={filtereddata.priority}
                />
              ))}
            </div>
            <div className={taskboard.sizecontainer}>
              <BoarderHeader text="Upcoming" />
              {filteredUpcomingData.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  name={filtereddata.name}
                  headertext={filtereddata.projectname}
                  content={filtereddata.description}
                  date={filtereddata.duedate}
                  imagelink={filtereddata.imagelink}
                  priority={filtereddata.priority}
                />
              ))}
            </div>
            <div className={taskboard.sizecontainer}>
              <BoarderHeader text="Completed" />
              {filteredCompleteData.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  name={filtereddata.name}
                  headertext={filtereddata.projectname}
                  content={filtereddata.description}
                  date={filtereddata.duedate}
                  status={filtereddata.status}
                  imagelink={filtereddata.imagelink}
                  priority={filtereddata.priority}
                />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default TaskBoardDashboard;

const BoarderHeader = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? taskboard.boarderheadercontainer
          : props.text === "Upcoming"
          ? taskboard.boarderheadercontainerpurple
          : props.text === "Completed"
          ? taskboard.borderheadercontainerblue
          : null
      }
    >
      <p className={taskboard.bordertext}>{props.text}</p>
    </div>
  );
};

const ContentContainer = (props) => {
  console.log(props.status);
  return (
    <div className={taskboard.contentcontainer}>
      <div className={taskboard.innercontainer}>
        <div className={taskboard.flexname}>
          <p className={taskboard.name}>{props.name}</p>
          <Image src="/icons/dots.svg" alt="dots" />
        </div>
        <p className={taskboard.contenttext}>{props.headertext}</p>
        <p className={taskboard.content}>{props.content}</p>
        <div className={taskboard.flextext}>
          <p className={taskboard.assigned1}>Due:</p>
          <p className={taskboard.value}>{props.date}</p>
        </div>
        {props.status ? (
          <div className={taskboard.flextext}>
            <div className={taskboard.absolutecenter}>
              <p className={taskboard.assigned1}>Status:</p>
            </div>
            <div
              className={
                props.status === "Approved"
                  ? taskboard.approvedbutton
                  : props.status === "Pending"
                  ? taskboard.pendingbutton
                  : props.status === "Declined"
                  ? taskboard.declinedbutton
                  : null
              }
            >
              <p className={taskboard.statusbuttontext1}>{props.status}</p>
            </div>
          </div>
        ) : null}
        {props.priority ? (
          <div className={taskboard.flextext}>
            <div className={taskboard.absolutecenter}>
              <p className={taskboard.assigned1}>Priority</p>
            </div>
            {props.priority === "important" ? (
              <ImageIcon imagelink="/icons/table/redflag.svg" />
            ) : props.priority === "normal" ? (
              <ImageIcon imagelink="/icons/table/normalflag.svg" />
            ) : props.priority === "warning" ? (
              <ImageIcon imagelink="/icons/table/warningflag.svg" />
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={taskboard.absoluterightcontainer}>
        <div className={taskboard.flexicon}>
          <ImageTextIcon src="/icons/attach.svg" value="3" />
          <ImageTextIcon src="/icons/message.svg" value="3" />
        </div>
      </div>
    </div>
  );
};

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const ImageTextIcon = (props) => {
  return (
    <div className={taskboard.imagetexticon}>
      <Image src={`${props.src}`} alt="priority" />
      <div className={taskboard.absolutecenter}>
        <p className={taskboard.icontext}>{props.value}</p>
      </div>
    </div>
  );
};
