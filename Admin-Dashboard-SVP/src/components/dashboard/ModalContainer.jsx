import { Today, week, weekModal } from "../../../data/notification";
import notification from "./User.module.css";
import React from "react";
import "./Modal.css";
import {
  Modal,
  ModalBody,
  Button,
  Image,
  Tabs,
  Nav,
  Tab,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

const ModalContainer = (props) => {
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
              <Nav.Link eventKey="first">All Notifications</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Messages</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Reports</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Project Request</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Project Approval</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {Today.map((data, index) => (
                    <NotificationContent
                      image={data.image}
                      name={data.name}
                      time={data.time}
                      id={data.id}
                      key={index}
                    />
                  ))}
                </div>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>THIS WEEK</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {weekModal.map((notify, index) => (
                    <NotificationContent
                      image={notify.image}
                      name={notify.name}
                      time={notify.time}
                      id={notify.id}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>THIS WEEK</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {weekModal.map((notify, index) => (
                    <NotificationContent
                      image={notify.image}
                      name={notify.name}
                      time={notify.time}
                      id={notify.id}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {Today.map((data, index) => (
                    <NotificationContent
                      image={data.image}
                      name={data.name}
                      time={data.time}
                      id={data.id}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {Today.map((data, index) => (
                    <NotificationContent
                      image={data.image}
                      name={data.name}
                      time={data.time}
                      id={data.id}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">
              <div className={notification.notificationcontainer1}>
                <div className={notification.firstext1container1}>
                  <p className={notification.firsttext1}>Today</p>
                </div>
                <div className={notification.notificationcontent1}>
                  {week.map((data, index) => (
                    <NotificationContent
                      image={data.image}
                      name={data.name}
                      time={data.time}
                      id={data.id}
                      key={index}
                    />
                  ))}
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
  return (
    <div className={notification.flexingcontainer}>
      <div className={notification.flexcontainercontents}>
        <div className={notification.flexedcontainer}>
          <div className={notification.centernotification}>
            <Image src={`${props.image}`} />
          </div>
          <div>
            <p className={notification.notificationcontenttext}>
              New <span className={notification.color}>Message</span> from{" "}
              <span className={notification.color}>{`${props.name}`}</span>
            </p>
            <p className={notification.notificationcontentdescription}>
              {props.time}
            </p>
          </div>
        </div>
        <div>
          <Button className={notification.view}>View</Button>
        </div>
      </div>
      {props.id === "1" ? <hr className={notification.horizontalline} /> : null}
    </div>
  );
};
