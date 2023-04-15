import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FileInputContainer from "@/components/reports/FileInputContainer";
import React, { useState, useMemo, forwardRef } from "react";
import { Container, Button, Image } from "react-bootstrap";
import reporttable from "./reports.module.css";
import "./changes.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableHeaderNav from "@/components/project/TableHeaderNav";
import Header from "@/components/reports/Header";
import { useGetReportsDetailsQuery } from "../../app/services/auth/authService";
import ReportsTableContents from "@/components/reports/ReportsTableContents";
import { TablesData } from "../../../data/reports";
import { truncateString } from "../../../util/text";
import DashboardLayoutContents from "../../components/dashboard/DashboardLayoutContents";

const ReportsTableDashboard = () => {
  const [filter, setFilter] = useState(null);

  const { data: AdminReports } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const ReportsCollection = AdminReports || [];

  const [modalShow, setModalShow] = React.useState(false);

  const [startDate, setStartDate] = useState(new Date("01/01/2023"));
  const [endDate, setEndDate] = useState(new Date("01/01/2025"));

  const convertedStartDate = new Date(startDate).toISOString();
  const convertedEndDate = new Date(endDate).toISOString();

  const finalStartDate = new Date(convertedStartDate).getTime();
  const finalEndDate = new Date(convertedEndDate).getTime();

  const data = useMemo(() => {
    if (!filter) return ReportsCollection;
    const filteredData = ReportsCollection.filter((item) =>
      item.type.startsWith(filter)
    );
    return filteredData;
  }, [filter, ReportsCollection]);

  const filteredDocument = ReportsCollection.filter((item) =>
    item.type.startsWith("application")
  );

  const filteredImage = ReportsCollection.filter((item) =>
    item.type.startsWith("image")
  );

  const filteredVideo = ReportsCollection.filter((item) =>
    item.type.startsWith("video")
  );

  console.log(ReportsCollection);

  return (
    <Container className={reporttable.container}>
      <DashboardLayoutContents name="Reports">
        <FileInputContainer />
        <div className={reporttable.overallcontainer}>
          <Header name="My Reports" />
          <div className={reporttable.leftcontainer}>
            <div className={reporttable.flexwrap}>
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
            <div className={reporttable.datepickertitle}>
              <p className={reporttable.datepickertitlelabel}>Start Date</p>
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
            <div className={reporttable.absolutecenter}>
              <div className={reporttable.dash}></div>
            </div>
            <div className={reporttable.datepickertitle}>
              <p className={reporttable.datepickertitlelabel}>End Date</p>
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
          <div>
            {data.length >= 1 ? (
              <ReportsTableContents>
                {data.map((tabledata, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div style={{ display: "flex" }}>
                          {tabledata.type === "image/jpeg" ? (
                            <Image src="/icons/jpg.svg" alt="jpg" />
                          ) : tabledata.type === "image/png" ? (
                            <Image src="/icons/jpg.svg" alt="jpg" />
                          ) : tabledata.type === "image/svg+xml" ? (
                            <Image src="/icons/jpg.svg" alt="jpg" />
                          ) : null}
                          <div className={reporttable.absolutecenter}>
                            {tabledata?.name?.substring(0, 10)}
                          </div>
                        </div>
                      </td>
                      <td>{tabledata?.project_name}</td>
                      <td>{tabledata?.send_from}</td>
                      <td>{tabledata?.sent_to}</td>
                      <td>{new Date(tabledata?.date).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </ReportsTableContents>
            ) : (
              <div style={{ marginTop: "3rem" }}>
                <p className={reporttable.nothing}>There are no projects</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayoutContents>
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

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={reporttable.datepickerbutton} onClick={onClick} ref={ref}>
    <div className={reporttable.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={reporttable.calendaricon}
      />
    </div>
    <p className={reporttable.datevalue}>{value}</p>
  </button>
));
