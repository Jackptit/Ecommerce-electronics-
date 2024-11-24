import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../../components/AdminComponents/Sidebar/Sidebar.js";
import Header from "../../components/AdminComponents/Navbars/Navbar.js";
import AdminFeedback from "./view/AdminFeedback.js";
import Coupon from "./view/Coupon.js";

import "./AdminPage.css";

const AdminPage = () => {

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <Routes>
            <Route index element={<Navigate to="discount" replace />} />
            <Route path="discount" element={<Coupon />} />
            <Route path="feedback" element={<AdminFeedback />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
