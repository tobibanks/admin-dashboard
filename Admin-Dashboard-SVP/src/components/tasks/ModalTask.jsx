import React, { useState } from "react";
import modal from "./tasktable.module.css";
import { Modal, Image } from "react-bootstrap";
import { MdOutlineCloudUpload } from "react-icons/md";
import "../project/Modal.css";
import { useGetTaskDetailsQuery } from "../../app/services/auth/authService";
import { generatePath, useNavigate } from "react-router-dom";

const ModalTask = (props) => {
  const { data: AdminTasks } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ModalTaskCollection = AdminTasks || [];

  const [id, setId] = useState();
  const navigate = useNavigate();
  // console.log(ModalTaskCollection[4].attachments);

  return (
    <Modal
      className={modal.modal}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {ModalTaskCollection.map((collect, index) =>
        props.id === collect._id ? (
          <div key={index}>
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
                    date={new Date(collect.date).toLocaleDateString()}
                  />
                  <CalendarText
                    datetitle="Due date:"
                    date={new Date(collect.due).toLocaleDateString()}
                  />
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
                        <p className={modal.nameproject}>{collect.name}</p>
                        {collect.priority === "red" ? (
                          <Image src="/icons/table/redflag.svg" />
                        ) : collect.priority === "gray" ? (
                          <Image src="/icons/table/normalflag.svg" />
                        ) : collect.priority === "yellow" ? (
                          <Image src="/icons/table/warningflag.svg" />
                        ) : null}
                      </div>
                      <div>
                        <div className={modal.buttonname}>
                          <p className={modal.buttontext}>
                            Upload Attachments <MdOutlineCloudUpload />
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className={modal.description}>{collect.description}</p>
                    <p className={modal.assigned}>Assigned to:</p>
                    <div className={modal.yellowbackground}>
                      <Image src="/images/avatar.png" alt="avatar" />
                      <div className={modal.absolutecenter}>
                        <p className={modal.textname}>
                          {" "}
                          {collect.assigned_to?.firstname || null} &nbsp;
                          <span>{collect.assigned_to?.lastname || null}</span>
                        </p>
                      </div>
                    </div>
                    <p className={modal.instructionheading}>Instruction</p>
                    <p className={modal.instruction}>{collect.instruction}</p>

                    <p className={modal.taskname}>Attachment</p>
                    <div className={modal.attachmentflex}>
                      {collect.attachments.length > 1 ? (
                        collect.attachments.map((attachments, index) => {
                          return (
                            <div
                              key={index}
                              style={{ display: "flex", gap: "2rem" }}
                            >
                              {console.log(attachments)}
                              {attachments
                                .slice(0, 2)
                                .map((attachment, index) => (
                                  <div>
                                    {console.log(attachment)}
                                    <Attachment
                                      key={index}
                                      name={attachment.name}
                                      imagelink={attachment.type}
                                      size={attachment.size}
                                    />
                                  </div>
                                ))}
                            </div>
                          );
                        })
                      ) : (
                        <p>No attachments</p>
                      )}
                    </div>
                    <div className={modal.absolutebuttoncenter}>
                      <div className={modal.buttonname1}>
                        <p className={modal.buttontext1}>See All Attachments</p>
                      </div>
                    </div>
                    <div className={modal.bottomcontainer}>
                      <div
                        className={modal.buttonname}
                        onClick={() => {
                          setId(props.id);
                          id &&
                            navigate(generatePath("/taskapproval/:id", { id }));
                        }}
                      >
                        <p className={modal.buttontext}>
                          Review Approval Request
                        </p>
                      </div>
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
      {/* <div className={modal.absolutecenter}> */}
      {props.imagelink === "image/jpeg" ? (
        <Image src="/icons/jpg.svg" alt="jpg" />
      ) : props.imagelink === "image/png" ? (
        <Image src="/icons/jpg.svg" alt="jpg" />
      ) : null}
      {/* </div> */}
      <div>
        <p className={modal.attachmenttext}>{props.name}</p>
        <p className={modal.attachmentsize}>
          {Math.round(props.size / 1000) + "kb"}
        </p>
      </div>
    </div>
  );
};
