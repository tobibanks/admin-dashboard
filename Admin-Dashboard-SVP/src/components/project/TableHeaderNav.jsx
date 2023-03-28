import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import cart from "./general.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "./changes.css";
import { Image } from "react-bootstrap";

// import { ToggleButton } from "@progress/kendo-react-dateinputs";

const TableHeaderNav = (props) => {
  const [startDate, setStartDate] = useState(new Date("2023/02/01"));
  const [endDate, setEndDate] = useState(new Date("2023/03/01"));

  return (
    <div className={cart.appear}>
      <div className={cart.headernavcategoriescontainer}>
        <div className={cart.leftcontainer}>
          <div className={cart.rightcontainer}>
            <DatePicker
              dateFormat="d MMMM, yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              customInput={<ExampleCustomInput />}
              // width={300}
            />
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              customInput={<ExampleCustomInput />}
              dateFormat="d MMMM, yyyy"
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          {/* <div className={cart.absolutecenter}>
            <div className={cart.flexcontent}>
              <Image src="/icons/header/group.svg" />
              <p className={cart.grouptext}>Group By: Name</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TableHeaderNav;

const NavCategories = (props) => {
  return (
    <div className={cart.tablenavcontainer} onClick={props.onClick}>
      <p className={cart.tablenavtext}>
        {props.name}
        <span>{props.total}</span>
      </p>
    </div>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={cart.datepickerbutton} onClick={onClick} ref={ref}>
    <di className={cart.center}>
      <Image
        src="/icons/calendar.svg"
        alt="icon"
        className={cart.calendaricon}
      />
    </di>
    {value}
  </button>
));
