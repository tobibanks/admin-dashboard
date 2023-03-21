import React from "react";
import Table from "react-bootstrap/Table";
import tasktable from "./tasktable.module.css";
import "./table.css";

const TaskTableDisplay = (props) => {
  return (
    <div className={tasktable.spacing}>
      <Table className={tasktable.tablecontainer}>
        <thead>
          <tr>
            <th className={tasktable.centericon1}>tasks</th>
            <th className={tasktable.centericon1}>Project name</th>
            <th className={tasktable.centericon}>assigned to</th>
            <th className={tasktable.centericon}>status</th>
            <th className={tasktable.centericon}>due date</th>
            <th className={tasktable.centericon}>priority</th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </div>
  );
};

export default TaskTableDisplay;
