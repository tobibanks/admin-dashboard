import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FileInputContainer from "@/components/reports/FileInputContainer";
import React, { useState, useMemo, forwardRef, useEffect } from "react";
import { Container, Button, Image, Form } from "react-bootstrap";
import reporttable from "./reports.module.css";
import "./changes.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableHeaderNav from "@/components/project/TableHeaderNav";
import Header from "@/components/reports/Header";
import {
  useGetReportsDetailsQuery,
  useGetProjectDetailsQuery,
  useGetTaskDetailsQuery,
} from "../../app/services/auth/authService";
import ReportsTableContents from "@/components/reports/ReportsTableContents";
import { TablesData } from "../../../data/reports";
import { truncateString } from "../../../util/text";
import DashboardLayoutContents from "../../components/dashboard/DashboardLayoutContents";
import SkeleteonLoaderTable from "../../components/dashboard/SkeleteonLoaderTable";

const ReportsTableDashboard = () => {
  const [filter, setFilter] = useState(null);
  const [select, setSelect] = useState("");
  const [task, setTask] = useState("");
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("There are no reports");

  const { data: AdminReports, isLoading } = useGetReportsDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: projects } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: tasks } = useGetTaskDetailsQuery({
    refetchOnMountOrArgChange: true,
  });
  const ReportsCollection = AdminReports || [];

  const projectsCollection = projects || [];

  const taskCollection = tasks || [];

  const [modalShow, setModalShow] = React.useState(false);

  const [startDate, setStartDate] = useState(new Date("01/01/2021"));
  const [endDate, setEndDate] = useState(new Date("01/01/2029"));

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

  const filteredCollection = useMemo(() => {
    if (!task) return data;
    const filteredData = data.filter((item) => item.task_id === task);

    return filteredData;
  }, [task, data]);

  // const dataByDate = useMemo(() => {
  //   const filtereddata = data.filter(
  //     (item) =>
  //       finalStartDate <= new Date(item.date).getTime() &&
  //       new Date(item.date).getTime() <= finalEndDate
  //   );
  //   return filtereddata;
  // }, [finalStartDate, finalEndDate, data]);

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

    setDisplay(true);
  };

  const handleTask = (e) => {
    setTask(e.target.value);

    setMessage("There are no reports for selected task");
  };

  const filteredtasks = useMemo(() => {
    const filtereddata = taskCollection.filter(
      (item) => item.project.id === select
    );
    return filtereddata;
  }, [select, ReportsCollection]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={reporttable.container}>
      <DashboardLayout name="Reports">
        <div className={reporttable.overallcontainer}>
          <FileInputContainer />
          <Header name="My Reports" />
          <div className={reporttable.leftcontainer}>
            <div className={reporttable.flexwrap}>
              <NavCategories
                name="All Files"
                total={`(${ReportsCollection.length})`}
                filter={filter}
                filter1={null}
                onClick={() => {
                  setFilter(null);
                  setTask(null);
                  setMessage("There are no reports");
                }}
              />

              <NavCategories
                name="Pictures"
                filter={filter}
                filter1="image"
                total={`(${filteredImage.length})`}
                onClick={() => {
                  setFilter("image");
                  setTask(null);
                  setMessage("There are no pictures");
                }}
              />
              <NavCategories
                name="Videos"
                filter={filter}
                filter1="video"
                total={`(${filteredVideo.length})`}
                onClick={() => {
                  setFilter("video");
                  setTask(null);
                  setMessage("There are no videos");
                }}
              />
              <NavCategories
                name="Documents"
                filter={filter}
                filter1="document"
                total={`(${filteredDocument.length})`}
                onClick={() => {
                  setFilter("document");
                  setTask(null);
                  setMessage("There are no documents");
                }}
              />
            </div>
            {/* <div className={reporttable.datepickertitle}>
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
            </div> */}
            <div className={reporttable.absolutecenter}>
              <Form.Select
                onChange={handleProject}
                // value={select}
                aria-label="Default select example"
              >
                <option>Select A Project</option>
                {projectsCollection.map((pcollect, index) => (
                  <option key={index} value={pcollect._id}>
                    {pcollect.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className={reporttable.absolutecenter}>
              {display ? (
                <Form.Select
                  onChange={handleTask}
                  aria-label="Default select example"
                >
                  <option>Select A Task</option>
                  {filteredtasks.map((task, index) => (
                    <option key={index} value={task._id}>
                      {task.name}
                    </option>
                  ))}
                </Form.Select>
              ) : null}
            </div>
          </div>
          <div>
            {isLoading ? (
              <SkeleteonLoaderTable />
            ) : (
              <>
                {filteredCollection.length >= 1 ? (
                  <ReportsTableContents>
                    {filteredCollection.map((tabledata, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div style={{ display: "flex" }}>
                              {tabledata.type.startsWith("image") ? (
                                <Image src="/icons/jpg.svg" alt="jpg" />
                              ) : tabledata.type.startsWith("application") ? (
                                <Image src="/icons/pdf.svg" alt="jpg" />
                              ) : tabledata.type.startsWith("video") ? (
                                <Image src="/icons/reports/pdf.svg" alt="jpg" />
                              ) : null}
                              <div className={reporttable.absolutecenter}>
                                {tabledata?.name?.substring(0, 10)}
                              </div>
                            </div>
                          </td>
                          <td>{tabledata?.project_name}</td>
                          <td>{tabledata?.send_from}</td>
                          <td>{tabledata?.sent_to}</td>
                          <td>
                            {new Date(tabledata?.date).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </ReportsTableContents>
                ) : (
                  <div style={{ marginTop: "2rem" }}>
                    <p className={reporttable.nothing}>{message}</p>
                  </div>
                )}
              </>
            )}
          </div>
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
