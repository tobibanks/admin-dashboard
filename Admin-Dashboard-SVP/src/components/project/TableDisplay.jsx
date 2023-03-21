import React from "react";
import Table from "react-bootstrap/Table";
import table from "./general.module.css";
import "./changes.css";

const TableDisplay = (props) => {
  return (
    <div className={table.spacing}>
      <Table className={table.tablecontainer}>
        <thead>
          <tr>
            <th className={table.centericon1}>Project name</th>
            <th className={table.centericon}>assigned to</th>
            <th className={table.centericon}>status</th>
            <th className={table.centericon}>due date</th>
            <th className={table.centericon}>priority</th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </div>
  );
};

export default TableDisplay;
