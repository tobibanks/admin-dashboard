import React from "react";
import Table from "react-bootstrap/Table";
import report from "./general.module.css";
import "./changes.css";

const ReportsTableContents = (props) => {
  return (
    <div className={report.spacing}>
      <Table className={report.tablecontainer}>
        <thead>
          <tr>
            <th className={report.centericon}>file name</th>
            <th className={report.centericon}>project name</th>
            <th className={report.centericon}>sent from</th>
            <th className={report.centericon}>sent to</th>
            <th className={report.centericon}>date received</th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </div>
  );
};

export default ReportsTableContents;
