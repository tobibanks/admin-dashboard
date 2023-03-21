import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import projectform from "./project.module.css";
import Form from "react-bootstrap/Form";
import { Container, Button } from "react-bootstrap";
import "./projects.css";
import { Link, useNavigate } from "react-router-dom";

const ProjectFormDashboard = () => {
  const navigate = useNavigate();
  return (
    <Container className={projectform.container}>
      <DashboardLayout name="Projects">
        <div className={projectform.overallcontainer}>
          <p className={projectform.header}>Project Request Form</p>
          <div className={projectform.secondheader}>
            <p className={projectform.header1}>PROJECT INFORMATION</p>
          </div>
          <Form>
            <div className={projectform.formcontainer}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={projectform.form1}>
                  Requested By
                </Form.Label>
                <Form.Control type="email" placeholder="User Name" />
              </Form.Group>
            </div>
            <div className={projectform.formcontainer1}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={projectform.form1}>
                  Project Title (for referencing project):
                </Form.Label>
                <Form.Control type="email" placeholder="Type here..." />
              </Form.Group>
            </div>
            <div className={projectform.formcontainer}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={projectform.form1}>
                  When do you need this?
                </Form.Label>
                <Form.Control type="email" placeholder="Type Here..." />
              </Form.Group>
            </div>
          </Form>

          <p className={projectform.header2}>PROJECT INFORMATION</p>
          <div className={projectform.formcontainer1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={projectform.form1}>
                Please provide detailed informaton about your project:
              </Form.Label>
              <Form.Control type="email" placeholder="Type here..." />
            </Form.Group>
          </div>
          <div className={projectform.formcontainer1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={projectform.form1}>
                Size of Site:
              </Form.Label>
              <Form.Control type="email" placeholder="Type here..." />
            </Form.Group>
          </div>
          <div className={projectform.formcontainer1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={projectform.form1}>Budget:</Form.Label>
              <Form.Control type="email" placeholder="Type here..." />
            </Form.Group>
          </div>
          <div className={projectform.formcontainer1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={projectform.form1}>
                Building Location:
              </Form.Label>
              <Form.Control type="email" placeholder="Type here..." />
            </Form.Group>
          </div>
          <div className={projectform.formcontainer1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={projectform.form1}>
                Building Type:
              </Form.Label>
              <Form.Control type="email" placeholder="Type here..." />
            </Form.Group>
          </div>
          <Form.Label className={projectform.form2}>
            Do You Have A Design?
          </Form.Label>
          <div className={projectform.radiocontainer}>
            {/* <Form> */}
            <Form.Check type="radio" id="custom-switch" label="No" />
            <Form.Check type="radio" label="Yes" id="disabled-custom-switch" />
            {/* </Form> */}
          </div>
          <div className={projectform.formcontainer1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={projectform.form1}>
                What is Site Condition?
              </Form.Label>
              <Form.Control type="email" placeholder="Type here..." />
            </Form.Group>
          </div>
          <div className={projectform.formcontainer1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={projectform.form1}>
                Facilities surrounding site and on site:
              </Form.Label>
              <Form.Control type="email" placeholder="Type here..." />
            </Form.Group>
          </div>
          <div className={projectform.absoluterightendcontainer}>
            <div className={projectform.flexbuttoncontainer}>
              <Button
                className={projectform.cancelbutton}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button className={projectform.submitbutton}>Submit Form</Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
};

export default ProjectFormDashboard;
