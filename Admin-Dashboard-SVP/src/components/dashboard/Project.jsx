import React, { useState, useMemo } from "react";
import project from "./User.module.css";
import { Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./Modal.css";
import { useGetProjectDetailsQuery } from "@/app/services/auth/authService";
import SkeletonLoader from "./SkeletonLoader";

const Project = () => {
  const { data: UserProjects, isLoading } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });
  const [filter, setFilter] = useState(null);

  const UserProjectsCollection = UserProjects || [];

  const data = useMemo(() => {
    if (!filter) return UserProjectsCollection;
    const filteredData = UserProjectsCollection.filter(
      (item) => item.user_status === filter
    );
    return filteredData;
  }, [filter,UserProjectsCollection]);

  console.log(data);

  return (
    <div className={project.projectcontainer1}>
      <div className={project.projectflexcontainer}>
        <div className={project.absolutecenter}>
          <p className={project.projectheader}>project</p>
        </div>
        <div className={project.projectflexbuttonscontainer}>
          <Buttons
            name="All Categories"
            filter={filter}
            filter1={null}
            onClick={() => setFilter(null)}
          />
          <Buttons
            name="Active"
            filter={filter}
            filter1="In Progress"
            // imagelink="/icons/dashboard/project/tick.svg"
            onClick={() => setFilter("In Progress")}
          />
          <Buttons
            name="Inactive"
            // imagelink="/icons/dashboard/project/cancel.svg"
            filter={filter}
            filter1={"Awaiting Approval" || "Completed"}
            onClick={() => setFilter("Awaiting Approval" || "Completed")}
          />
        </div>
      </div>
      <div className={project.tablecontainer}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div style={{ marginBottom: "3rem" }}>
            {data.length >= 1 ? (
              <Table className={project.tablestriped}>
                <thead className={project.tableheader}>
                  <tr>
                    <th>PROJECT NAME</th>
                    <th className={project.centericon}>ASSIGNED BY</th>
                    <th className={project.centericon}>DUE DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((projectdata, index) => (
                    <tr key={index} className={project.pointer}>
                      <td className={project.align}>
                        <div className={project.flexcontent}>
                          <Icon imagelink="/icons/dashboard/task/star.svg" />
                          <div className={project.centertext}>
                            <p className={project.tasktitle}>
                              {projectdata.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className={project.centericon}>
                        <div className={project.absolutecenter}>
                          <p className={project.avatar}>
                            {projectdata?.requested_by?.firstname?.charAt(0)}
                            <span className={project.label}>
                              {projectdata?.requested_by?.lastname?.charAt(0)}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className={project.centericon}>
                        {new Date(projectdata.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div style={{ marginBottom: "3rem" }}>
                <p className={project.nothing}>There are no projects</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;

const Buttons = (props) => {
  const active = props.filter === props.filter1;
  return (
    <div
      className={active ? project.projectbuttonactive : project.projectbutton}
      onClick={props.onClick}
    >
      {/* <Image src = {`${props.imagelink || undefined }`} className = {project.projectbuttonicon}/> */}
      {props.imagelink ? (
        <Image
          src={`${props.imagelink || undefined}`}
          className={project.projectbuttonicon}
        />
      ) : null}
      <p
        className={
          active ? project.textbuttonactive : project.projecttextbutton
        }
      >
        {props.name}
      </p>
      <span className={project.disappear}>{props.filter}</span>
      <span className={project.disappear}>{props.filter1}</span>
    </div>
  );
};

const Icon = (props) => {
  return <Image src={`${props.imagelink}`} alt="icon" />;
};
