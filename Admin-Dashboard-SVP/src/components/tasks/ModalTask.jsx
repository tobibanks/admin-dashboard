import React from "react";
import modal from "./tasktable.module.css";
import { TasksCollection } from "../../../data/task";
import { Modal, Image } from "react-bootstrap";
import { MdOutlineCloudUpload } from "react-icons/md";
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
                    <div className={modal.flexmodalcontainer}>
                      <div className={modal.firstphase}>
                        <p className={modal.nameproject}>{collect.task}</p>
                        {collect.priority === "important" ? (
                          <Image src="/icons/table/redflag.svg" />
                        ) : collect.priority === "normal" ? (
                          <Image src="/icons/table/normalflag.svg" />
                        ) : collect.priority === "warning" ? (
                          <Image src="/icons/table/warningflag.svg" />
                        ) : null}
                      </div>
                      <div>
                        <div className={modal.buttonname}>
                          <p className={modal.buttontext}>
                            Upload Attachments{" "}
                            <MdOutlineCloudUpload />
                          </p>
                        </div>
                      </div>
                    </div>
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
          className={modal.calendaricon1}
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
