import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/project/Header";
import grid from "./project.module.css";
import { Container, Image } from "react-bootstrap";
import { ProjectBoardData } from "../../../data/projects";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import { ButtonProject } from "../../components/dashboard/DashboardContents";

const ProjectBoardDashboard = () => {
  // const [upcoming, setUpcoming] = useState(null);
  const filteredInProgressData = ProjectBoardData.filter(
    (item) => item.activestatus === "In Progress"
  );

  const filteredUpcomingData = ProjectBoardData.filter(
    (item) => item.activestatus === "Upcoming"
  );

  const filteredCompleteData = ProjectBoardData.filter(
    (item) => item.activestatus === "Complete"
  );

  return (
    <Container className={grid.container}>
      <DashboardLayout name="Projects">
        <div className={grid.overallcontainer}>
          <ButtonProject />
          <Header name="My Projects" />
          <div className={grid.rightboardcontainer}>
            <TableHeaderNav />
          </div>
          <div className={grid.flexboardcontainer}>
            <div className={grid.sizecontainer}>
              <BoarderHeader text="In Progress" />
              {filteredInProgressData.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  headertext={filtereddata.projectname}
                  content={filtereddata.description}
                  name={filtereddata.name}
                  date={filtereddata.duedate}
                  status={filtereddata.status}
                  imagelink={filtereddata.imagelink}
                  priority={filtereddata.priority}
                />
              ))}
            </div>
            <div className={grid.sizecontainer}>
              <BoarderHeader text="Upcoming" />
              {filteredUpcomingData.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  headertext={filtereddata.projectname}
                  content={filtereddata.description}
                  name={filtereddata.name}
                  date={filtereddata.duedate}
                  status={filtereddata.status}
                  imagelink={filtereddata.imagelink}
                  priority={filtereddata.priority}
                />
              ))}
            </div>
            <div className={grid.sizecontainer}>
              <BoarderHeader text="Completed" />
              {filteredCompleteData.map((filtereddata, index) => (
                <ContentContainer
                  key={index}
                  headertext={filtereddata.projectname}
                  content={filtereddata.description}
                  name={filtereddata.name}
                  date={filtereddata.duedate}
                  status={filtereddata.status}
                  imagelink={filtereddata.imagelink}
                  priority={filtereddata.priority}
                />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ProjectBoardDashboard;

const BoarderHeader = (props) => {
  return (
    <div
      className={
        props.text === "In Progress"
          ? grid.boarderheadercontainer
          : props.text === "Upcoming"
          ? grid.boarderheadercontainerpurple
          : props.text === "Completed"
          ? grid.borderheadercontainerblue
          : null
      }
    >
      <p className={grid.bordertext}>{props.text}</p>
    </div>
  );
};

const ContentContainer = (props) => {
  return (
    <div className={grid.contentcontainer}>
      <div className={grid.innercontainer}>
        <p className={grid.contenttext}>{props.headertext}</p>
        <p className={grid.content}>{props.content}</p>
        <div className={grid.flextext}>
          <div className={grid.absolutecenter}>
            <p className={grid.assigned}>Assigned to</p>
          </div>
          <div className={grid.yellowbackground}>
            <Image
              src={`${props.imagelink}`}
              className={grid.imageavatar}
              alt="avatar"
            />
            <div className={grid.absolutecenter}>
              <p className={grid.textname}>{props.name}</p>
            </div>
          </div>
        </div>
        <div className={grid.flextext}>
          <p className={grid.assigned1}>Due:</p>
          <p className={grid.value}>{props.date}</p>
        </div>
        <div className={grid.flextext}>
          <div className={grid.absolutecenter}>
            <p className={grid.assigned1}>Status</p>
          </div>
          <div
            className={
              props.status === "In Progress"
                ? grid.statusbutton
                : grid.completebutton
            }
          >
            <p className={grid.statusbuttontext1}>{props.status}</p>
          </div>
        </div>
        {props.status === "Complete" ? null : (
          <div className={grid.flextext}>
            <div className={grid.absolutecenter}>
              <p className={grid.assigned1}>Priority</p>
            </div>
            {props.priority === "important" ? (
              <ImageIcon imagelink="/icons/table/redflag.svg" />
            ) : props.priority === "normal" ? (
              <ImageIcon imagelink="/icons/table/normalflag.svg" />
            ) : props.priority === "warning" ? (
              <ImageIcon imagelink="/icons/table/warningflag.svg" />
            ) : null}
          </div>
        )}
      </div>

      <div className={grid.absoluterightcontainer}>
        <div className={grid.flexicon}>
          <ImageTextIcon src="/icons/attach.svg" value="3" />
          <ImageTextIcon src="/icons/message.svg" value="3" />
        </div>
      </div>
    </div>
  );
};

const ImageIcon = (props) => {
  return <Image src={`${props.imagelink}`} alt="priority" />;
};

const ImageTextIcon = (props) => {
  return (
    <div className={grid.imagetexticon}>
      <Image src={`${props.src}`} alt="priority" />
      <div className={grid.absolutecenter}>
        <p className={grid.icontext}>{props.value}</p>
      </div>
    </div>
  );
};
