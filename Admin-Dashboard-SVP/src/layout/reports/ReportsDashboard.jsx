import React, { useState, useMemo, forwardRef } from "react";
import { Container, Button, Image } from "react-bootstrap";
import report from "./reports.module.css";
import './projects.css'
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/reports/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileInputContainer from "@/components/reports/FileInputContainer";
import { useGetReportsDetailsQuery } from "../../app/services/auth/authService";
import { truncateString } from "../../../util/text";

const ReportsDashboard = () => {
  const { data: AdminReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ReportsCollection = AdminReports || [];

  // console.log(ReportsCollection[0]?.attachments[0]?.type);

  console.log(ReportsCollection);
  const [filter, setFilter] = useState(null);

  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2077"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const data = useMemo(() => {
    if (!filter) return ReportsCollection;
    const filteredData = ReportsCollection.map((report) => ({
      ...report,
      attachments: report.attachments.filter((attachment) =>
        attachment.type.startsWith(filter)
      ),
    }));
    return filteredData;
  }, [filter, ReportsCollection]);

  const dataByDate = useMemo(() => {
    const filtereddata = data.filter(
      (item) =>
        finalStartDate <= new Date(item.due).getTime() &&
        new Date(item.due).getTime() <= finalEndDate
    );
    return filtereddata;
  }, [finalStartDate, finalEndDate, data]);

  console.log(data);

  const filteredImage = ReportsCollection.map((reportcollection) =>
    reportcollection.attachments.filter((attachment) =>
      attachment.type.startsWith("image")
    )
  );

  const filteredVideo = ReportsCollection.map((reportcollection) =>
    reportcollection.attachments.filter((attachment) =>
      attachment.type.startsWith("video")
    )
  );

  const filteredDocument = ReportsCollection.map((reportcollection) =>
    reportcollection.attachments.filter((attachment) =>
      attachment.type.startsWith("document")
    )
  );

  console.log(filteredImage);
  console.log(ReportsCollection);
  return (
    <Container className={report.container}>
      <DashboardLayout name="Reports">
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
                onClick={() => setFilter("application")}
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
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                // width={300}
              />
            </div>
            <div className={report.absolutecenter}>
              <div className={report.dash}></div>
            </div>
            <div className={report.datepickertitle}>
              <p className={report.datepickertitlelabel}>Start Date</p>
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
          </div>
          <div className={report.wrapcontainer}>
            {data.map((report, index) => {
              const dateReport = report.date;
              return (
                <div key={index} style={{ display: "grid", gap: "2rem" }}>
                  {report.attachments.map((repo, index) => (
                    <FileContainer
                      key={index}
                      name={repo.name}
                      size={repo.size}
                      date={dateReport}
                      imagelink={repo.type}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
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
