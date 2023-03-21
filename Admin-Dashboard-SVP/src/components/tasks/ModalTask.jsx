import React from "react";
import modal from "./tasktable.module.css";
import { TasksCollection } from "../../../data/task";
import { Modal, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../project/Modal.css";

const ImageAttachment = [
  {
    src: "/icons/pdf.svg",
    attachmentname: "Site Clearing.pdf",
    attachmentsize: "2 MB",
  },
  {
    src: "/icons/jpg.svg",
    attachmentname: "Site Clearing.jpg",
    attachmentsize: "2 MB",
  },
];

const ModalTask = (props) => {
  return (
    <Modal
      className={modal.modal}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {TasksCollection.map((collect, index) =>
        props.id === collect.id ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title
                className={modal.containedmodaltitlecenter}
                id="contained-modal-title-vcenter"
              >
                {/* <div className={modal.absolutecenter}> */}
                <div className={modal.flexheader}>
                  <StatusButton text={collect.status} />
                  <CalendarText
                    datetitle="Project created:"
                    date="02 Feb 2023"
                  />
                  <CalendarText datetitle="Due date:" date="02 Apr 2023" />
                </div>
                {/* </div> */}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={modal.modalbody}>
              <div className={modal.flexequalcontainer}>
                <div className={modal.descriptionleftcontainer}>
                  <div className={modal.paddingcontain}>
                    <p className={modal.nameproject}>{collect.name}</p>
                    <p className={modal.description}>{collect.description}</p>
                    <p className={modal.assigned}>Assigned to:</p>
                    <div className={modal.yellowbackground}>
                      <Image
                        src="/images/avatar.png"
                        className={modal.imageavatar}
                        alt="avatar"
                      />
                      <div className={modal.absolutecenter}>
                        <p className={modal.textname}>{collect.personname}</p>
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

                    <p className={modal.taskname}>Attachment</p>
                    <div className={modal.attachmentflex}>
                      {ImageAttachment.map((attachment, index) => (
                        <Attachment
                          key={index}
                          imagelink={attachment.src}
                          attachmentname={attachment.attachmentname}
                          attachmentsize={attachment.attachmentsize}
                        />
                      ))}
                    </div>
                    <div className={modal.absolutebuttoncenter}>
                      <div className={modal.buttonname}>
                        <p className={modal.buttontext}>See All Attachments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        ) : null
      )}
    </Modal>
  );
};

export default ModalTask;

const StatusButton = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? modal.statusbutton
          : props.text === "Declined"
          ? modal.declinedbutton
          : props.text == "Approved"
          ? modal.approvedbutton
          : props.text == "Pending"
          ? modal.pendingbutton
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
        <Image
          src={`${props.imagelink}`}
          alt="image-link"
          className={modal.attachmentimage}
        />
      </div>
      <div>
        <p className={modal.attachmenttext}>{props.attachmentname}</p>
        <p className={modal.attachmentsize}>{props.attachmentsize}</p>
      </div>
    </div>
  );
};
