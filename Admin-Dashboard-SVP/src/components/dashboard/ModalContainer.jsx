import { Today, week, weekModal } from "../../../data/notification";
import notification from "./User.module.css";
import React, { useMemo, useState } from "react";
import "./Modal.css";
import { Modal, ModalBody, Button, Image, Nav, Tab } from "react-bootstrap";
import moment from "moment";
import { useGetAllNotificationsQuery } from "../../app/services/auth/authService";
import { ProjectsCollection } from "../../../data/projects";
import { Link } from "react-router-dom";

const ModalContainer = (props) => {
  const [filter, setFilter] = useState(null);
  const [active, setActive] = useState();
  const [message, setMessage] = useState("No notifications today");
  const [message1, setMessage1] = useState("No notifications this week");
  const { data: allNotifications } = useGetAllNotificationsQuery();

  const allnotifications = allNotifications || [];

  const data = useMemo(() => {
    if (!filter) return allnotifications;
    const filteredData = allnotifications.filter(
      (item) => item.type === filter
    );
    return filteredData;
  }, [filter, allnotifications]);

  const initialvalue = moment()
    .startOf("day")
    .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");

  const endOfDay = moment().endOf("day").format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");

  const startOfWeek = moment()
    .startOf("week")
    .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");

  const endOfWeek = moment()
    .endOf("week")
    .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");

  const todayISO = new Date(initialvalue).getTime();
  const endOfTodayISO = new Date(endOfDay).getTime();
  const startOfWeekISO = new Date(startOfWeek).getTime();
  const endOfWeekISO = new Date(endOfWeek).getTime();

  // filter for today
  const filteredToday = useMemo(() => {
    const filtereddata = data.filter(
      (item) =>
        todayISO <= new Date(item.date).getTime() &&
        new Date(item.date).getTime() <= endOfTodayISO
    );
    return filtereddata;
  }, [todayISO, endOfTodayISO, data]);

  // filter for week but without the current day
  const filteredDataToday = useMemo(() => {
    const filtereddata = data.filter(
      (item) =>
        startOfWeekISO <= new Date(item.date).getTime() &&
        new Date(item.date).getTime() <= endOfWeekISO &&
        new Date(item.date).getTime() !== todayISO
    );
    return filtereddata;
  }, [startOfWeekISO, endOfWeekISO, todayISO, data]);

  return (
    <Modal
      className={notification.modal}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <div className={notification. modalcontent}> */}
      <Modal.Header closeButton>
        <Modal.Title
          className={notification.containedmodaltitlevcenter}
          id="contained-modal-title-vcenter"
        >
          Notifications
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={notification.modalbody}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Nav variant="pills" className={notification.nav}>
            <Nav.Item>
              <Nav.Link
                eventKey="first"
                onClick={() => {
                  setFilter(null);
                  setMessage("No notifications today");
                  setMessage1("No notifications this week");
                }}
              >
                All Notifications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setFilter("message");
                  setMessage("No notifications today");
                  setMessage1("No notifications this week");
                }}
                eventKey="second"
              >
                Messages
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="third"
                onClick={() => {
                  setFilter("Report");
                  setMessage("No notifications today");
                  setMessage1("No notifications this week");
                }}
              >
                Reports
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="fourth"
                onClick={() => {
                  setFilter("Project Request");
                  setMessage("No notifications today");
                  setMessage1("No notifications this week");
                }}
              >
                Project Request
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="fifth"
                onClick={() => {
                  setFilter("Project Approval");
                  setMessage("No notifications today");
                  setMessage1("No notifications this week");
                }}
              >
                Project Approval
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredToday.length >= 1 ? (
                    <>
                      {filteredToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message}</p>
                    </div>
                  )}
                </div>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>THIS WEEK</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredDataToday.length >= 1 ? (
                    <>
                      {filteredDataToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message1}</p>
                    </div>
                  )}
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredToday.length >= 1 ? (
                    <>
                      {filteredToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message}</p>
                    </div>
                  )}
                </div>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>THIS WEEK</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredDataToday.length >= 1 ? (
                    <>
                      {filteredDataToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message1}</p>
                    </div>
                  )}
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredToday.length >= 1 ? (
                    <>
                      {filteredToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message}</p>
                    </div>
                  )}
                </div>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>THIS WEEK</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredDataToday.length >= 1 ? (
                    <>
                      {filteredDataToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message1}</p>
                    </div>
                  )}
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredToday.length >= 1 ? (
                    <>
                      {filteredToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message}</p>
                    </div>
                  )}
                </div>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>THIS WEEK</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredDataToday.length >= 1 ? (
                    <>
                      {filteredDataToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message1}</p>
                    </div>
                  )}
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredToday.length >= 1 ? (
                    <>
                      {filteredToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message}</p>
                    </div>
                  )}
                </div>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>THIS WEEK</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {filteredDataToday.length >= 1 ? (
                    <>
                      {filteredDataToday.map((data, index) => (
                        <NotificationContent
                          name={data.from_user.firstname}
                          type={data.type}
                          image={data.from_user.avatar}
                          time={data.date}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <div>
                      <p className={notification.nothing}>{message1}</p>
                    </div>
                  )}
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      {/* </div> */}
    </Modal>
  );
};

export default ModalContainer;

const NotificationContent = (props) => {
  const momenttime = moment(props.time);
  const accuratetime = momenttime.fromNow();
  return (
    <div className={notification.flexingcontainer}>
      <div className={notification.flexcontainercontents}>
        <div className={notification.flexedcontainer}>
          <div className={notification.centernotification}>
            <Image
              style={{ width: "48px", height: "48px" }}
              src={`${props.image}`}
            />
          </div>
          <div>
            <p className={notification.notificationcontenttext}>
              New <span className={notification.color}>{props.type}</span> from{" "}
              <span className={notification.color}>{`${props.name}`}</span>
            </p>
            <p className={notification.notificationcontentdescription}>
              {accuratetime}
            </p>
          </div>
        </div>
        <div>
          <Link
            to={
              props.type === "Project Request"
                ? "/project"
                : props.type === "Project Approval"
                ? "/project"
                : props.type === "Report"
                ? "/report"
                : props.type === "message"
                ? "/message"
                : null
            }
          >
            <Button className={notification.view}>View</Button>
          </Link>
        </div>
      </div>
      {props.id === "1" ? <hr className={notification.horizontalline} /> : null}
    </div>
  );
};
