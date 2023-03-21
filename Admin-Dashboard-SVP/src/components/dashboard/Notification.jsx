import React from "react";
import { Image, Modal, Nav, Button } from "react-bootstrap";
import { Today, week } from "../../../data/notification";
import notification from "./User.module.css";
import "./Modal.css";

const Notification = () => {
  const [modalShow, setModalShow] = React.useState(false);
  // const [show, setShow] = useState(false);
  const handleclick = () => setModalShow(true);

  return (
    <div className={notification.notificationcontainer}>
      <p className={notification.firsttext}>Today</p>
      <div className={notification.notificationcontent}>
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
      <p className={notification.firsttext}>THIS WEEK</p>
      {week.map((notify, index) => (
        <NotificationContent
          image={notify.image}
          name={notify.name}
          time={notify.time}
          id={notify.id}
          key={index}
        />
      ))}
      <div className={notification.rightbuttoncontainer1}>
        <ButtonModal handleclick={handleclick} />
        <ModalContainer show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default Notification;

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
        <Nav
          activeKey="/home"
          className={notification.nav}
          // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item className={notification.navitem}>
            <Nav.Link className={notification.navlink} href="#">
              All Notifications
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={notification.navitem}>
            <Nav.Link className={notification.navlink} eventKey="#">
              Messages
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={notification.navitem}>
            <Nav.Link className={notification.navlink} eventKey="#">
              Reports
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={notification.navitem}>
            <Nav.Link className={notification.navlink} eventKey="#">
              Tasks
            </Nav.Link>
          </Nav.Item>
        </Nav>
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
            {week.map((notify, index) => (
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
      </Modal.Body>
      {/* </div> */}
    </Modal>
  );
};

const ButtonModal = (props) => {
  return (
    <div>
      <Button className={notification.modalbutton} onClick={props.handleclick}>
        View all
        <Image
          src="/icons/notification/arrow-down.svg"
          className={notification.arrowdown}
          alt="arrow-down"
        />
      </Button>
    </div>
  );
};
