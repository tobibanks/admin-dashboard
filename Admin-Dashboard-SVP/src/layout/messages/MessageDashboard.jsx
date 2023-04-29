import React, { useState, useMemo, useEffect, useRef } from "react";
import { Container, Image, Form, Button } from "react-bootstrap";
import message from "./message.module.css";
import { io } from "socket.io-client";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  useGetAllMessagesQuery,
  useGetAllChatsQuery,
  useAddMessagesMutation,
} from "../../app/services/auth/authService";
import { useForm } from "react-hook-form";

const MessageDashboard = () => {
  // const [id, setId] = useState("");
  const { data: allMessages } = useGetAllMessagesQuery({
    refetchOnMountArgChange: true,
  });

  const [updateMsg] = useAddMessagesMutation();

  const messagethreads = allMessages || [];

  console.log(messagethreads);

  console.log(messagethreads[0]);

  var first = [...messagethreads].shift();

  var newArray = [];

  newArray.push(first);

  console.log(newArray);

  const initialValue = newArray[0]?._id;

  console.log(initialValue);

  const [filter, setFilter] = useState();

  console.log(filter);

  // setFilter(newArray[0].id);

  const data = useMemo(() => {
    if (!filter) return newArray;
    const filteredData = messagethreads.filter((item) => item._id === filter);
    return filteredData;
  }, [filter, messagethreads]);

  const { data: allChats, refetch } = useGetAllChatsQuery(filter);

  const chats = allChats || [];

  const { register, control, reset, handleSubmit } = useForm();

  const [open, setOpen] = useState(true);

  // console.log(msg);
  // console.log(socket);
  console.log(filter);
  const submitForm = async (msg) => {
    console.log("batman");
    reset();
    console.log(msg);
    updateMsg({ data: msg, id: filter }).unwrap();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
                <div className={message.datecontainer}>
                  <div className={message.absolutecenter}>
                    <p className={message.date}>Today</p>
                  </div>
                  <div className={message.absolutecenter}>
                    <Image src="/icons/arrow-down-yellow.svg" alt="icons" />
                  </div>
                </div>
              </div>
              <div className={message.userslistcontainer}>
                {messagethreads.map((messagethread, index) => {
                  const active = filter === messagethread._id;
                  return (
                    <div
                      className={
                        active
                          ? message.userviewcontaineractive
                          : message.userviewcontainer
                      }
                      key={index}
                      filter={newArray[0]._id}
                      onClick={() => setFilter(messagethread._id)}
                    >
                      <div
                        flex={message.userinfocontainer}
                        style={{ display: "flex", gap: "1rem" }}
                      >
                        <img
                          src={`${messagethread.avatar}`}
                          style={{ width: "40px", height: "36px" }}
                          alt="avatar"
                        />
                        <div>
                          <p
                            className={
                              active ? message.usernameactive : message.username
                            }
                          >
                            {messagethread.admin.name}
                          </p>
                          {/* <p className={message.time}>Just Now</p> */}
                        </div>
                      </div>
                      <div>
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
                  <div>
                    <Image src="/icons/mail.svg" alt="mail" />
                  </div>
                  <div>
                    {data.map((dat, index) => {
                      return (
                        <div key={index}>
                          <p className={message.headertitle}>{dat?.title}</p>
                          <p className={message.listpeople}>
                            {dat?.admin?.participants}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {data.map((project, index) => {
                  return project?.project ? (
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
                            <p className={message.messagedescription1}>
                              Skyline Building Construction
                            </p>
                          </div>

                          <div className={message.messagedetailscontainer}>
                            <p className={message.messagetitle}>Status:</p>
                            <p className={message.messagedescription}>
                              In Progress
                            </p>
                          </div>
                          <div className={message.messagedetailscontainer}>
                            <p className={message.messagetitle}>Due Date:</p>
                            <p className={message.messagedescription}>
                              <Image
                                src="/icons/calendar.svg"
                                alt="calendar"
                                style={{
                                  marginRight: "0.2rem",
                                  width: "15px",
                                  height: "15px",
                                }}
                              />
                              18 Aug 2023
                            </p>
                          </div>
                          <div className={message.messagedetailscontainer}>
                            <p className={message.messagetitle}>Description:</p>
                            <p className={message.messagedescription}>
                              Lorem ipsum dolor sit amet consectetur. Lectus le
                              leo enim quis facilisis. Elit ut facilisi arcu
                              nibh. Etia posuere posuere rhoncus nam. Molestie
                              lorem qui id sed quis eu etiam commodo.
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <>
                      <div className={message.chatcontainer}>
                        {/* <div style={{ display: "flex" }}> */}
                        <div style={{ alignSelf: "flex-end", width: "100%" }}>
                          {chats.map((chat, index) => {
                            console.log(chat);
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
                          <Image
                            className={message.attachment}
                            src="/icons/attachment.svg"
                            alt="attach"
                          />
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                              as="textarea"
                              className={message.textarea}
                              {...register("message")}
                              // value={msg}
                              placeholder=""
                            />
                          </Form.Group>
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
