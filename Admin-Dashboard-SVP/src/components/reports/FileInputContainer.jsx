import React, { useState } from "react";
import input from "./general.module.css";
import { Button } from "react-bootstrap";
import { MdOutlineCloudUpload } from "react-icons/md";
import ReportModal from "@/components/reports/ReportModal";
import { useGetProjectDetailsQuery } from "../../app/services/auth/authService";
import { toast, Toaster } from "react-hot-toast";

const FileInputContainer = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { data: projects, isLoading } = useGetProjectDetailsQuery({
    refetchOnMountOrArgChange: true,
  });
  const projectsCollection = projects || [];
  return (
    <div className={input.absolutecenterfile}>
      <div className={input.innercontainer}>
        <div className={input.innercontainer1}>
          <Button
            className={input.button}
            onClick={() => {
              projectsCollection.length < 1
                ? toast.error(
                    "There are no projects. You can upload reports after adding projects"
                  )
                : setModalShow(true);
            }}
          >
            Upload
            <MdOutlineCloudUpload className={input.icon} />
          </Button>
        </div>
      </div>
      <ReportModal show={modalShow} onHide={() => setModalShow(false)} />
      <Toaster
        position="top-left"
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
          },

          // Default options for specific types
        }}
      />
    </div>
  );
};

export default FileInputContainer;
