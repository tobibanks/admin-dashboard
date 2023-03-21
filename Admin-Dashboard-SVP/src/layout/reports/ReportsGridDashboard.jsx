import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FileInputContainer from "@/components/reports/FileInputContainer";
import React, { useState, useMemo } from "react";
import Header from "../../components/reports/Header";
import reportsgrid from "./reports.module.css";
import { Container, Button, Image } from "react-bootstrap";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import { reportgriddata } from "../../../data/reports";

const ReportsGridDashboard = () => {
  const [filter, setFilter] = useState(null);

  const data = useMemo(() => {
    if (!filter) return reportgriddata;
    const filteredData = reportgriddata.filter((item) => item.file === filter);
    return filteredData;
  }, [filter]);

  const filteredImage = reportgriddata.filter((item) => item.file === "image");
  const filteredVideo = reportgriddata.filter((item) => item.file === "video");
  const filteredDocument = reportgriddata.filter(
    (item) => item.file === "document"
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
                total={`(${reportgriddata.length})`}
                onClick={() => setFilter(null)}
              />

              <NavCategories
                name="Pictures"
                total={`(${filteredImage.length})`}
                onClick={() => setFilter("image")}
              />
              <NavCategories
                name="Video"
                total={`(${filteredVideo.length})`}
                onClick={() => setFilter("video")}
              />
              <NavCategories
                name="Documents"
                total={`(${filteredDocument.length})`}
                onClick={() => setFilter("document")}
              />
            </div>
            <TableHeaderNav />
          </div>
          <div className={reportsgrid.flexwrapcontainer}>
            {data.map((report, index) => (
              <CardGridContainer
                imagesrc={report.src}
                name={report.name}
                mainimage={report.mainimage}
                avatar={report.avatar}
                avatarname={report.avatarname}
                date={report.dateuploaded}
              />
            ))}
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ReportsGridDashboard;

const NavCategories = (props) => {
  return (
    <Button className={reportsgrid.tablenavcontainer} onClick={props.onClick}>
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      {/* </p> */}
    </Button>
  );
};

const CardGridContainer = (props) => {
  return (
    <div className={reportsgrid.cardcontainer}>
      <div className={reportsgrid.flexcontainer}>
        <Image src={`${props.imagesrc}`} alt="image-icon" />
        <div className={reportsgrid.absolutecenter}>
          <p className={reportsgrid.filename}>{props.name}</p>
        </div>
      </div>
      <Image
        src={`${props.mainimage}`}
        alt="main-image"
        className={reportsgrid.mainimage}
      />
      <div className={reportsgrid.flexjust}>
        <div className={reportsgrid.flexcontainer}>
          <Image src={`${props.avatar}`} />
          <div className={reportsgrid.absolutecenter}>
            <p className={reportsgrid.avatarname}>{props.avatarname}</p>
          </div>
        </div>
        <div className={reportsgrid.absolutecenter}>
          <p className={reportsgrid.date}>{props.date}</p>
        </div>
      </div>
    </div>
  );
};
