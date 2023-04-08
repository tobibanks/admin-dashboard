import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FileInputContainer from "@/components/reports/FileInputContainer";
import React, { useState, useMemo } from "react";
import Header from "../../components/reports/Header";
import reportsgrid from "./reports.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, Image } from "react-bootstrap";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import { reportgriddata } from "../../../data/reports";
import { truncateString } from "../../../util/text";
import { useGetReportsDetailsQuery } from "../../app/services/auth/authService";

const ReportsGridDashboard = () => {
  const [filter, setFilter] = useState(null);

  const { data: AdminReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ReportsCollection = AdminReports || [];

  console.log(ReportsCollection);

  const [startDate, setStartDate] = useState(new Date("01/01/1998"));
  const [endDate, setEndDate] = useState(new Date("01/01/2023"));

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

  return (
    <Container className={reportsgrid.container}>
      <DashboardLayout name="Reports">
        <FileInputContainer />
        <div className={reportsgrid.overallcontainer}>
          <Header name="My Reports" />
          <div className={reportsgrid.leftcontainer}>
            <div className={reportsgrid.flexwrap}>
              <NavCategories
                name="All Files"
                filter={filter}
                filter1={null}
                total={`(${reportgriddata.length})`}
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
            <TableHeaderNav />
          </div>
          <div className={reportsgrid.flexwrapcontainer}>
            {/* {data.map((report, index) => (
              <CardGridContainer
                key={index}
                imagesrc={report.type}
                name={report.name}
                // mainimage={report.mainimage}
                // avatar={report.avatar}
                // avatarname={report.avatarname}
                date={report.dateuploaded}
              />
            ))} */}
            {data.map((report, index) => {
              const dateReport = report.date;
              return (
                <div key={index} style={{ display: "grid", gap: "2rem" }}>
                  {report.attachments.map((repo, index) => (
                    <CardGridContainer
                      key={index}
                      url={repo.url}
                      firstname={repo?.sent_to?.firstname || null}
                      // lastname = {repo?.sent_to?.lastname}
                      name={repo.name}
                      // mainimage={report.mainimage}
                      // avatar={report.avatar}
                      // avatarname={report.avatarname}
                      date={dateReport}
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

export default ReportsGridDashboard;

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button
      className={
        active
          ? reportsgrid.tablenavcontaineractive
          : reportsgrid.tablenavcontainer
      }
      onClick={props.onClick}
    >
      {props.name}
      <span>{props.total}</span>
      <span className={reportsgrid.disappear}>{props.filter}</span>
      <span className={reportsgrid.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};

const CardGridContainer = (props) => {
  return (
    <div className={reportsgrid.cardcontainer}>
      <div className={reportsgrid.flexcontainer}>
        {/* <img src={props.url} alt="image-icon" /> */}
        <div className={reportsgrid.absolutecenter}>
          <p className={reportsgrid.filename}>
            {truncateString(props.name, 7)}
          </p>
          {/* <span>{truncateString(props.lastname, 1)}</span> */}
        </div>
      </div>
      {/* <Image
        src={`${props.mainimage}`}
        alt="main-image"
        className={reportsgrid.mainimage}
      /> */}
      <div className={reportsgrid.flexjust}>
        <div className={reportsgrid.flexcontainer}>
          {/* <Image src={`${props.avatar}`} /> */}
          <div className={reportsgrid.absolutecenter}>
            <p className={reportsgrid.avatarname}>{props.firstname}</p>
            <p className={reportsgrid.avatarname}>{props.lastname}</p>
          </div>
        </div>
        <div className={reportsgrid.absolutecenter}>
          <p className={reportsgrid.date}>
            {" "}
            {new Date(props.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
