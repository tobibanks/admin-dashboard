import React, { useState, useEffect } from "react";
import { Modal, Image } from "react-bootstrap";
import { ProjectsCollection } from "../../../data/projects";
import modal from "./general.module.css";
import "./Modal.css";
import Form from "react-bootstrap/Form";
import { Link, generatePath, useNavigate } from "react-router-dom";
import "./Modal.css";
import {
  useGetProjectDetailsQuery,
  useGetTaskDetailsQuery,
  useGetProjectSpecificTaskQuery,
} from "@/app/services/auth/authService";

const ModalProject = (props) => {
  const { data: UserProjects } = useGetProjectDetailsQuery({
    // refetchOnMountOrArgChange: true,
  });

  const { data: UserProjectTask } = useGetTaskDetailsQuery({
    // refetchOnMountOrArgChange: true,
  });

  const { data: task } = useGetProjectSpecificTaskQuery(props.id);

  console.log(props);

  const [more, setMore] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeItemsCount, setActiveItemsCount] = useState(0);
  const ModalProjectsCollection = UserProjects || [];

  const ModalTasks = UserProjectTask || [];

  const specifictask = task || [];

  console.log(specifictask);
  const navigate = useNavigate();

  console.log(activeItemsCount);

  // const totalSum = useMemo(() =>
  //   Object.entries(checked).reduce(accumulator, [id])
  // );
  const changeHandler = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (!isActive) {
      setActiveItemsCount((prevCount) => {
        if (prevCount !== 0) {
          return prevCount - 1;
        }

        return prevCount;
      });
    }

    if (isActive) {
      setActiveItemsCount((prevCount) => prevCount + 1);
    }
  }, [isActive, setActiveItemsCount]);
  return (
    <Modal
      className={modal.modal}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {ModalProjectsCollection.map((collect, index) =>
        props.id === collect._id ? (
          <div key={index}>
            <Modal.Header closeButton>
              <Modal.Title
                className={modal.containedmodaltitlecenter}
                id="contained-modal-title-vcenter"
              >
                <div className={modal.flexheader}>
                  <StatusButton text={collect.admin_Status} />
                  <CalendarText
                    datetitle="Project created:"
                    date={new Date(collect.date).toLocaleDateString()}
                  />
                  <CalendarText
                    datetitle="Due date:"
                    date={new Date(collect.due).toLocaleDateString()}
                  />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={modal.modalbody}>
              <div className={modal.flexequalcontainer}>
                <div className={modal.descriptionleftcontainer}>
                  <div className={modal.paddingcontain}>
                    <p className={modal.nameproject}>{collect.name}</p>
                    <p className={modal.description}>{collect.details}</p>
                    <p className={modal.assigned}>Assigned to:</p>
                    {collect.assigned_to ? (
                      <div>
                        <div className={modal.yellowbackground}>
                          <Image
                            src="/images/avatar.png"
                            className={modal.imageavatar}
                            alt="avatar"
                          />
                          <div className={modal.absolutecenter}>
                            <p className={modal.textname}>
                              {" "}
                              {collect.assigned_to?.firstname || null} &nbsp;
                              <span>
                                {collect.assigned_to?.lastname || null}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className={modal.absolutebuttoncenter}>
                          <p className={modal.taskname}>Tasks</p>
                          <div
                            className={modal.buttonname}
                            onClick={() => {
                              props.id &&
                                navigate(
                                  generatePath("/addtask/:id", { id: props.id })
                                );
                            }}
                          >
                            <p className={modal.buttontext}>Add Task</p>
                          </div>
                        </div>
                        <div className={modal.taskcontainer}>
                          <div className={modal.taskheader}>
                            <div className={modal.flexheader}>
                              <Image
                                src="/icons/sidebar/tasks-icon.svg"
                                alt="task-icon"
                              />
                              <div className={modal.absolutecenter}>
                                <p className={modal.headertext1}>All Tasks</p>
                              </div>
                            </div>
                            <div className={modal.absolutecenter}>
                              <p className={modal.headertext1}>
                                {/* 0 / {ModalTasks.map((task,index) => props.id === task.project.id ? )} */}
                              </p>
                            </div>
                          </div>
                          {/* <div className={modal.progressbar}>
                            <div className={modal.progressyellow}></div>
                          </div> */}
                          <div className={modal.formcontainer}>
                            <Form>
                              {specifictask.length < 3 ? (
                                <div>
                                  {specifictask?.map((task, index) => (
                                    <Form.Check
                                      type="checkbox"
                                      key={index}
                                      checked={isActive}
                                      onChange={changeHandler}
                                      id="custom-switch"
                                      label={task?.name}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <div>
                                  {more ? (
                                    <>
                                      <div>
                                        {specifictask?.map((task, index) => (
                                          <Form.Check
                                            type="checkbox"
                                            key={index}
                                            checked={isActive}
                                            onChange={changeHandler}
                                            id="custom-switch"
                                            label={task?.name}
                                          />
                                        ))}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {specifictask
                                        ?.slice(0, 3)
                                        .map((task, index) => (
                                          <div>
                                            <Form.Check
                                              type="checkbox"
                                              key={index}
                                              checked={isActive}
                                              onChange={changeHandler}
                                              id="custom-switch"
                                              label={task?.name}
                                            />
                                          </div>
                                        ))}
                                    </>
                                  )}
                                  {more ? (
                                    <p
                                      className={modal.title1}
                                      onClick={() => setMore(!more)}
                                    >
                                      See Less
                                    </p>
                                  ) : (
                                    <p
                                      className={modal.title1}
                                      onClick={() => setMore(!more)}
                                    >
                                      See More
                                    </p>
                                  )}
                                </div>
                              )}
                            </Form>
                            {/* <div className={modal.flexheader2}>
                              <div className={modal.absolutecenter}>
                                <p className={modal.seetext}>See More</p>
                              </div>
                              <Image src="/icons/arrow-down.svg" />
                            </div> */}
                          </div>
                        </div>
                        {/* <div className={modal.absolutebuttoncenter}>
                          <div className={modal.buttonname} onClick={addTask}>
                            <p className={modal.buttontext}>Add Task</p>
                          </div>
                        </div> */}
                        <p className={modal.taskname}>Attachment</p>
                        <div className={modal.attachmentflex}>
                          {collect.attachments.length > 1 ? (
                            collect.attachments
                              .slice(0, 3)
                              .map((attachment, index) => (
                                <Attachment
                                  key={index}
                                  imagelink={attachment.type}
                                  attachmentname={attachment.name}
                                  attachmentsize={attachment.size}
                                />
                              ))
                          ) : (
                            <div className={modal.absolutebuttoncenter}>
                              <div className={modal.buttonname}>
                                <p className={modal.buttontext}>
                                  See All Attachments
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // <Link to="/project/form">
                      <div className={modal.absolutebuttoncenter}>
                        <div
                          className={modal.buttonname}
                          onClick={() => {
                            props.id &&
                              navigate(
                                generatePath("/assignproject/:id", {
                                  id: props.id,
                                })
                              );
                          }}
                        >
                          <p className={modal.buttontext}>Assign Project</p>
                        </div>
                      </div>
                      // </Link>
                    )}
                  </div>
                </div>
                <div className={modal.descriptionrightcontainer}>
                  <div className={modal.activitycontainer1}>
                    <p className={modal.activitytext}>Recent Activity</p>
                    {ModalProjectsCollection.map((collect, index) =>
                      props.id === collect._id ? (
                        <div
                          className={modal.activityboardcontainer}
                          key={index}
                        >
                          {collect.activities.length < 1 ? (
                            <div>
                              <p className={modal.nothing}>No new activities</p>
                            </div>
                          ) : (
                            <>
                              {collect?.activities?.map((activities, index) => {
                                return (
                                  <div key={index}>
                                    {activities.action_type ===
                                    "project manager" ? (
                                      <AssignedActivitycontainer
                                        src="/icons/activity/user.svg"
                                        date={activities.date}
                                        type={activities.action_type}
                                        name={activities.initiator}
                                        assignee={activities.ref.name}
                                      />
                                    ) : activities.action_type === "task" ? (
                                      <AssignedTaskTitle
                                        src="/icons/activity/add.svg"
                                        date={activities.date}
                                        type={activities.action_type}
                                        name={activities.initiator}
                                        assignee={activities.ref.name}
                                      />
                                    ) : null}
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        ) : null
      )}
    </Modal>
  );
};

export default ModalProject;

const StatusButton = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? modal.statusbutton
          : props.text === "Complete"
          ? modal.completebutton
          : props.text == "Requested"
          ? modal.requestedbutton
          : null
      }
    >
      <p className={modal.statusbuttontext}>{props.text}</p>
    </div>
  );
};

const CalendarText = (props) => {
  return (
    <div className={modal.calendartextcontainer}>
      <p className={modal.datetitletext}>{props.datetitle}</p>
      <div className={modal.icontextcontainer}>
        <Image
          src="/icons/calendar.svg"
          className={modal.calendaricon}
          alt="priority"
        />
        <p className={modal.datetext}>{props.date}</p>
      </div>
    </div>
  );
};

const Attachment = (props) => {
  return (
    <div className={modal.attachmentcontainer}>
      <div className={modal.absolutecenter}>
        {props.imagelink === "image/jpeg" ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : props.imagelink === "image/png" ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : null}
      </div>
      <div>
        <p className={modal.attachmenttext}>
          {props.attachmentname.substring(0, 7)}
        </p>
        <p className={modal.attachmentsize}>
          {Math.round(props.attachmentsize / 1000) + "kb"}
        </p>
      </div>
    </div>
  );
};

const AssignedActivitycontainer = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} assigned {props.type} as new {props.assignee}
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

const AssignedTaskTitle = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} assigned {props.type} to {props.assignee}
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

const AssignedApproved = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} {props.type} task :{" "}
          <span className={modal.taskassign}>{props.assignee}</span>
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

const AssignedDeclined = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} {props.type} task :{" "}
          <span className={modal.taskassign}>{props.assignee}</span>
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};

const AssignedRequested = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.name} {props.type} task approval
          {/* <span className={modal.spantext}>{props.name}</span> */}
        </p>
        <p className={modal.activitydate}>
          {" "}
          Added at{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })}
        </p>
      </div>
    </div>
  );
};
