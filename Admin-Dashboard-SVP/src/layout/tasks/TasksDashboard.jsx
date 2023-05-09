import React, { useMemo, useState, forwardRef, useEffect } from "react";
import { Container, Button, Image } from "react-bootstrap";
import task from "./task.module.css";
import "./task.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import TaskTableDisplay from "../../components/tasks/TaskTableDisplay";
import TaskHeader from "../../components/tasks/TaskHeader";
import ModalTask from "@/components/tasks/ModalTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetTaskDetailsQuery } from "../../app/services/auth/authService";
import SkeleteonLoaderTable from "../../components/dashboard/SkeleteonLoaderTable";
import DashboardLayoutContents from "../../components/dashboard/DashboardLayoutContents";
import { useNavigate } from "react-router-dom";

const TasksDashboard = () => {
  const {
    data: TaskCollection,
    isLoading,
    refetch,
  } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const navigate = useNavigate();

  const TasksTableCollection = TaskCollection || [];

  console.log(TasksTableCollection);

  // window.location.reload();
  // location.reload();

  const [filter, setFilter] = useState(null);
  const [setting, setSetting] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date("01/01/2029"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const data = useMemo(() => {
    if (!filter) return TasksTableCollection;
    const filteredData = TasksTableCollection.filter(
      (item) =>
        item.status === filter &&
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filteredData;
  }, [filter, TasksTableCollection]);

  const dataByDate = useMemo(() => {
    const filtereddata = data.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, data]);

  const filteredApprovedData = TasksTableCollection.filter(
    (item) => item.status === "Approved"
  );

  const filteredPendingData = TasksTableCollection.filter(
    (item) => item.status === "Pending"
  );

  const filteredInProgressData = TasksTableCollection.filter(
    (item) => item.status === "In Progress"
  );

  const filteredDeclinedData = TasksTableCollection.filter(
    (item) => item.status === "Declined"
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Container className={task.container}>
      <DashboardLayoutContents name="Tasks">
        <div className={task.overallcontainer}>
          <TaskHeader name="My Tasks" />
          <div className={task.leftcontainer}>
            <div>
              <NavCategories
                name="All Tasks"
                total={`(${TasksTableCollection.length})`}
                filter={filter}
                filter1={null}
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Approved"
                total={`(${filteredApprovedData.length})`}
                filter={filter}
                filter1="Approved"
                onClick={() => setFilter("Approved")}
              />
              <NavCategories
                name="Awaiting Approval"
                total={`(${filteredPendingData.length})`}
                filter1="Awaiting Approval"
                filter={filter}
                onClick={() => setFilter("Awaiting Approval")}
              />
              <NavCategories
                name="In Progress"
                total={`(${filteredInProgressData.length})`}
                filter1="In Progress"
                filter={filter}
                onClick={() => setFilter("In Progress")}
              />
              <NavCategories
                name="Declined"
                total={`(${filteredDeclinedData.length})`}
                filter={filter}
                filter1="Declined"
                onClick={() => setFilter("Declined")}
              />
            </div>
            <div className={task.datepickertitle}>
              <p className={task.datepickertitlelabel}>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                width={300}
              />
            </div>
            <div className={task.absolutecenter}>
              <div className={task.dash}></div>
            </div>
            <div className={task.datepickertitle}>
              <p className={task.datepickertitlelabel}>End Date</p>
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          {isLoading ? (
            <SkeleteonLoaderTable />
          ) : (
            <div>
              {dataByDate.length >= 1 ? (
                <TaskTableDisplay>
                  {dataByDate.map((taskcollect, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setSetting(taskcollect._id);
                        setModalShow(true);
                      }}
                    >
                      <td>
                        <div className={task.flexcontent}>
                          {taskcollect.star === "true" ? (
                            <Icon imagelink="/icons/dashboard/task/starred.svg" />
                          ) : (
                            <Icon imagelink="/icons/dashboard/task/star.svg" />
                          )}
                          <div className={task.centertext}>
                            <p className={task.tasktitle}>{taskcollect.name}</p>
                          </div>
                        </div>
                      </td>
                      <td>{taskcollect.project.name}</td>
                      <td>
                        <div className={task.absolutecenter}>
                          <p className={task.avatar}>
                            {" "}
                            {taskcollect.assigned_to?.firstname.charAt(0)}
                            <span>
                              {taskcollect.assigned_to?.lastname.charAt(0)}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className={task.absolutecenter}>
                          <StatusButton text={taskcollect.status} />
                        </div>
                      </td>
                      <td className={task.centericon}>
                        {" "}
                        {new Date(taskcollect.date).toLocaleDateString()}
                      </td>
                      <td className={task.centericon}>
                        {taskcollect.priority === "red" ? (
                          <ImageIcon imagelink="/icons/table/redflag.svg" />
                        ) : taskcollect.priority === "gray" ? (
                          <ImageIcon imagelink="/icons/table/normalflag.svg" />
                        ) : taskcollect.priority === "yellow" ? (
                          <ImageIcon imagelink="/icons/table/warningflag.svg" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </TaskTableDisplay>
              ) : (
                <div style={{ marginTop: "3rem" }}>
                  <p className={task.nothing}>There are no tasks</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DashboardLayoutContents>
      <ModalTask
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={setting}
      />
    </Container>
  );
};

export default TasksDashboard;

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button
      className={active ? task.tablenavcontaineractive : task.tablenavcontainer}
      onClick={props.onClick}
    >
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={task.disappear}>{props.filter}</span>
      <span className={task.disappear}>{props.filter1}</span>

      {/* </p> */}
    </Button>
  );
};

const StatusButton = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? task.statusbutton
          : props.text === "Declined"
          ? task.declinedbutton
          : props.text == "Approved"
          ? task.approvedbutton
          : props.text == "Awaiting Approval"
          ? task.pendingbutton
          : null
      }
    >
      <p className={task.statusbuttontext}>{props.text}</p>
    </div>
  );
};

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const Icon = (props) => {
  return <Image src={`${props.imagelink}`} alt="icon" />;
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={task.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={task.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={task.calendaricon}
      />
    </div>
    <p className={task.datevalue}>{value}</p>
  </button>
));
