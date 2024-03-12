import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Home from "../pages/Home";
import CartaoControle from "../pages/CartaoControle";

import PrivateRoutes from '../routes/PrivateRoutes';

export default function Admin({ component }) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  console.log("sidebarStatus", sidebarStatus);

  return (
    <div className="admin">
      <Sidebar sidebarStatus={setSidebarStatus}></Sidebar>
      <div
        className="component-home"
        style={
          !sidebarStatus ? { paddingLeft: "230px" } : { paddingLeft: "0px" }
        }
      >
        {component}
        {/* <Home></Home> */}
        {/* <CartaoControle></CartaoControle> */}

      </div>
    </div>
  );
}
