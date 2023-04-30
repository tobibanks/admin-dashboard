import React, { useState, useMemo, useEffect, useRef } from "react";
import { Container, Image, Form, Button } from "react-bootstrap";
import message from "./message.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  useGetAllMessagesQuery,
  useGetAllChatsQuery,
  useAddMessagesMutation,
} from "../../app/services/auth/authService";
import { useForm } from "react-hook-form";

const MessageDashboard = () => {
  // const [id, setId] = useState("");
  // fetching users and details about them
  const { data: allMessagesDetails } = useGetAllMessagesQuery({
    refetchOnMountArgChange: true,
  });
  // sending messages
  const [updateMsg] = useAddMessagesMutation();

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

  // fetching messages. filter contains the id. line 112, when you click it saves the id in a filter
  const { data: allChats, refetch } = useGetAllChatsQuery(filter);

  // prevents code breaks
  const chats = allChats || [];

  console.log(chats);

  console.log(messageDetails);

  // useForm hook
  const { register, control, reset, handleSubmit } = useForm();

  //closing of messages that involves group chats
  const [open, setOpen] = useState(true);

  // form hook submission of messages
  const submitForm = async (msg) => {
    reset();
    updateMsg({ data: msg, id: filter }).unwrap();
  };

  // useEffect to refresh every 1seconds to check for new mwssages
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [defaultState, setDefaultState] = useState(true);

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
                  console.log(messageDetail);
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
                        {active ? (
                          <img src="/icons/profile-icon.svg" alt="avatar" />
                        ) : (
                          <img
                            src="/icons/profile-icon-black.svg"
                            alt="avatar"
                          />
                        )}
                        <div>
                          <p
                            className={
                              active ? message.usernameactive : message.username
                            }
                          >
                            {messageDetail.admin.name}
                          </p>
                          <p
                            className={
                              active
                                ? message.projectnameactive
                                : message.projectname
                            }
                          >
                            {messageDetail?.project?.name}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p
                          className={active ? message.activetime : message.time}
                        >
                          Just Now
                        </p>
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
                ) : null}
                {data.map((project, index) => {
                  return project?.project ? (
                    <>
                      <div key={index} className={message.chatcontainer}>
                        {open ? (
                          <div className={message.detailsmessagecontainer}>
                            <Image
                              src="/icons/close.svg"
                              className={message.close}
                              alt="close"
                              onClick={() => setOpen(false)}
                            />
                            <div className={message.messagedetailscontainer}>
                              <p className={message.messagetitle}>Project:</p>
                              <div className={message.messagedescription}>
                                <p className={message.messagedescription1}>
                                  {project?.project?.name}
                                </p>
                              </div>
                            </div>

                            <div className={message.messagedetailscontainer}>
                              <p className={message.messagetitle}>Status:</p>
                              <div className={message.messagedescription}>
                                <p
                                  className={message.messagedescriptioncontent}
                                >
                                  In Progress
                                </p>
                              </div>
                            </div>
                            <div className={message.messagedetailscontainer}>
                              <p className={message.messagetitle}>Due Date:</p>
                              <div className={message.messagedescription}>
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
                            <div className={message.messagedetailscontainer}>
                              <p className={message.messagetitle}>
                                Description:
                              </p>
                              <p className={message.messagedescriptioncontent}>
                                Lorem ipsum dolor sit amet consectetur. Lectus
                                le leo enim quis facilisis. Elit ut facilisi
                                arcu nibh. Etia posuere posuere rhoncus nam.
                                Molestie lorem qui id sed quis eu etiam commodo.
                              </p>
                            </div>
                          </div>
                        ) : null}
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
                                as="textarea"
                                className={message.textarea}
                                {...register("message")}
                                // value={msg}
                                placeholder=""
                              />
                            </Form.Group>
                          </div>
                          <div style={{ flex: "1" }}>
                            <button
                              className={message.sendbutton}
                              type="submit"
                            >
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
                  ) : (
                    <>
                      <div className={message.chatcontainer}>
                        {/* <div style={{ display: "flex" }}> */}
                        <div style={{ alignSelf: "flex-end", width: "100%" }}>
                          {chats.map((chat, index) => {
                            return (
                              <div>
                                <div key={index}>
                                  {chat.fromSelf ? (
                                    <div className={message.sendingcontainer}>
                                      <p className={message.sending}>
                                        {chat.message}
                                      </p>
                                    </div>
                                  ) : (
                                    <div className={message.incomingcontainer}>
                                      <p className={message.incoming}>
                                        {chat.message}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {/* </div> */}
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
                                as="textarea"
                                className={message.textarea}
                                {...register("message")}
                                // value={msg}
                                placeholder=""
                              />
                            </Form.Group>
                          </div>
                          <div style={{ flex: "1" }}>
                            <button
                              className={message.sendbutton}
                              type="submit"
                            >
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
                  );
                })}
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
