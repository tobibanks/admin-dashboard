import React, { useMemo, useState } from "react";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import project from "./project.module.css";
import "./projects.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/project/Header";
import { ProjectsCollection } from "../../../data/projects";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import TableDisplay from "../../components/project/TableDisplay";
import ModalProject from "../../components/project/ModalProject";
import { ButtonProject } from "../../components/dashboard/DashboardContents";

const ProjectDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [setting, setSetting] = useState("");
  // const handleclick = () => setModalShow(true);

  const data = useMemo(() => {
    if (!filter) return ProjectsCollection;
    const filteredData = ProjectsCollection.filter(
      (item) => item.activestatus === filter
    );
    return filteredData;
  }, [filter]);

  // console.log(data);

  console.log(filter);
  return (
    <Container className={project.container}>
      <DashboardLayout name="Projects">
        <div className={project.overallcontainer}>
          <ButtonProject />
          <Header name="My Projects" />
          <div className={project.leftcontainer}>
            <div className={project.flexwrap}>
              <NavCategories
                name="All Projects"
                total="(23)"
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Upcoming"
                total="(02)"
                onClick={() => setFilter("Upcoming")}
              />
              <NavCategories
                name="In Progress"
                total="(10)"
                onClick={() => setFilter("In Progress")}
              />
              <NavCategories
                name="Completed"
                total="(11)"
                onClick={() => setFilter("Complete")}
              />
            </div>
            <TableHeaderNav />
          </div>
          <TableDisplay>
            {data.map((projectcollect, index) => (
              <tr
                onClick={() => {
                  setSetting(projectcollect.id);
                  setModalShow(true);
                }}
                key={index}
                className={project.tablerow}
              >
                <td className={project.align}>{projectcollect.name}</td>
                <td>
                  <div className={project.absolutecenter}>
                    <p className={project.avatar}>{projectcollect.initials}</p>
                  </div>
                </td>
                <td>
                  <StatusButton text={projectcollect.status} />
                </td>
                <td className={project.centericon}>{projectcollect.date}</td>
                <td className={project.centericon}>
                  {projectcollect.priority === "important" ? (
                    <ImageIcon imagelink="/icons/table/redflag.svg" />
                  ) : projectcollect.priority === "normal" ? (
                    <ImageIcon imagelink="/icons/table/normalflag.svg" />
                  ) : projectcollect.priority === "warning" ? (
                    <ImageIcon imagelink="/icons/table/warningflag.svg" />
                  ) : null}
                </td>
              </tr>
            ))}
          </TableDisplay>
        </div>
      </DashboardLayout>
      <ModalProject
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={setting}
      />
    </Container>
  );
};

export default ProjectDashboard;

const StatusButton = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? project.statusbutton
          : props.text === "Complete"
          ? project.completebutton
          : props.text == "Upcoming"
          ? project.upcoming
          : null
      }
    >
      <p className={project.statusbuttontext}>{props.text}</p>
    </div>
  );
};

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const NavCategories = (props) => {
  return (
    <Button className={project.tablenavcontainer} onClick={props.onClick}>
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      {/* </p> */}
    </Button>
  );
};
