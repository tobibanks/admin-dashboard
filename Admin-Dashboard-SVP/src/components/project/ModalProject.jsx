import React, { useState } from "react";
import { Modal, Image } from "react-bootstrap";
import { ProjectsCollection } from "../../../data/projects";
import modal from "./general.module.css";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import "./Modal.css";
import {
  useGetProjectDetailsQuery,
  useGetProjectSpecificTaskQuery,
} from "@/app/services/auth/authService";

const ModalProject = (props) => {
  const { data: UserProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: UserProjectTask } = useGetProjectSpecificTaskQuery({
    refetchOnMountOrArgChange: true,
  });

  const ModalProjectsCollection = UserProjects || [];

  console.log(ModalProjectsCollection);

  const specificUserProjectTask = UserProjectTask || [];

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
                      <div className={modal.yellowbackground}>
                        <Image
                          src="/images/avatar.png"
                          className={modal.imageavatar}
                          alt="avatar"
                        />
                        <div className={modal.absolutecenter}>
                          <p className={modal.textname}>
                            {" "}
                            {collect.assigned_to?.firstname || null}
                            <span>{collect.assigned_to?.lastname || null}</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Link to="/project/form">
                        <div className={modal.absolutebuttoncenter}>
                          <div className={modal.buttonname}>
                            <p className={modal.buttontext}>Add New Project</p>
                          </div>
                        </div>
                      </Link>
                    )}
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
                          <p className={modal.headertext1}>5/10</p>
                        </div>
                      </div>
                      <div className={modal.progressbar}>
                        <div className={modal.progressyellow}></div>
                      </div>
                      <div className={modal.formcontainer}>
                        <Form>
                          <Form.Check
                            defaultChecked
                            type="checkbox"
                            id="custom-switch"
                            label="Site Clearing"
                          />
                          <Form.Check
                            defaultChecked
                            type="checkbox"
                            label="Site Clearing"
                            id="disabled-custom-switch"
                          />
                          <Form.Check
                            type="checkbox"
                            label="Site Clearing"
                            id="disabled-custom-switch"
                          />
                        </Form>
                        <div className={modal.flexheader2}>
                          <div className={modal.absolutecenter}>
                            <p className={modal.seetext}>See More</p>
                          </div>
                          <Image src="/icons/arrow-down.svg" />
                        </div>
                      </div>
                    </div>
                    {/* {collect.assigned_to ? null : (
                      <Link to="/project/form">
                        <div className={modal.absolutebuttoncenter}>
                          <div className={modal.buttonname}>
                            <p className={modal.buttontext}>Add New Project</p>
                          </div>
                        </div>
                      </Link>
                    )} */}
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
                </div>
                <div className={modal.descriptionrightcontainer}>
                  <div className={modal.activitycontainer1}>
                    <p className={modal.activitytext}>Recent Activity</p>
                    <div className={modal.activityboardcontainer}>
                      <Activitycontainer
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
                      />
                    </div>
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
          : props.text == "Upcoming"
          ? modal.upcoming
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
        <p className={modal.attachmenttext}>{props.attachmentname}</p>
        <p className={modal.attachmentsize}>
          {Math.round(props.attachmentsize / 1000) + "kb"}
        </p>
      </div>
    </div>
  );
};

const Activitycontainer = (props) => {
  return (
    <div className={modal.activitycontainer}>
      <Image src={`${props.src}`} className={modal.imageactivity} />
      <div className={modal.spacecontainer}>
        <p className={modal.activitydescription}>
          {props.description}
          <span className={modal.spantext}>{props.name}</span>
        </p>
        <p className={modal.activitydate}>{props.date}</p>
      </div>
    </div>
  );
};
