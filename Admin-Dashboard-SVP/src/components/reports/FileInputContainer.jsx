import React, { useState } from "react";
import input from "./general.module.css";
import { Button } from "react-bootstrap";
import { MdOutlineCloudUpload } from "react-icons/md";
import ReportModal from "@/components/reports/ReportModal";
import { useGetTaskDetailsQuery } from "../../app/services/auth/authService";

const FileInputContainer = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { data: TaskCollection, isLoading } = useGetTaskDetailsQuery({
    refetchOnMountArgChange: true,
  });

  const TaskCollections = TaskCollection || [];

  return (
    <div className={input.absolutecenter}>
      <div className={input.innercontainer}>
        <div className={input.innercontainer1}>
          <Button
            className={input.button}
            onClick={() => {
              setModalShow(true);
            }}
          >
            Upload
            <MdOutlineCloudUpload className={input.icon} />
          </Button>
        </div>
      </div>
      <ReportModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default FileInputContainer;
