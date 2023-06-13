import React from "react";
import general from "./General.module.css";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <div className={general.maincontainer1}>
      <div className={general.centerContainer}>
        <p className={general.centertext}>Error 404 | Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
