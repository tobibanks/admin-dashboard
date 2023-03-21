import React, { useMemo, useState } from "react";
import { Container, Button, Image } from "react-bootstrap";
import task from "./task.module.css";
import "./task.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import TaskTableDisplay from "../../components/tasks/TaskTableDisplay";
import TaskHeader from "../../components/tasks/TaskHeader";
import { TasksCollection } from "../../../data/task";
import ModalTask from "@/components/tasks/ModalTask";

const TasksDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [setting, setSetting] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const filtereddata = useMemo(() => {
    if (!filter) return TasksCollection;
    const filteredData = TasksCollection.filter(
      (item) => item.activestatus === filter
    );
    return filteredData;
  }, [filter]);

  return (
    <Container className={task.container}>
      <DashboardLayout name="Tasks">
        <div className={task.overallcontainer}>
          <TaskHeader name="My Tasks" />
          <div className={task.leftcontainer}>
            <div className={task.flexwrap}>
              <NavCategories
                name="All Projects"
                total="(23)"
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Approved"
                total="(02)"
                onClick={() => setFilter("Approved")}
              />
              <NavCategories
                name="Pending"
                total="(10)"
                onClick={() => setFilter("Pending")}
              />
              <NavCategories
                name="Declined"
                total="(11)"
                onClick={() => setFilter("Declined")}
              />
            </div>
            <TableHeaderNav />
          </div>
          <TaskTableDisplay>
            {filtereddata.map((taskcollect, index) => (
              <tr
                key={index}
                onClick={() => {
                  setSetting(taskcollect.id);
                  setModalShow(true);
                }}
              >
                <td>
                  <div className={task.flexcontent}>
                    {taskcollect.star === "starred" ? (
                      <Icon imagelink="/icons/dashboard/task/starred.svg" />
                    ) : (
                      <Icon imagelink="/icons/dashboard/task/star.svg" />
                    )}
                    <div className={task.centertext}>
                      <p className={task.tasktitle}>{taskcollect.task}</p>
                    </div>
                  </div>
                </td>
                <td>{taskcollect.name}</td>
                <td>
                  <div className={task.absolutecenter}>
                    <p className={task.avatar}>{taskcollect.initials}</p>
                  </div>
                </td>
                <td>
                  <StatusButton text={taskcollect.status} />
                </td>
                <td className={task.centericon}>{taskcollect.date}</td>
                <td className={task.centericon}>
                  {taskcollect.priority === "important" ? (
                    <ImageIcon imagelink="/icons/table/redflag.svg" />
                  ) : taskcollect.priority === "normal" ? (
                    <ImageIcon imagelink="/icons/table/normalflag.svg" />
                  ) : taskcollect.priority === "warning" ? (
                    <ImageIcon imagelink="/icons/table/warningflag.svg" />
                  ) : null}
                </td>
              </tr>
            ))}
          </TaskTableDisplay>
        </div>
      </DashboardLayout>
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
  return (
    <Button className={task.tablenavcontainer} onClick={props.onClick}>
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
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
          : props.text == "Pending"
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
