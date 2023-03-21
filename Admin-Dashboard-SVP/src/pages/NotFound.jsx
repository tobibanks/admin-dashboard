import React from "react";
import general from "./General.module.css";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className={general.maincontainer}>
      <div className={general.centerContainer}>
        <p className={general.centertext}>Error 404 | Page Not Found</p>
      </div>
    </Container>
  );
};

export default NotFound;
