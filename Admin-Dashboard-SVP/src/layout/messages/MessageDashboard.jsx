import React, { useState, useMemo, useEffect, useRef } from "react";
import { Container, Image, Form, Button } from "react-bootstrap";
import message from "./message.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useGetAllMessagesQuery } from "../../app/services/auth/authService";
import { useForm } from "react-hook-form";
import { getInitials } from "../../../util/text";
import moment from "moment";
import { LoaderIcon } from "react-hot-toast";
import useSendMessage from "../../hooks/useSendMessage";
import { useCollection } from "./../../hooks/useCollection";

const MessageDashboard = () => {
  // const [id, setId] = useState("");
  // fetching users and details about them
  const { data: allMessagesDetails } = useGetAllMessagesQuery();

  // preventing code break. displays empty array till the messages loas
  const messageDetails = allMessagesDetails || [];

  // getting the first object in the array of objects and copying it into a variable
  var first = [...messageDetails].shift();

  // declaring new array
  var newArray = [];

  // pushing the object into a new array
  newArray.push(first);

  // logic of line 32 was done so as to return an array cause using an index will return an object which can't be mapped. directly using the object will involve multiple containers
  // filter states
  const [filter, setFilter] = useState();

  // useMemo hook to filter message details according to each user
  const data = useMemo(() => {
    if (!filter) return [];
    const filteredData = messageDetails.filter((item) => item._id === filter);
    return filteredData;
  }, [filter, messageDetails]);

  // useForm hook
  const { register, reset, handleSubmit } = useForm();

  //closing of messages that involves group chats
  const [open, setOpen] = useState(true);

  const { error, sendMessage } = useSendMessage();

  // form hook submission of messages
  const submitForm = async (msg) => {
    reset();
    const time = new Date().getTime();
    reset();
    await sendMessage(filter, msg, time).then(() => {
      reset();
    });
  };

  // useEffect to refresh every 1seconds to check for new mwssages
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [defaultState, setDefaultState] = useState(true);
  const { documents: messages, loading } = useCollection(
    `messages/${filter}/messages`
  );

  const allMessages =
    messages.sort((a, b) => a.time_stamp - b.time_stamp) || [];

  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  return (
    <Container className={message.container}>
      <DashboardLayout name="Messages">
        <div className={message.overallcontainer}>
          <div className={message.messagecontentcontainer}>
            <div className={message.usercontainer}>
              <div className={message.userheadercontainer}>
                <div className={message.searchiconcontainer}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className={message.search}
                  ></input>
                  <Image
                    src="/icons/search.svg"
                    className={message.searchicon}
                  />
                </div>
              </div>
              <div className={message.userslistcontainer}>
                {messageDetails.map((messageDetail, index) => {
                  const active = filter === messageDetail._id;
                  return (
                    <div
                      className={
                        active
                          ? message.userviewcontaineractive
                          : message.userviewcontainer
                      }
                      key={index}
                      filter={newArray[0]._id}
                      onClick={() => {
                        setFilter(messageDetail._id), setDefaultState(false);
                      }}
                    >
                      <div
                        flex={message.userinfocontainer}
                        style={{ display: "flex", gap: "1rem" }}
                      >
                        {messageDetail?.project?.name ? (
                          <>
                            {active ? (
                              <img src="/icons/profile-icon.svg" alt="avatar" />
                            ) : (
                              <img
                                src="/icons/profile-icon-black.svg"
                                alt="avatar"
                              />
                            )}
                          </>
                        ) : messageDetail?.admin?.name?.includes("(PM)") ? (
                          <div
                            style={{
                              borderRadius: "50%",
                              padding: "5px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "white",
                            }}
                          >
                            <Image
                              src="/svp-Logo-Favicon.png"
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: "50%",
                              }}
                              alt="pm-logo"
                            />
                          </div>
                        ) : (
                          <>
                            {active ? (
                              <div className={message.absolutecenter}>
                                <p className={message.avataractive}>
                                  {getInitials(
                                    messageDetail?.admin?.name || ""
                                  )}
                                </p>
                              </div>
                            ) : (
                              <div className={message.absolutecenter}>
                                <p className={message.avatar}>
                                  {getInitials(
                                    messageDetail?.admin?.name || ""
                                  )}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                        <div className={message.absolutecenter}>
                          <div>
                            <p
                              className={
                                active
                                  ? message.usernameactive
                                  : message.username
                              }
                            >
                              {messageDetail.admin.name}
                            </p>
                            {messageDetail?.project?.name ? (
                              <p
                                className={
                                  active
                                    ? message.projectnameactive
                                    : message.projectname
                                }
                              >
                                {messageDetail?.project?.name}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* <p
                          className={active ? message.activetime : message.time}
                        >
                          Just Now
                        </p> */}
                        {/* <Image src="/icons/three-dots.svg" alt="options" /> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={message.messagesviewcontainer}>
              <div className={message.messageheadercontainer}>
                <div className={message.flexmessageheadercontainer}>
                  <div className={message.absolutecenter}>
                    <Image src="/icons/mail.svg" alt="mail" />
                  </div>
                  <div>
                    {data.map((dat, index) => {
                      return (
                        <div key={index} className={message.absolutecenter}>
                          <div>
                            <p className={message.headertitle}>{dat?.title}</p>
                            <p className={message.listpeople}>
                              {dat?.admin?.participants}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {defaultState ? (
                  <div className={message.chatcontainerempty}>
                    <p className={message.chatempty}>No Messages Selected</p>
                  </div>
                ) : (
                  <>
                    <div className={message.chatcontainer}>
                      {data.map((project, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              width: "100%",
                              flexDirection: "column",
                              display: "flex",
                              height: "80vh",
                              justifyContent: "flex-end",
                            }}
                          >
                            {project?.type === "project" ? (
                              <>
                                {open ? (
                                  <div
                                    className={message.detailsmessagecontainer}
                                  >
                                    <Image
                                      src="/icons/close.svg"
                                      className={message.close}
                                      alt="close"
                                      onClick={() => setOpen(false)}
                                    />
                                    <div
                                      className={
                                        message.messagedetailscontainer
                                      }
                                    >
                                      <div
                                        className={
                                          message.messagetitlecontainer
                                        }
                                      >
                                        <p className={message.messagetitle}>
                                          Project:
                                        </p>
                                      </div>
                                      <div
                                        className={message.messagedescription}
                                      >
                                        <p
                                          className={
                                            message.messagedescription1
                                          }
                                        >
                                          {project?.project?.name}
                                        </p>
                                      </div>
                                    </div>

                                    <div
                                      className={
                                        message.messagedetailscontainer
                                      }
                                    >
                                      <div
                                        className={
                                          message.messagetitlecontainer
                                        }
                                      >
                                        <p className={message.initialtitle}>
                                          Status:
                                        </p>
                                      </div>
                                      <div
                                        className={message.messagedescription}
                                      >
                                        <div className={message.statusbutton}>
                                          <p
                                            className={message.statusbuttontext}
                                          >
                                            In Progress
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className={
                                        message.messagedetailscontainer
                                      }
                                    >
                                      <div
                                        className={
                                          message.messagetitlecontainer
                                        }
                                      >
                                        <p className={message.messagetitle}>
                                          Due Date:
                                        </p>
                                      </div>
                                      <div
                                        className={message.messagedescription}
                                      >
                                        <Image
                                          src="/icons/calendar.svg"
                                          alt="calendar"
                                          style={{
                                            marginRight: "0.2rem",
                                            width: "18px",
                                            height: "20px",
                                          }}
                                        />
                                        <div className={message.absolutecenter}>
                                          <p
                                            className={
                                              message.messagedescriptioncontent
                                            }
                                          >
                                            {new Date(
                                              project?.project?.due
                                            ).toLocaleDateString()}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className={
                                        message.messagedetailscontainer
                                      }
                                    >
                                      <div
                                        className={
                                          message.messagetitlecontainer
                                        }
                                      >
                                        <p className={message.messagetitle}>
                                          Description:
                                        </p>
                                      </div>
                                      <p
                                        className={
                                          message.messagedescriptioncontent
                                        }
                                      >
                                        Lorem ipsum dolor sit amet consectetur.
                                        Lectus le leo enim quis facilisis. Elit
                                        ut facilisi arcu nibh. Etia posuere
                                        posuere rhoncus nam. Molestie lorem qui
                                        id sed quis eu etiam commodo. lorem
                                      </p>
                                    </div>
                                  </div>
                                ) : null}

                                <div className={message.scrollchat}>
                                  {allMessages.map((chat, index) => {
                                    return (
                                      <div key={index}>
                                        {chat.sender === adminInfo.id ? (
                                          <div
                                            className={message.sendingcontainer}
                                          >
                                            <p className={message.sending}>
                                              {chat.message.message}
                                            </p>
                                          </div>
                                        ) : (
                                          <div
                                            className={
                                              message.incomingcontainergroup
                                            }
                                          >
                                            <div>
                                              <p
                                                className={message.projectgroup}
                                              >
                                                {chat.sender_name}
                                              </p>
                                              <p className={message.incoming}>
                                                {chat.message.message}
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </>
                            ) : (
                              <div className={message.scrollchat}>
                                {allMessages.map((chat, index) => {
                                  return (
                                    <div key={index}>
                                      {chat.sender === adminInfo.id ? (
                                        <div
                                          className={message.sendingcontainer}
                                        >
                                          <p className={message.sending}>
                                            {chat.message.message}
                                          </p>
                                        </div>
                                      ) : (
                                        <div
                                          className={message.incomingcontainer}
                                        >
                                          <p className={message.incoming}>
                                            {chat.message.message}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <form onSubmit={handleSubmit(submitForm)}>
                      <div className={message.inputcontainer}>
                        <div style={{ flex: "1" }}>
                          <Image
                            className={message.attachment}
                            src="/icons/attachment.svg"
                            alt="attach"
                          />
                        </div>
                        <div style={{ flex: "14" }}>
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                              type="text"
                              className={message.textarea}
                              {...register("message")}
                              // value={msg}
                              placeholder="Type Here"
                            />
                          </Form.Group>
                        </div>
                        <div style={{ flex: "1" }}>
                          <button className={message.sendbutton} type="submit">
                            <Image
                              type="submit"
                              // onClick={handleMessage}
                              src="/icons/send1.svg"
                              className={message.attachmentsend}
                              alt="send"
                            />
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default MessageDashboard;

const MessageDetails = (props) => {
  return (
    <div className={message.messagedetailscontainer}>
      <p>{props.title}</p>
      <p>{props.description}</p>
    </div>
  );
};
