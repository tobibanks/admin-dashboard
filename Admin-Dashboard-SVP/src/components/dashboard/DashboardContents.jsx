import React from "react";
import user from "./User.module.css";
import { Image, Button } from "react-bootstrap";
import { collections } from "../../../data/data";
import Notification from "./Notification";
import Tasks from "./Tasks";
import Project from "./Project";
import { Link } from "react-router-dom";
import {
  useGetProjectDetailsQuery,
  useGetTaskDetailsQuery,
  useGetReportsDetailsQuery,
} from "@/app/services/auth/authService";

const DashboardContents = () => {
  const { data: AdminReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ReportsCollection = AdminReports || [];

  const { data: AdminTasks } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const TaskCollection = AdminTasks || [];

  const { data: AdminProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ProjectsCollection = AdminProjects || [];
  return (
    <div className={user.contentcontainer}>
      <div className={user.flexcontainer}>
        <Link to="/project">
          <Cards
            imagelink="/icons/dashboard/project-cards-icon.svg"
            text={ProjectsCollection.length}
            title="Projects"
            description={ProjectsCollection.description}
            verb="ongoing"
          />
        </Link>
        <Link to="/task">
          <Cards
            imagelink="/icons/dashboard/tasks-cards-icon.svg"
            text={TaskCollection.length}
            title="Tasks"
            description={ProjectsCollection.description}
            verb="new"
          />
        </Link>
        <Link to="/reports">
          <Cards
            imagelink="/icons/dashboard/reports-cards-icon.svg"
            text={ReportsCollection.length}
            title="Reports"
            description={ProjectsCollection.description}
            verb="new"
          />
        </Link>
        <Cards
          imagelink="/icons/dashboard/messages-cards-icon.svg"
          text="0"
          title="Messages"
          // description={ProjectsCollection.description}
        />
      </div>
      <div className={user.flexedcontainer1}>
        <Notification />
        <Tasks />
      </div>
      <Project />
    </div>
  );
};

export default DashboardContents;

const Cards = (props) => {
  return (
    <div className={user.contentcardscontainer}>
      <div className={user.innercontent}>
        <div className={user.contentheader}>
          <Image src={`${props.imagelink}`} />
          <div className={user.absolutecenter}>
            <p className={user.contentheadertext}>{props.text}</p>
          </div>
        </div>
        <p className={user.title}>{props.title}</p>
        <p className={user.description}>
          You have {props.text} {props.verb} {props.title}
        </p>
      </div>
    </div>
  );
};

export const ButtonProject = () => {
  return (
    <div className={user.absoluterightcontainer}>
      <Link to="/project/form">
        <Button className={user.modalbutton}>
          Add New Project
          <Image
            src="/icons/notification/arrow-down.svg"
            className={user.arrowdown}
            alt="arrow-down"
          />
        </Button>
      </Link>
    </div>
  );
};
