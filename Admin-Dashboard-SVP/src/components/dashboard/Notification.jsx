import React, { useMemo } from "react";
import { Image, Modal, Nav, Button } from "react-bootstrap";
import { Today, week } from "../../../data/notification";
import notification from "./User.module.css";
import "./Modal.css";
import ModalContainer from "./ModalContainer";
// import Moment from "react-moment";
import { useGetAllNotificationsQuery } from "../../app/services/auth/authService";
import moment from "moment";

const Notification = () => {
  const [modalShow, setModalShow] = React.useState(false);
  // const [show, setShow] = useState(false);
  const handleclick = () => setModalShow(true);

  const { data: allNotifications } = useGetAllNotificationsQuery();

  const allnotifications = allNotifications || [];

  console.log(allnotifications);

  const initialvalue = moment()
    .startOf("day")
    .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  console.log(initialvalue);

  const endOfDay = moment().endOf("day").format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  console.log(endOfDay);

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

  const filtereddateweek = useMemo(() => {
    const filtereddata = allnotifications.filter(
      (item) =>
        startOfWeekISO <= new Date(item.date).getTime() &&
        new Date(item.date).getTime() <= endOfWeekISO
    );
    return filtereddata;
  }, [startOfWeekISO, endOfWeekISO, allnotifications]);

  console.log(filtereddateweek);

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

  console.log(filteredToday);

  return (
    <div className={notification.notificationcontainer}>
      <p className={notification.firsttext}>Today</p>
      <div className={notification.notificationcontent}>
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
            <p className={notification.nothing}>
              There are no new notifications
            </p>
          </div>
        )}
      </div>
      <p className={notification.firsttext}>THIS WEEK</p>
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
          <p className={notification.nothing}>There are no new notifications</p>
        </div>
      )}
      <div className={notification.rightbuttoncontainer1}>
        <ButtonModal handleclick={handleclick} />
        <ModalContainer show={modalShow} onHide={() => setModalShow(false)} />
      </div>
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
          <Button className={notification.view}>View</Button>
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
