import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FileInputContainer from "@/components/reports/FileInputContainer";
import React, { useState, useMemo } from "react";
import { Container, Button, Image } from "react-bootstrap";
import reporttable from "./reports.module.css";
import "./changes.css";
import TableHeaderNav from "@/components/project/TableHeaderNav";
import Header from "@/components/reports/Header";
import ReportsTableContents from "@/components/reports/ReportsTableContents";
import { TablesData } from "../../../data/reports";

const ReportsTableDashboard = () => {
  const [filter, setFilter] = useState(null);

  const data = useMemo(() => {
    if (!filter) return TablesData;
    const filteredData = TablesData.filter((item) => item.file === filter);
    return filteredData;
  }, [filter]);

  const filteredImage = TablesData.filter((item) => item.file === "image");
  const filteredVideo = TablesData.filter((item) => item.file === "video");
  const filteredDocument = TablesData.filter(
    (item) => item.file === "document"
  );
  return (
    <Container className={reporttable.container}>
      <DashboardLayout name="Reports">
        <FileInputContainer />
        <div className={reporttable.overallcontainer}>
          <Header name="My Reports" />
          <div className={reporttable.leftcontainer}>
            <div className={reporttable.flexwrap}>
              <NavCategories
                name="All Files"
                total={`(${TablesData.length})`}
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
          <ReportsTableContents>
            {data.map((tabledata, index) => (
              <tr key={index}>
                <td>
                  <div className={reporttable.flextable}>
                    <Image src={tabledata.src} />
                    <div className={reporttable.absolutecenter}>
                      <p className={reporttable.tablename}>{tabledata.name}</p>
                    </div>
                  </div>
                </td>
                <td>{tabledata.projectname}</td>
                <td>{tabledata.sentfrom}</td>
                <td>{tabledata.sentto}</td>
                <td>{tabledata.datereceived}</td>
              </tr>
            ))}
          </ReportsTableContents>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ReportsTableDashboard;

const NavCategories = (props) => {
  const active = props.filter === props.filter1;
  return (
    <Button className={active ? reporttable.tablenavcontaineractive : reporttable.tablenavcontainer} onClick={props.onClick}>
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={reporttable.disappear}>{props.filter}</span>
      <span className={reporttable.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};
