import React, { useMemo, useState, forwardRef } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/project/Header";
import grid from "./project.module.css";
import { Container, Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetProjectDetailsQuery } from "@/app/services/auth/authService";
import { ButtonProject } from "../../components/dashboard/DashboardContents";
import SkeleteonGrid from "../../components/dashboard/SkeletonGrid";
import DashboardLayoutContents from "../../components/dashboard/DashboardLayoutContents";

const ProjectBoardDashboard = () => {
  const { data: UserProjectsBoard, isLoading } = useGetProjectDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const isEnabled = Boolean(filter);

  const ProjectsBoardCollection = UserProjectsBoard || [];
  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2077"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const inprogressdata = useMemo(() => {
    const filteredData = ProjectsBoardCollection.filter(
      (item) => item.admin_Status === "In Progress"
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, ProjectsBoardCollection]);

  const dataByDateinprogress = useMemo(() => {
    const filtereddata = inprogressdata.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, inprogressdata]);

  const upcomingdata = useMemo(() => {
    const filteredData = ProjectsBoardCollection.filter(
      (item) => item.admin_Status === "Requested"
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, ProjectsBoardCollection]);

  const dataByDateupcoming = useMemo(() => {
    const filtereddata = upcomingdata.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, upcomingdata]);

  const completedata = useMemo(() => {
    const filteredData = ProjectsBoardCollection.filter(
      (item) =>
        item.admin_Status === "Complete" &&
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filteredData;
  }, [finalStartDate, finalEndDate, ProjectsBoardCollection]);

  const dataByDatecomplete = useMemo(() => {
    const filtereddata = completedata.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, upcomingdata]);

  console.log(inprogressdata);
  return (
    <Container className={grid.container}>
      <DashboardLayoutContents name="Projects">
        <div className={grid.overallcontainer}>
          <ButtonProject />
          <Header name="My Projects" />
          <div className={grid.rightboardcontainer}>
            <div className={grid.datepickertitle}>
              <p className={grid.datepickertitlelabel}>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                width={300}
              />
            </div>
            <div className={grid.absolutecenter}>
              <div className={grid.dash}></div>
            </div>
            <div className={grid.datepickertitle}>
              <p className={grid.datepickertitlelabel}>End Date</p>
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          <div className={grid.flexboardcontainer}>
            {isLoading ? (
              <SkeleteonGrid />
            ) : (
              <div className={grid.sizecontainer}>
                <BoarderHeader text="In Progress" />
                <>
                  {dataByDateinprogress.length >= 1 ? (
                    <>
                      {dataByDateinprogress.map((filtereddata, index) => (
                        <ContentContainer
                          key={index}
                          headertext={filtereddata.name}
                          content={filtereddata.details}
                          firstname={filtereddata.requested_by?.firstname}
                          lastname={filtereddata.requested_by?.lastname}
                          firstnamefirstletter={filtereddata.requested_by?.firstname?.charAt(
                            0
                          )}
                          lastnamefirstletter={filtereddata.requested_by?.lastname?.charAt(
                            0
                          )}
                          date={filtereddata.date}
                          status={filtereddata.admin_Status}
                          imagelink={filtereddata.imagelink}
                          priority={filtereddata.priority}
                        />
                      ))}
                    </>
                  ) : (
                    <div style={{ marginTop: "3rem" }}>
                      <p className={grid.nothing}>There are no projects</p>
                    </div>
                  )}
                </>
              </div>
            )}
            {isLoading ? (
              <SkeleteonGrid />
            ) : (
              <div className={grid.sizecontainer}>
                <BoarderHeader text="Requested" />
                <>
                  {dataByDateupcoming.length >= 1 ? (
                    <>
                      {dataByDateupcoming.map((filtereddata, index) => (
                        <ContentContainer
                          key={index}
                          headertext={filtereddata.name}
                          content={filtereddata.details}
                          firstname={filtereddata.requested_by?.firstname}
                          lastname={filtereddata.requested_by?.lastname}
                          firstnamefirstletter={filtereddata.requested_by?.firstname?.charAt(
                            0
                          )}
                          lastnamefirstletter={filtereddata.requested_by?.lastname?.charAt(
                            0
                          )}
                          date={filtereddata.due}
                          status={filtereddata.admin_Status}
                          imagelink={filtereddata.imagelink}
                          priority={filtereddata.priority}
                        />
                      ))}
                    </>
                  ) : (
                    <div style={{ marginTop: "2rem" }}>
                      <p className={grid.nothing}>
                        There are no upcoming projects
                      </p>
                    </div>
                  )}
                </>
              </div>
            )}
            {isLoading ? (
              <SkeleteonGrid />
            ) : (
              <div className={grid.sizecontainer}>
                <BoarderHeader text="Completed" />
                <>
                  {dataByDatecomplete.length >= 1 ? (
                    <>
                      {dataByDatecomplete.map((filtereddata, index) => (
                        <ContentContainer
                          key={index}
                          headertext={filtereddata.projectname}
                          content={filtereddata.description}
                          firstname={filtereddata.requested_by?.firstname}
                          lastname={filtereddata.requested_by?.lastname}
                          firstnamefirstletter={filtereddata.requested_by?.firstname?.charAt(
                            0
                          )}
                          lastnamefirstletter={filtereddata.requested_by?.lastname?.charAt(
                            0
                          )}
                          date={filtereddata.due}
                          status={filtereddata.admin_Status}
                          imagelink={filtereddata.imagelink}
                          priority={filtereddata.priority}
                        />
                      ))}
                    </>
                  ) : (
                    <div style={{ marginTop: "2rem" }}>
                      <p className={grid.nothing}>
                        There are no completed projects
                      </p>
                    </div>
                  )}
                </>
              </div>
            )}
          </div>
        </div>
      </DashboardLayoutContents>
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
          : props.text === "Requested"
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
            <p className={grid.avatar}>
              {props.firstnamefirstletter}
              <span>{props.lastnamefirstletter}</span>
            </p>
            <div className={grid.absolutecenter}>
              <p className={grid.textname}>{props.firstname}</p>
              <p className={grid.textname}>{props.lastname}</p>
            </div>
          </div>
        </div>
        <div className={grid.flextext}>
          <p className={grid.assigned1}>Due:</p>
          <p className={grid.value}>
            {new Date(props.date).toLocaleDateString()}
          </p>
        </div>
        <div className={grid.flextext}>
          <div className={grid.absolutecenter}>
            <p className={grid.assigned1}>Status</p>
          </div>
          <div
            className={
              props.status === "In Progress"
                ? grid.statusbutton
                : props.status === "Completed"
                ? grid.completebutton
                : props.status === "Requested"
                ? grid.requestedbutton
                : null
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
            {props.priority === "red" ? (
              <ImageIcon imagelink="/icons/table/redflag.svg" />
            ) : props.priority === "gray" ? (
              <ImageIcon imagelink="/icons/table/normalflag.svg" />
            ) : props.priority === "yellow" ? (
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

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={grid.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={grid.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={grid.calendaricon}
      />
    </div>
    <p className={grid.datevalue}>{value}</p>
  </button>
));
