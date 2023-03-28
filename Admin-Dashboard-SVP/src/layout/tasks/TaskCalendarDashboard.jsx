import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TaskHeader from "../../components/tasks/TaskHeader";
import TableHeaderNav from '../../components/project/TableHeaderNav'
import taskcalendar from "./task.module.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./task.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "react-bootstrap";
import { calendarevents } from "../../../data/calendarevents";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map(
//   (k) => BigCalendar.Views[k]
// );

const TaskCalendarDashboard = () => {
  return (
    <Container className={taskcalendar.container}>
      <DashboardLayout name="Tasks">
        <div className={taskcalendar.overallcontainer}>
          <TaskHeader name="My Tasks" />
          <div className={taskcalendar.rightboardcontainer}>
            <TableHeaderNav />
          </div>
          <div style={{ height: 700, marginTop: "2rem" }}>
            <Calendar
              events={calendarevents}
              step={60}
              localizer={localizer}
              // views={allViews}
              // defaultView={week}
              // views={["week"]}
              defaultDate={new Date(2015, 3, 1)}
              // popup={false}
              //   onShowMore={(events, date) =>
              //     this.setState({ showModal: true, events })
              //   }
            />
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default TaskCalendarDashboard;
