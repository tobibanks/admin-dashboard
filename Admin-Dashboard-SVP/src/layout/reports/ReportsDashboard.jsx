import React, { useState, useMemo } from "react";
import { Container, Button, Image } from "react-bootstrap";
import report from "./reports.module.css";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Header from "../../components/reports/Header";
import TableHeaderNav from "../../components/project/TableHeaderNav";
import FileInputContainer from "@/components/reports/FileInputContainer";
import { reports } from "../../../data/reports";
import ReportModal from "@/components/reports/ReportModal";

const ReportsDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const data = useMemo(() => {
    if (!filter) return reports;
    const filteredData = reports.filter((item) => item.file === filter);
    return filteredData;
  }, [filter]);

  const filteredImage = reports.filter((item) => item.file === "image");
  const filteredVideo = reports.filter((item) => item.file === "video");
  const filteredDocument = reports.filter((item) => item.file === "document");
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
                total={`(${reports.length})`}
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
            <TableHeaderNav />
          </div>
          <div className={report.wrapcontainer}>
            {data.map((report, index) => (
              <FileContainer
                key={index}
                imagelink={report.src}
                name={report.name}
                size={report.size}
                date={report.dateuploaded}
                handleclick={() => {
                  setModalShow(true);
                }}
              />
            ))}
          </div>
        </div>
      </DashboardLayout>
      <ReportModal show={modalShow} onHide={() => setModalShow(false)} />
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
        <Image src={`${props.imagelink}`} alt="imageicon" />
      </div>
      <div>
        <p className={report.name}>{props.name}</p>
        <div className={report.flex}>
          <p className={report.size}>{props.size}</p>
          <p className={report.date}>{props.date}</p>
        </div>
      </div>
    </div>
  );
};
