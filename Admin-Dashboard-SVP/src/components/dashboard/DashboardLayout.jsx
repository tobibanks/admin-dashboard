import React from "react";
import side from "./User.module.css";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardLayout = (props) => {
  // const active = navbarlinksandtitle.
  return (
    <Container className={side.container}>
      <Row className={side.rowcontainer}>
        <Col lg={2} className={side.mainnav}>
          <div className={side.navbar}>
            <div className={side.center}>
              <img
                src="/images/svp.svg"
                className={side.header}
                alt="..."
              ></img>
            </div>
            <div className={side.centercontainer1}>
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
              />
              <NavbarTab
                imagelink="/icons/sidebar/tasks-icon.svg"
                imagelinkactive="/icons/sidebar/active-tasks.svg"
                name="Tasks"
                path="/task"
              />
              <NavbarTab
                imagelink="/icons/sidebar/reports-icon.svg"
                imagelinkactive="/icons/sidebar/active-reports.svg"
                name="Reports"
                path="/reports"
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
        <Col lg={10} className={side.centercontainer}>
          <div className={side.rightcontainer}>
            <div className={side.titlecontainer}>
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
    location.pathname === props.path && location.pathname.includes(props.path);
  console.log(active);
  console.log(location.pathname.includes(props.path));
  console.log(location.pathname);
  // console.log(props.path);
  return (
    <div className={side.hovertext}>
      <Link to={props.path} className={active ? side.linkactive : side.link}>
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
          </div>
        </div>
      </Link>
    </div>
  );
};
