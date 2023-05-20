import React, { useMemo } from "react";
import { Image, Modal, Nav, Button } from "react-bootstrap";
import notification from "./User.module.css";
import "./Modal.css";
import ModalContainer from "./ModalContainer";
import { useGetAllNotificationsQuery } from "../../app/services/auth/authService";
import moment from "moment";
import { Link } from "react-router-dom";

const Notification = () => {
  const [modalShow, setModalShow] = React.useState(false);
  // const [show, setShow] = useState(false);
  const handleclick = () => setModalShow(true);

  const { data: allNotifications } = useGetAllNotificationsQuery();

  const allnotifications = allNotifications || [];

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

  const filteredDataToday = useMemo(() => {
    const filtereddata = allnotifications.filter(
      (item) =>
        startOfWeekISO <= new Date(item.date).getTime() &&
        new Date(item.date).getTime() <= endOfWeekISO &&
        new Date(item.date).getTime() !== todayISO
    );
    return filtereddata;
  }, [startOfWeekISO, endOfWeekISO, todayISO, allnotifications]);

  // filter for week but without the current day
  const filteredToday = useMemo(() => {
    const filtereddata = allnotifications.filter(
      (item) =>
        todayISO <= new Date(item.date).getTime() &&
        new Date(item.date).getTime() <= endOfTodayISO
    );
    return filtereddata;
  }, [todayISO, endOfTodayISO, allnotifications]);

  return (
    <div className={notification.notificationcontainer}>
      <p className={notification.firsttext}>Today</p>
      <div className={notification.notificationcontent}>
        {filteredToday.length >= 1 ? (
          <>
            {filteredToday.slice(0, 3).map((data, index) => (
              <NotificationContent
                name={data.from_user.firstname}
                type={data.type}
                firstname={data.from_user.firstname.charAt(0)}
                lastname={data.from_user.lastname.charAt(0)}
                time={data.date}
                key={index}
              />
            ))}
          </>
        ) : (
          <div>
            <p className={notification.nothing}>No notifications today</p>
          </div>
        )}
      </div>
      <p className={notification.firsttext}>THIS WEEK</p>
      {filteredDataToday.length >= 1 ? (
        <>
          {filteredDataToday.slice(0, 3).map((data, index) => (
            <NotificationContent
              name={data.from_user.firstname}
              type={data.type}
              firstname={data.from_user.firstname.charAt(0)}
              lastname={data.from_user.lastname.charAt(0)}
              time={data.date}
              key={index}
            />
          ))}
        </>
      ) : (
        <div>
          <p className={notification.nothing}>No notifications this week</p>
        </div>
      )}
      {filteredDataToday > 3 ? (
        <div className={notification.rightbuttoncontainer}>
          <ButtonModal handleclick={handleclick} />
          <ModalContainer show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      ) : null}
    </div>
  );
};

export default Notification;

const NotificationContent = (props) => {
  const momenttime = moment(props.time);
  const accuratetime = momenttime.fromNow();
  return (
    <div className={notification.flexingcontainer}>
      <div className={notification.flexcontainercontents}>
        <div className={notification.flexedcontainer}>
          <div className={notification.centernotification}>
            <p className={notification.avatar}>
              <span className={notification.label}>{props.firstname}</span>
              <span className={notification.label}>{props.lastname}</span>
            </p>
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
