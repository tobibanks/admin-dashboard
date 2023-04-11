import React from "react";
import task from "./tasktable.module.css";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const TaskHeader = (props) => {
  return (
    <div className={task.overallnavigation}>
      <div className={task.navigation}>
        <div className={task.textcontainer}>
          <p className={task.titlenavigation}>{props.name}</p>
        </div>
        <div className={task.flexlinkcontainer}>
          <NavBoxes
            pathlink="/task"
            title="Table"
            imagelink="/icons/header/table.svg"
            imagelinkactive="/icons/header/active-table.svg"
          />
          <NavBoxes
            pathlink="/task/board"
            title="Board"
            imagelink="/icons/header/board.svg"
            imagelinkactive="/icons/header/active-board.svg"
          />
          <NavBoxes
            title="Calendar"
            pathlink="/task/calendar"
            imagelink="/icons/header/calendar.svg"
            imagelinkactive="/icons/header/active-calendar.svg"
          />
        </div>
        <div className={task.absolutecenter3}>
          <div className={task.searchiconcontainer}>
            <input
              type="text"
              placeholder="Search Tasks"
              className={task.search}
            ></input>
            <Image src="/icons/search.svg" className={task.searchicon} />
          </div>
        </div>
      </div>
      {/* <TableHeaderNav /> */}
    </div>
  );
};

export default TaskHeader;

const NavBoxes = (props) => {
  const active = location.pathname === props.pathlink;
  return (
    <Link
      to={props.pathlink}
      className={active ? task.linkcontaineractive : task.linkcontainer}
    >
      <div className={task.navboxescontainer}>
        {active ? (
          <Image src={`${props.imagelinkactive}`} className={task.imageicon} />
        ) : (
          <Image src={`${props.imagelink}`} className={task.imageicon} />
        )}
        <div className={task.centercontainer}>
          <p className={active ? task.navboxestextactive : task.navboxestext}>
            {props.title}
          </p>
        </div>
      </div>
    </Link>
  );
};
