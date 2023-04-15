import React from "react";
import task from "./User.module.css";
import "./Modal.css";
import Table from "react-bootstrap/Table";
import { Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useGetTaskDetailsQuery } from "../../app/services/auth/authService";
import { Link } from "react-router-dom";

const Tasks = () => {
  const { data: TaskCollection, isLoading } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  console.log(TaskCollection?.length);

  const TasksTableCollection = TaskCollection || [];
  // var options = { day: "numeric", month: "short" };
  console.log(TasksTableCollection?.length);
  return (
    <div className={task.taskcontainer}>
      <p className={task.header1}>TASKS</p>
      <div>
        {isLoading ? (
          <Skeleton width={300} baseColor="#ebab34" highlightColor="#f2cb07" />
        ) : (
          <div>
            {TaskCollection?.length >= 1 ? (
              <>
                <Table className={task.tablestriped}>
                  <thead>
                    <tr>
                      <th className={task.heading}>Task</th>
                      <th className={task.heading}>Due</th>
                      <th className={task.heading}>Approved</th>
                      <th className={task.heading}>Pending</th>
                      <th className={task.heading}>Declined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TasksTableCollection.map((Taskdata, index) => (
                      <tr key={index}>
                        <td className={task.align}>
                          <div className={task.flexcontent}>
                            {Taskdata.star === true ? (
                              <Icon imagelink="/icons/dashboard/task/starred.svg" />
                            ) : (
                              <Icon imagelink="/icons/dashboard/task/star.svg" />
                            )}
                            <div className={task.centertext}>
                              <p className={task.tasktitle}>
                                {Taskdata?.name?.substring?.(0, 9)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={task.align}>
                          {new Date(Taskdata.date).toLocaleDateString()}
                        </td>
                        <td className={task.centericon}>
                          {Taskdata.status === "Approved" ? (
                            <Icon imagelink="/icons/dashboard/task/progress-true.svg" />
                          ) : (
                            <Icon imagelink="/icons/dashboard/task/progress-failed.svg" />
                          )}
                        </td>
                        <td className={task.centericon}>
                          {Taskdata.status === "In Progress" ? (
                            <Icon imagelink="/icons/dashboard/task/pending-true.svg" />
                          ) : (
                            <Icon imagelink="/icons/dashboard/task/pending-failed.svg" />
                          )}
                        </td>
                        <td className={task.centericon}>
                          {Taskdata.status === "Declined" ? (
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
                  <Link to="/task">
                    <button className={task.modalbutton}>
                      View all
                      <Image
                        src="/icons/notification/arrow-down.svg"
                        class="img-fluid"
                        className={task.arrowdown}
                        alt="arrow-down"
                      />
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <div style={{ marginBottom: "3rem" }}>
                <p className={task.nothing}>There are no tasks</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

const Icon = (props) => {
  return <Image src={`${props.imagelink}`} alt="icon" />;
};
