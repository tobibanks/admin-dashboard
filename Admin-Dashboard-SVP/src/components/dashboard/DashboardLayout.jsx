import React, { useState } from "react";
import side from "./User.module.css";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardLayout = (props) => {
  const [display, setDisplay] = useState(false);
  // const active = navbarlinksandtitle.
  return (
    <Container className={side.container}>
      <Row className={side.rowcontainer}>
        <Col lg={2} className={display ? side.activemainnav : side.mainnav}>
          <div className={side.navbar}>
            <div
              className={side.closecontainer}
              onClick={() => setDisplay(!display)}
            >
              <Image
                src="/icons/sidebar/close.svg"
                className={side.hamburgericon}
              />
            </div>
            <div className={side.centerimage}>
              <img
                src="/images/svp.png"
                className={side.header}
                alt="..."
              ></img>
            </div>
            <div className={side.centercontainer1}>
              <p className={side.welcomemessage}>
                Hello,<span className={side.welcomecolormessage}> John</span>
              </p>
              <NavbarTab
                imagelinkactive="/icons/sidebar/dashboard-icon.svg"
                imagelink="/icons/sidebar/dashboard.svg"
                // imagelinkactive = "/icons/sidebar/svp.svg"
                name="Dashboard"
                path="/"
              />
              <NavbarTab
                imagelink="/icons/sidebar/project-icon.svg"
                imagelinkactive="/icons/sidebar/active-project.svg"
                name="Projects"
                path="/project"
                path1="/project/board"
                path2="/project/grid"
                path3="/project/form"
              />
              <NavbarTab
                imagelink="/icons/sidebar/tasks-icon.svg"
                imagelinkactive="/icons/sidebar/active-tasks.svg"
                name="Tasks"
                path="/task"
                path1="/task/board"
                path2="/task/calendar"
              />
              <NavbarTab
                imagelink="/icons/sidebar/reports-icon.svg"
                imagelinkactive="/icons/sidebar/active-reports.svg"
                name="Reports"
                path="/reports"
                path1="/reports/table"
                path2="/reports/grid"
              />
              <NavbarTab
                imagelink="/icons/sidebar/messages-icon.svg"
                imagelinkactive="/icons/sidebar/active-messages.svg"
                name="Messages"
                path="/message"
              />
            </div>
            <div className={side.logOutContainer}>
              <div className={side.center}>
                <div className={side.flex}>
                  <div>
                    <Image src="/images/avatar.png" alt="avatar" />
                  </div>
                  <div className={side.textcontainer}>
                    <p className={side.avatartitle}>John Doe</p>
                    <p className={side.avatarcontext}>johndoe@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className={side.center1}>
                <div className={side.button}>
                  <p className={side.logouttext}>Log Out</p>
                  <Image src="/icons/sidebar/log-out.svg" alt="log-out-icon" />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={10} md={9} sm={9} className={side.centercontainer}>
          <div className={side.rightcontainer}>
            <div className={side.titlecontainer}>
              <div
                className={side.hamburgercontainer}
                onClick={() => setDisplay(!display)}
              >
                <Image
                  src="/icons/sidebar/hamburger.svg"
                  className={side.hamburgericon}
                />
              </div>
              <div className={side.center}>
                <p className={side.headertitle}>{props.name}</p>
              </div>
              <Image
                src="/icons/dashboard/alarm-icon.svg"
                className={side.alarm}
              />
            </div>
          </div>
          <div className={side.contentscontainer}>{props.children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;

const NavbarTab = (props) => {
  const active =
    location.pathname === props.path ||
    location.pathname === props.path1 ||
    location.pathname === props.path2 ||
    location.pathname === props.path3;
  return (
    <div className={side.hovertext}>
      <Link to={props.path}>
        <div
          className={
            active ? side.navbarTabContainerActive : side.navbarTabContainer
          }
        >
          <div className={side.center}>
            {active ? (
              <Image src={`${props.imagelinkactive}`} />
            ) : (
              <Image src={`${props.imagelink}`} />
            )}
          </div>
          <div className={side.center}>
            <p className={active ? side.linktextactive : side.linktext}>
              {props.name}
            </p>
            <p className={side.displaytext}>{props.path1}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
