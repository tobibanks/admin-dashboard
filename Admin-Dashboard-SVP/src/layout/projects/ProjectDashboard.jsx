import React, { useMemo, useState, forwardRef } from "react";
import { Button, Container, Image } from "react-bootstrap";
import project from "./project.module.css";
import "./projects.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/project/Header";
import TableDisplay from "../../components/project/TableDisplay";
import ModalProject from "../../components/project/ModalProject";
import { useGetProjectDetailsQuery } from "@/app/services/auth/authService";
import { ButtonProject } from "../../components/dashboard/DashboardContents";

const ProjectDashboard = () => {
  const { data: UserTableProjects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ProjectsCollection = UserTableProjects || [];
  console.log(ProjectsCollection.map);

  const [filter, setFilter] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [setting, setSetting] = useState("");

  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2077"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  console.log(ProjectsCollection);
  const data = useMemo(() => {
    if (!filter) return ProjectsCollection;
    const filteredData = ProjectsCollection.filter(
      (item) =>
        item.status === filter &&
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filteredData;
  }, [filter, finalStartDate, finalEndDate, ProjectsCollection]);

  const dataByDate = useMemo(() => {
    const filtereddata = data.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, data]);

  const filteredInProgressData = ProjectsCollection.filter(
    (item) => item.status === "In Progress"
  );

  const filteredUpcomingData = ProjectsCollection.filter(
    (item) => item.status === "Upcoming"
  );

  const filteredCompleteData = ProjectsCollection.filter(
    (item) => item.status === "Complete"
  );

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
                total={`(${ProjectsCollection.length})`}
                filter={filter}
                filter1={null}
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Upcoming"
                total={`(${filteredUpcomingData.length})`}
                filter={filter}
                filter1="Upcoming"
                onClick={() => setFilter("Upcoming")}
              />
              <NavCategories
                name="In Progress"
                filter1="inprogress"
                filter={filter}
                total={`(${filteredInProgressData.length})`}
                onClick={() => {
                  setFilter("inprogress");
                }}
              />
              <NavCategories
                name="Completed"
                total={`(${filteredCompleteData.length})`}
                filter={filter}
                filter1="Complete"
                onClick={() => setFilter("Complete")}
              />
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              customInput={<ExampleCustomInput />}
              // width={300}
            />
            <div className={project.absolutecenter}>
              <div className={project.dash}></div>
            </div>
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              dateFormat="dd/MM/yyyy"
              customInput={<ExampleCustomInput />}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <TableDisplay>
            {dataByDate.map((projectcollect, index) => (
              <tr
                onClick={() => {
                  setSetting(projectcollect._id);
                  setModalShow(true);
                }}
                key={index}
                className={project.tablerow}
              >
                <td className={project.align}>{projectcollect.name}</td>
                <td>
                  <div className={project.absolutecenter}>
                    <p className={project.avatar}>
                      {" "}
                      {projectcollect?.requested_by?.firstname?.charAt(0) ||
                        null}
                      <span>
                        {projectcollect?.requested_by?.lastname?.charAt(0) ||
                          null}
                      </span>
                    </p>
                  </div>
                </td>
                <td>
                  <StatusButton text={projectcollect.status.admin} />
                </td>
                <td className={project.centericon}>
                  {new Date(projectcollect.date).toLocaleDateString()}
                </td>
                <td className={project.centericon}>
                  {projectcollect.priority === "red" ? (
                    <ImageIcon imagelink="/icons/table/redflag.svg" />
                  ) : projectcollect.priority === "gray" ? (
                    <ImageIcon imagelink="/icons/table/normalflag.svg" />
                  ) : projectcollect.priority === "yellow" ? (
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
  const active = props.filter === props.filter1;
  return (
    <Button
      className={
        active ? project.tablenavcontaineractive : project.tablenavcontainer
      }
      onClick={props.onClick}
    >
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={project.disappear}>{props.filter}</span>
      <span className={project.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={project.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={project.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={project.calendaricon}
      />
    </div>
    {value}
  </button>
));
