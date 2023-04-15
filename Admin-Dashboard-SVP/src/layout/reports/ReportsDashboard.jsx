import React, { useState, useMemo, forwardRef } from "react";
import { Container, Button, Image, Form } from "react-bootstrap";
import report from "./reports.module.css";
import "./projects.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/reports/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileInputContainer from "@/components/reports/FileInputContainer";
import { useGetReportsDetailsQuery } from "../../app/services/auth/authService";
import { truncateString } from "../../../util/text";
import DashboardLayoutContents from "../../components/dashboard/DashboardLayoutContents";
import { ProjectsCollection } from "../../../data/projects";

const ReportsDashboard = () => {
  const { data: AdminReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ReportsCollection = AdminReports || [];

  // console.log(ReportsCollection[0]?.attachments[0]?.type);

  console.log(ReportsCollection);
  const [filter, setFilter] = useState(null);
  const [select, setSelect] = useState("");

  const [startDate, setStartDate] = useState(new Date("01/01/2023"));
  const [endDate, setEndDate] = useState(new Date("01/01/2026"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  // const data = useMemo(() => {
  //   if (!filter) return ReportsCollection;
  //   const filteredData = ReportsCollection.map((report) => ({
  //     ...report,
  //     attachments: report.attachments.filter((attachment) =>
  //       attachment.type.startsWith(filter)
  //     ),
  //   }));
  //   return filteredData;
  // }, [filter, ReportsCollection]);

  // const dataByDate = useMemo(() => {
  //   const filtereddata = data.filter(
  //     (item) =>
  //       finalStartDate <= new Date(item.due).getTime() &&
  //       new Date(item.due).getTime() <= finalEndDate
  //   );
  //   return filtereddata;
  // }, [finalStartDate, finalEndDate, data]);

  // console.log(data?.length);
  // console.log(ReportsCollection?.length);

  // const filteredImage = ReportsCollection.map((report) => ({
  //   ...report,
  //   attachments: report.attachments.filter((attachment) =>
  //     attachment.type.startsWith("image")
  //   ),
  // }));
  // console.log(filteredImage);

  // const filteredImageRevised = ReportsCollection.filter(
  //   (item) => item.type === "image/png"
  // );
  // const filteredVideo = ReportsCollection.map((reportcollection) =>
  //   reportcollection.attachments.filter((attachment) =>
  //     attachment.type.startsWith("video")
  //   )
  // );

  // console.log(filteredVideo?.length);
  // console.log(ReportsCollection);

  // const filteredDocument = ReportsCollection.map((reportcollection) =>
  //   reportcollection.attachments.filter((attachment) =>
  //     attachment.type.startsWith("document")
  //   )
  // );

  const data = useMemo(() => {
    if (!filter) return ReportsCollection;
    const filteredData = ReportsCollection.filter((item) =>
      item.type.startsWith(filter)
    );
    return filteredData;
  }, [filter, ReportsCollection]);

  const selectData = useMemo(() => {
    const filteredselectdata = data.filter((item) =>
      item.hasOwnProperty(select)
    );
    return filteredselectdata;
  }, [select, data]);

  console.log(selectData);

  const filteredDocument = ReportsCollection.filter((item) =>
    item.type.startsWith("application")
  );

  const filteredImage = ReportsCollection.filter((item) =>
    item.type.startsWith("image")
  );

  const filteredVideo = ReportsCollection.filter((item) =>
    item.type.startsWith("video")
  );

  const handleProject = (e) => {
    setSelect(e.target.value);
    console.log(select);
  };
  // console.log(filteredImage);
  return (
    <Container className={report.container}>
      <DashboardLayoutContents name="Reports">
        <FileInputContainer />
        <div className={report.overallcontainer}>
          <Header name="My Reports" />
          <div className={report.leftcontainer}>
            <div className={report.flexwrap}>
              <NavCategories
                name="All Files"
                total={`(${ReportsCollection.length})`}
                filter={filter}
                filter1={null}
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Pictures"
                filter={filter}
                filter1="image"
                total={`(${filteredImage.length})`}
                onClick={() => setFilter("image")}
              />
              <NavCategories
                name="Video"
                filter={filter}
                filter1="video"
                total={`(${filteredVideo.length})`}
                onClick={() => setFilter("video")}
              />
              <NavCategories
                name="Documents"
                filter={filter}
                filter1="document"
                total={`(${filteredDocument.length})`}
                onClick={() => setFilter("document")}
              />
            </div>
            <div className={report.datepickertitle}>
              <p className={report.datepickertitlelabel}>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                // width={300}
              />
            </div>
            <div className={report.absolutecenter}>
              <div className={report.dash}></div>
            </div>
            <div className={report.datepickertitle}>
              <p className={report.datepickertitlelabel}>End Date</p>
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

            {/* )} */}
          </div>
          <div>
            {data.length >= 1 ? (
              <div className={report.filecontainergrid}>
                {data.map((repo, index) => {
                  return (
                    <FileContainer
                      key={index}
                      name={repo.name}
                      size={repo.size}
                      date={repo.date}
                      imagelink={repo.type}
                    />
                  );
                })}
              </div>
            ) : (
              <div style={{ marginTop: "3rem" }}>
                <p className={report.nothing}>There are no reports</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayoutContents>
    </Container>
  );
};

export default ReportsDashboard;

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button
      className={
        active ? report.tablenavcontaineractive : report.tablenavcontainer
      }
      onClick={props.onClick}
    >
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={report.disappear}>{props.filter}</span>
      <span className={report.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};

const FileContainer = (props) => {
  return (
    <div className={report.filecontainer} onClick={props.handleclick}>
      <div className={report.centericon}>
        {props.imagelink === "image/jpeg" ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : props.imagelink === "image/png" ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : props.imagelink === "image/svg+xml" ? (
          <Image src="/icons/jpg.svg" alt="jpg" />
        ) : null}
      </div>
      <div className={report.filerightcontainer}>
        <p className={report.name}>{truncateString(props.name, 10)}</p>
        <div className={report.flex}>
          <p className={report.size}> {Math.round(props.size / 1000) + "kb"}</p>
          <p className={report.date}>
            {" "}
            {new Date(props.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={report.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={report.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={report.calendaricon}
      />
    </div>
    <p className={report.datevalue}>{value}</p>
  </button>
));
