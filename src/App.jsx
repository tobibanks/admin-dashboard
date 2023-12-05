import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomepageAdmin from "../pages/HomepageAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import { createMedia } from "@artsy/fresnel";
import Homepage from "./pages/Homepage";
import Messages from "./pages/messages/Messages";
import NotFound from "./pages/NotFound";
import Projects from "./pages/projects/Projects";
import TaskCalendar from "./pages/tasks/TaskCalendar";
import TaskBoard from "./pages/tasks/TaskBoard";
import Tasks from "./pages/tasks/Tasks";
import ProjectForm from "./pages/projects/ProjectForm";
import ProjectGrid from "./pages/projects/ProjectGrid";
import ProjectBoard from "./pages/projects/ProjectBoard";
import Reports from "./pages/reports/Reports";
import ReportsTable from "./pages/reports/ReportsTable";
import ReportsGrid from "./pages/reports/ReportsGrid";
import TaskApproval from "./pages/tasks/taskapproval/[id]";
import Login from "./pages/Login";
import TaskForm from "./pages/tasks/TaskForm";
import AssignProjectForm from "./layout/projects/AssignProjectForm";
import TaskFormDashboard from "./layout/tasks/TaskFormDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 400,
    md: 600,
    lg: 1024,
    xl: 1192,
  },
});

const App = () => {
  return (
    <MediaContextProvider>
      <Media at="sm">
        <p>lorem</p>
      </Media>
      <Media greaterThanOrEqual="md">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <ProtectedRoute exact path="/"> */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
             <Route
              path="/project"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/board"
              element={
                <ProtectedRoute>
                  <ProjectBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/grid"
              element={
                <ProtectedRoute>
                  <ProjectGrid />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/form"
              element={
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task"
              // forceRefresh={true}
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task/board"
              element={
                <ProtectedRoute>
                  <TaskBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task/calendar"
              element={
                <ProtectedRoute>
                  <TaskCalendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/table"
              element={
                <ProtectedRoute>
                  <ReportsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/grid"
              element={
                <ProtectedRoute>
                  <ReportsGrid />
                </ProtectedRoute>
              }
            />
            <Route
              path="/taskapproval/:id"
              element={
                <ProtectedRoute>
                  <TaskApproval />
                </ProtectedRoute>
              }
            />
            <Route
              path="/taskform/:id"
              element={
                <ProtectedRoute>
                  <TaskForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/message"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="addtask/:id"
              element={
                <ProtectedRoute>
                  <TaskFormDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assignproject/:id"
              element={
                <ProtectedRoute>
                  <AssignProjectForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addtask/:id"
              element={
                <ProtectedRoute>
                  <TaskFormDashboard />
                </ProtectedRoute>
              }
            />
            {/* </ProtectedRoute> */}
            {/* <Route path="/admin" element={<HomepageAdmin />} /> */}
          </Routes>
        </BrowserRouter>
      </Media>
    </MediaContextProvider>
  );
};

export default App;
