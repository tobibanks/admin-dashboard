import React, { useState } from "react";
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
import ModalTask from "../tasks/ModalTask";

const ModalProject = (props) => {
  const { data: UserProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: UserProjectTask } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ModalProjectsCollection = UserProjects || [];

  console.log(ModalProjectsCollection);

  const ModalTasks = UserProjectTask || [];

  const [id, setId] = useState();
  const navigate = useNavigate();

  // console.log(ModalTasks.project.length);

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
            {console.log(collect)}
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
                        <p className={modal.taskname}>Tasks</p>
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
                              {console.log(props.id)}
                              {ModalTasks.map((task, index) =>
                                props.id === task.project.id ? (
                                  <Form.Check
                                    type="checkbox"
                                    key={index}
                                    id="custom-switch"
                                    label={task?.name}
                                  />
                                ) : null
                              )}
                            </Form>
                            <div className={modal.flexheader2}>
                              <div className={modal.absolutecenter}>
                                <p className={modal.seetext}>See More</p>
                              </div>
                              <Image src="/icons/arrow-down.svg" />
                            </div>
                          </div>
                        </div>
                        <div className={modal.absolutebuttoncenter}>
                          <div
                            className={modal.buttonname}
                            onClick={() => {
                              setId(props.id);
                              id &&
                                navigate(generatePath("/addtask/:id", { id }));
                            }}
                          >
                            <p className={modal.buttontext}>Add Task</p>
                          </div>
                        </div>
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
                            setId(props.id);
                            id &&
                              navigate(
                                generatePath("/assignproject/:id", { id })
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
                          {/* {console.log(collect)} */}
                          {
                            collect?.activities?.map((activities, index) => {
                              return (
                                <div>
                                  {activities.action === "assigned" ? (
                                    <AssignedActivitycontainer
                                      src="/icons/activity/add.svg"
                                      date={activities.date}
                                      type={activities.action_type}
                                      name={activities.initiator}
                                      assignee={activities.ref.name}
                                    />
                                  ) : null}
                                </div>
                              );
                            })
                            /* <Activitycontainer
                            src="/icons/activity/activity.svg"
                            description="Admin declined task:"
                            name="Raise Center Pavement"
                            date="Added at 02/02/2023 - 10 AM"
                          />
                          <Activitycontainer
                            src="/icons/activity/check.svg"
                            description="Admin approved task:"
                            name="Raise Center Pavement"
                            date="Added at 02/02/2023 - 10 AM"
                          />
                          <Activitycontainer
                            src="/icons/activity/time.svg"
                            description="John Doe requested task approval"
                            // name="Raise Center Pavement"
                            date="Added at 02/02/2023 - 10 AM"
                          />
                          <Activitycontainer
                            src="/icons/activity/add.svg"
                            description="Admin assigned Tasks to John doe"
                            // name="Raise Center Pavement"
                            date="Added at 02/02/2023 - 10 AM"
                          />
                          <Activitycontainer
                            src="/icons/activity/user.svg"
                            description="Admin assigned John Doe as new project manager"
                            // name="Raise Center Pavement"
                            date="Added at 02/02/2023 - 10 AM"
                          /> */
                          }
                          {/* <div
                        className={modal.buttonname}
                        onClick={() => {
                          setId(props.id);
                          id &&
                            navigate(generatePath("/addtask/:id", { id }));
                        }}
                      >
                        <p className={modal.buttontext}>Assign Project</p>
                      </div> */}
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
