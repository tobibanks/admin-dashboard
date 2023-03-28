import React from "react";
import grid from "./general.module.css";
import { Image } from "react-bootstrap";

const ProjectGridContainer = (props) => {
  return (
    <div className={grid.gridcontainer}>
      <div className={grid.innercontainer}>
        <div className={grid.flexcontainer}>
          <p className={grid.gridtext}>{props.text}</p>
          <div>
            {props.priority === "important" ? (
              <ImageIcon imagelink="/icons/table/redflag.svg" />
            ) : props.priority === "normal" ? (
              <ImageIcon imagelink="/icons/table/normalflag.svg" />
            ) : props.priority === "warning" ? (
              <ImageIcon imagelink="/icons/table/warningflag.svg" />
            ) : null}
          </div>
        </div>
        <p className={grid.textdate}>
          <span className={grid.titledate}>Due:</span> {props.date}
        </p>
        <div className={grid.space}>
          <div className={grid.absolutecenter}>
            <span className={grid.titledate}>Status:</span>{" "}
          </div>
          <Button text={props.status} />
        </div>
      </div>
    </div>
  );
};

export default ProjectGridContainer;

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const Button = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? grid.statusbutton
          : props.text === "Complete"
          ? grid.completebutton
          : props.text == "Upcoming"
          ? grid.upcoming
          : null
      }
    >
      <p className={grid.statusbuttontext}>{props.text}</p>
    </div>
  );
};
