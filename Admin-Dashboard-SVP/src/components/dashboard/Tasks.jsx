import React from "react";
import task from "./User.module.css";
import Table from "react-bootstrap/Table";
import { Image } from "react-bootstrap";
import { TasksData } from "../../../data/task";
import { truncateString } from "../../../util/text";

const Tasks = () => {
  return (
    <div className={task.taskcontainer}>
      <p className={task.header1}>TASKS</p>
      <Table striped className={task.tablestriped}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Due</th>
            <th>Approved</th>
            <th>Pending</th>
            <th>Declined</th>
          </tr>
        </thead>
        <tbody>
          {TasksData.map((Taskdata, index) => (
            <tr key={index}>
              <td className={task.align}>
                <div className={task.flexcontent}>
                  {Taskdata.star === "starred" ? (
                    <Icon imagelink="/icons/dashboard/task/starred.svg" />
                  ) : (
                    <Icon imagelink="/icons/dashboard/task/star.svg" />
                  )}
                  <div className={task.centertext}>
                    <p className={task.tasktitle}>
                      {truncateString(Taskdata.name, 10)}
                    </p>
                  </div>
                </div>
              </td>
              <td className={task.align}>{Taskdata.date}</td>
              <td className={task.centericon}>
                {Taskdata.approved === true ? (
                  <Icon imagelink="/icons/dashboard/task/progress-true.svg" />
                ) : (
                  <Icon imagelink="/icons/dashboard/task/progress-failed.svg" />
                )}
              </td>
              <td className={task.centericon}>
                {Taskdata.pending === true ? (
                  <Icon imagelink="/icons/dashboard/task/pending-true.svg" />
                ) : (
                  <Icon imagelink="/icons/dashboard/task/pending-failed.svg" />
                )}
              </td>
              <td className={task.centericon}>
                {Taskdata.declined === true ? (
                  <Icon imagelink="/icons/dashboard/task/close-true.svg" />
                ) : (
                  <Icon imagelink="/icons/dashboard/task/close-failed.svg" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={task.rightbuttoncontainer}>
        <button className={task.modalbutton}>
          View all
          <Image
            src="/icons/notification/arrow-down.svg"
            class="img-fluid"
            className={task.arrowdown}
            alt="arrow-down"
          />
        </button>
      </div>
    </div>
  );
};

export default Tasks;

const Icon = (props) => {
  return <Image src={`${props.imagelink}`} alt="icon" />;
};
