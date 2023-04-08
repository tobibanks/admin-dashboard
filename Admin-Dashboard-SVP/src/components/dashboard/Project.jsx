import React from "react";
import project from "./User.module.css";
import { Image } from "react-bootstrap";
import { Projects } from "../../../data/projects";
import Table from "react-bootstrap/Table";
import "./Modal.css";
import { useGetProjectDetailsQuery } from "@/app/services/auth/authService";

const Project = () => {
  const { data: UserProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const NeededProjects = UserProjects?.slice(0, 5) || [];

  console.log(UserProjects);

  return (
    <div className={project.projectcontainer1}>
      <div className={project.projectflexcontainer}>
        <div className={project.absolutecenter}>
          <p className={project.projectheader}>project</p>
        </div>
        <div className={project.projectflexbuttonscontainer}>
          <Buttons name="All Categories" />
          <Buttons
            name="Active"
            imagelink="/icons/dashboard/project/tick.svg"
          />
          <Buttons
            name="Inactive"
            imagelink="/icons/dashboard/project/cancel.svg"
          />
        </div>
      </div>
      <div className={project.tablecontainer}>
        <Table className={project.tablestriped}>
          <thead className={project.tableheader}>
            <tr>
              <th>PROJECT NAME</th>
              <th className={project.centericon}>ASSIGNED BY</th>
              <th className={project.centericon}>DUE DATE</th>
            </tr>
          </thead>
          <tbody>
            {NeededProjects.map((projectdata, index) => (
              <tr key={index} className={project.pointer}>
                <td className={project.align}>
                  <div className={project.flexcontent}>
                    <Icon imagelink="/icons/dashboard/task/star.svg" />
                    <div className={project.centertext}>
                      <p className={project.tasktitle}>{projectdata.name}</p>
                    </div>
                  </div>
                </td>
                <td className={project.centericon}>
                  <div className={project.absolutecenter}>
                    <p className={project.avatar}>
                      {projectdata.requested_by.firstname.charAt(0)}
                      <span className={project.label}>
                        {projectdata.requested_by.lastname.charAt(0)}
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
      </div>
    </div>
  );
};

export default Project;

const Buttons = (props) => {
  return (
    <div
      className={
        props.name === "Active"
          ? project.projectbuttonactive
          : project.projectbutton
      }
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
          props.name === "Active"
            ? project.textbuttonactive
            : project.projecttextbutton
        }
      >
        {props.name}
      </p>
    </div>
  );
};

const Icon = (props) => {
  return <Image src={`${props.imagelink}`} alt="icon" />;
};
