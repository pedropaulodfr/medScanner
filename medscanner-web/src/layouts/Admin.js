import { useState } from "react";
import './Admin.css';
import Sidebar from "../components/Sidebar/Sidebar";

export default function Admin({ component }) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  console.log("sidebarStatus", sidebarStatus);

  return (
    <div className="admin">
      <Sidebar sidebarStatus={setSidebarStatus}></Sidebar>
      <div
        className={`component-home ${!sidebarStatus ? "sidebar-open" : ""}`}
      >
        {component}
      </div>
    </div>
  );
}
