import React, { useState } from "react";
import task from "./User.module.css";
import "./Modal.css";
import Table from "react-bootstrap/Table";
import { Image } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import ModalTask from "@/components/tasks/ModalTask";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  useAddStarTaskMutation,
  useGetTaskDetailsQuery,
} from "../../app/services/auth/authService";
import { Link } from "react-router-dom";
import moment from "moment";
import { truncateString } from "./../../../util/text";

const Tasks = () => {
  const {
    data: TaskCollection,
    isLoading,
    refetch,
  } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const TasksTableCollection = TaskCollection || [];

  const [setting, setSetting] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const [addStarMutation] = useAddStarTaskMutation();

  const sortedArray = [
    ...TasksTableCollection.filter((item) => item.star === true),
    ...TasksTableCollection.filter((item) => item.star === false),
  ];

  // var options = { day: "numeric", month: "short" };

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
                      <th className={task.heading}>In Progress</th>
                      <th className={task.heading}>Pending</th>
                      <th className={task.heading}>Complete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedArray.slice(0, 8).map((Taskdata, index) => (
                      <tr key={index}>
                        <td className={task.align}>
                          <div className={task.flexcontent}>
                            {Taskdata.star ? (
                              <div
                                onClick={async (id) => {
                                  try {
                                    await toast.promise(
                                      addStarMutation(Taskdata._id).unwrap(),
                                      {
                                        loading: "Saving",
                                        success: "Starred",
                                        error: "Failed to star",
                                      }
                                    );
                                    // toast.success("Project Registered Successfully");
                                    refetch();
                                  } catch (error) {
                                    toast.error(error.status);
                                  }
                                }}
                              >
                                <Icon imagelink="/icons/dashboard/task/starred.svg" />
                              </div>
                            ) : (
                              <div
                                onClick={async (id) => {
                                  try {
                                    await toast.promise(
                                      addStarMutation(Taskdata._id).unwrap(),
                                      {
                                        loading: "Saving",
                                        success: "Starred",
                                        error: "Failed to star",
                                      }
                                    );
                                    // toast.success("Project Registered Successfully");
                                    refetch();
                                  } catch (error) {
                                    toast.error(error.status);
                                  }
                                }}
                              >
                                <Icon imagelink="/icons/dashboard/task/star.svg" />
                              </div>
                            )}
                            <div
                              onClick={() => {
                                setSetting(Taskdata._id);
                                setModalShow(true);
                              }}
                              className={task.centertext}
                            >
                              <p className={task.tasktitle}>
                                {truncateString(Taskdata?.name, 7)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={task.align}>
                          {moment(Taskdata.date).format("D/MM")}
                        </td>
                        <td className={task.centericon}>
                          {Taskdata.status === "In Progress" ? (
                            <Icon imagelink="/icons/dashboard/task/progress-true.svg" />
                          ) : (
                            <Icon imagelink="/icons/dashboard/task/progress-failed.svg" />
                          )}
                        </td>
                        <td className={task.centericon}>
                          {Taskdata.status === "Awaiting Approval" ? (
                            <Icon imagelink="/icons/dashboard/task/pending-true.svg" />
                          ) : (
                            <Icon imagelink="/icons/dashboard/task/pending-failed.svg" />
                          )}
                        </td>
                        <td className={task.centericon}>
                          {Taskdata.status === "Approved" ? (
                            <Icon imagelink="/icons/dashboard/task/close-true.svg" />
                          ) : (
                            <Icon imagelink="/icons/dashboard/task/close-failed.svg" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {TasksTableCollection.length > 8 ? (
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
                ) : null}
              </>
            ) : (
              <div style={{ marginBottom: "3rem" }}>
                <p className={task.nothing}>There are no tasks</p>
              </div>
            )}
          </div>
        )}
      </div>
      <ModalTask
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={setting}
      />
      <Toaster
        position="top-left"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
};

export default Tasks;

const Icon = (props) => {
  return <Image src={`${props.imagelink}`} alt="icon" />;
};
