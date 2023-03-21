import React from "react";
import user from "./User.module.css";
import { Image, Button } from "react-bootstrap";
import { collections } from "../../../data/data";
import Notification from "./Notification";
import Tasks from "./Tasks";
import Project from "./Project";
import { Link } from "react-router-dom";

const DashboardContents = () => {
  return (
    <div className={user.contentcontainer}>
      {/* <div className={user.absoluterightcontainer}>
        <ButtonProject />
      </div> */}

      <ButtonProject />
      <div className={user.flexcontainer}>
        {collections.map((collection, index) => (
          <Cards
            key={index}
            imagelink={collection.imagelink}
            text={collection.total}
            title={collection.name}
            description={collection.description}
          />
        ))}
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
        <p className={user.description}>{props.description}</p>
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
