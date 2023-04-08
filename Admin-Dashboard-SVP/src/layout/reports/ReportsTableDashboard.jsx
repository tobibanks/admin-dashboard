import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FileInputContainer from "@/components/reports/FileInputContainer";
import React, { useState, useMemo } from "react";
import { Container, Button, Image } from "react-bootstrap";
import reporttable from "./reports.module.css";
import "./changes.css";
import TableHeaderNav from "@/components/project/TableHeaderNav";
import Header from "@/components/reports/Header";
import { useGetReportsDetailsQuery } from "../../app/services/auth/authService";
import ReportsTableContents from "@/components/reports/ReportsTableContents";
import { TablesData } from "../../../data/reports";
import { truncateString } from "../../../util/text";

const ReportsTableDashboard = () => {
  const [filter, setFilter] = useState(null);

  const { data: AdminReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ReportsCollection = AdminReports || [];

  const [modalShow, setModalShow] = React.useState(false);

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
                    {/* <Image src={tabledata.src} /> */}
                    <div className={reporttable.absolutecenter}>
                      <p className={reporttable.tablename}>{tabledata.name}</p>
                    </div>
                  </div>
                </td>
                <td>{tabledata.project.name}</td>
                <td>{tabledata?.sent_from?.firstname}</td>
                <td>{tabledata?.sent_to?.firstname}</td>
                <td>{new Date(tabledata?.date).toLocaleDateString()}</td>
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
    <Button
      className={
        active
          ? reporttable.tablenavcontaineractive
          : reporttable.tablenavcontainer
      }
      onClick={props.onClick}
    >
      {/* <p className={project.tablenavtext}> */}
      {props.name}
      <span>{props.total}</span>
      <span className={reporttable.disappear}>{props.filter}</span>
      <span className={reporttable.disappear}>{props.filter1}</span>
      {/* </p> */}
    </Button>
  );
};
