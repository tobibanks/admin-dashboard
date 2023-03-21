import React from "react";
import head from "./general.module.css";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const Header = (props) => {
  return (
    <div className={head.overallnavigation}>
      <div className={head.navigation}>
        <div className={head.textcontainer}>
          <p className={head.titlenavigation}>{props.name}</p>
        </div>
        <div className={head.flexlinkcontainer}>
          <NavBoxes
            pathlink="/project"
            title="Table"
            imagelink="/icons/header/table.svg"
            imagelinkactive="/icons/header/active-table.svg"
          />
          <NavBoxes
            pathlink="/project/board"
            title="Board"
            imagelink="/icons/header/board.svg"
            imagelinkactive="/icons/header/active-board.svg"
          />
          <NavBoxes
            title="Grid"
            pathlink="/project/grid"
            imagelink="/icons/header/grid.svg"
            imagelinkactive="/icons/header/active-grid.svg"
          />
        </div>
        <div className={head.absolutecenter3}>
          <div className={head.searchiconcontainer}>
            <input
              type="text"
              placeholder="Search Clients"
              className={head.search}
            ></input>
            <Image src="/icons/search.svg" className={head.searchicon} />
          </div>
        </div>
      </div>
      {/* <TableHeaderNav /> */}
    </div>
  );
};

export default Header;

const NavBoxes = (props) => {
  const active = location.pathname === props.pathlink;
  console.log(active);
  // console.log(props.imagelink);
  // console.log(props.title);
  return (
    <Link
      to={props.pathlink}
      className={active ? head.linkcontaineractive : head.linkcontainer}
    >
      <div className={head.navboxescontainer}>
        {active ? (
          <Image src={`${props.imagelinkactive}`} className={head.imageicon} />
        ) : (
          <Image src={`${props.imagelink}`} className={head.imageicon} />
        )}
        <div className={head.centercontainer}>
          <p className={active ? head.navboxestextactive : head.navboxestext}>
            {props.title}
          </p>
        </div>
      </div>
    </Link>
  );
};
