import React, { useState, forwardRef, useMemo } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Container, Image } from "react-bootstrap";
import taskboard from "./task.module.css";
import TaskHeader from "../../components/tasks/TaskHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetTaskDetailsQuery } from "../../app/services/auth/authService";

const TaskBoardDashboard = () => {
  const { data: TaskCollection } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const TasksBoardCollection = TaskCollection || [];

  console.log(TasksBoardCollection);
  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2025"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const inprogressdata = useMemo(() => {
    const filteredData = TasksBoardCollection.filter(
      (item) =>
        item.status === "In Progress" &&
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, TasksBoardCollection]);

  console.log(inprogressdata);

  const upcomingdata = useMemo(() => {
    const filteredData = TasksBoardCollection.filter(
      (item) =>
        item.status === "upcoming" &&
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, TasksBoardCollection]);

  const completedata = useMemo(() => {
    const filteredData = TasksBoardCollection.filter(
      (item) =>
        item.status === "complete" &&
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, TasksBoardCollection]);

  return (
    <Container className={taskboard.container}>
      <DashboardLayout name="Tasks">
        <div className={taskboard.overallcontainer}>
          <TaskHeader name="My Tasks" />
          <div className={taskboard.rightboardcontainer}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              customInput={<ExampleCustomInput />}
              width={300}
            />
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              dateFormat="dd/MM/yyyy"
              customInput={<ExampleCustomInput />}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <div className={taskboard.flexboardcontainer}>
            <div className={taskboard.sizecontainer}>
              <BoarderHeader text="In Progress" />
              {inprogressdata.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  name={filtereddata.name}
                  firstname={filtereddata.assigned_to?.firstname}
                  lastname={filtereddata.assigned_to?.lastname}
                  headertext={filtereddata.projectname}
                  content={filtereddata.description}
                  date={filtereddata.due}
                  imagelink={filtereddata.imagelink}
                  priority={filtereddata.priority}
                />
              ))}
            </div>
            <div className={taskboard.sizecontainer}>
              <BoarderHeader text="Upcoming" />
              {upcomingdata.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  name={filtereddata.name}
                  firstname={filtereddata.assigned_to?.firstname}
                  lastname={filtereddata.assigned_to?.lastname}
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
              {completedata.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  name={filtereddata.name}
                  firstname={filtereddata.assigned_to?.firstname}
                  lastname={filtereddata.assigned_to?.lastname}
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
  return (
    <div className={taskboard.contentcontainer}>
      <div className={taskboard.innercontainer}>
        <div className={taskboard.flexname}>
          <div className={taskboard.absolutecenter}>
            <p className={taskboard.name}>{props.name}</p>
          </div>
          <Image src="/icons/dots.svg" alt="dots" />
        </div>
        <p className={taskboard.name1}>
          {props.firstname} <span>{props.lastname}</span>
        </p>
        <p className={taskboard.contenttext}>{props.headertext}</p>
        <p className={taskboard.content}>{props.content}</p>
        <div className={taskboard.flextext}>
          <p className={taskboard.assigned1}>Due:</p>
          <p className={taskboard.value}>
            {" "}
            {new Date(props.date).toLocaleDateString()}
          </p>
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
            {props.priority === "red" ? (
              <ImageIcon imagelink="/icons/table/redflag.svg" />
            ) : props.priority === "gray" ? (
              <ImageIcon imagelink="/icons/table/normalflag.svg" />
            ) : props.priority === "yellow" ? (
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

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={taskboard.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={taskboard.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={taskboard.calendaricon}
      />
    </div>
    {value}
  </button>
));
