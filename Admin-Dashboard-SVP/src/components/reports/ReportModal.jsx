import React from "react";
import { Modal, Image, Button } from "react-bootstrap";
import modal from "./general.module.css";
import "./modal.css";
import Form from "react-bootstrap/Form";
import {
  useGetAllUsersDetailsQuery,
  useGetTaskDetailsQuery,
} from "../../app/services/auth/authService";

const ReportModal = (props) => {
  const [modalShow, setModalShow] = React.useState(true);
  const { data: TaskCollection, isLoading } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const { data: Users } = useGetAllUsersDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const TaskCollections = TaskCollection || [];
  console.log(TaskCollections);

  const UserCollection = Users || [];

  console.log(UserCollection);

  return (
    <Modal
      className={modal.modal}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={modal.modalbody}>
        {/* <div className={modal.attachmentflex}>
          {ImageAttachment.map((attachment, index) => (
            <Attachment
              key={index}
              imagelink={attachment.src}
              attachmentname={attachment.attachmentname}
              attachmentsize={attachment.attachmentsize}
            />
          ))}
        </div> */}
        <div className={modal.absolutecenter2}>
          <Button className={modal.addfile}>Add New File</Button>
        </div>
        <p className={modal.title}>Tasks</p>
        <Form>
          {TaskCollections.map((task, index) => (
            <Form.Check
              type="radio"
              key={index}
              name="task"
              id="custom-switch"
              label={task.name}
            />
          ))}
        </Form>
        <div className={modal.flexcontainer}>
          <p className={modal.title}>Send to:</p>
          <div className={modal.absolutecenter3}>
            <div className={modal.searchiconcontainer}>
              <input
                type="text"
                placeholder="Search Clients"
                className={modal.search}
              ></input>
              <Image src="/icons/search.svg" className={modal.searchicon} />
            </div>
          </div>
        </div>
        <Form>
          {UserCollection.map((usercollect, index) => (
            <Form.Check
              defaultChecked
              type="checkbox"
              key={index}
              id="custom-switch1"
              label={usercollect?.firstname}
            />
          ))}
        </Form>
        <p className={modal.title}>Note</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            className={modal.textarea}
            rows={3}
            placeholder="Type here"
          />
        </Form.Group>
        <div className={modal.absoluterightendcontainer}>
          <div className={modal.flexbuttoncontainer}>
            {/* <Button
              className={modal.cancelbutton}
              onClick={() => {
                setModalShow();
              }}
            >
              Cancel
            </Button> */}
            <Button className={modal.sharebutton}>Submit Form</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;

const Attachment = (props) => {
  return (
    <div className={modal.attachmentcontainer}>
      <div className={modal.absolutecenter1}>
        <Image
          src={`${props.imagelink}`}
          alt="image-link"
          className={modal.attachmentimage}
        />
      </div>
      <div>
        <p className={modal.attachmenttext}>{props.attachmentname}</p>
        <p className={modal.attachmentsize}>{props.attachmentsize}</p>
      </div>
    </div>
  );
};
