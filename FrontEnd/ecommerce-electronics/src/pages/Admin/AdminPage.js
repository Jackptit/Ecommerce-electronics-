import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/AdminComponents/Sidebar/Sidebar.js";
import Header from "../../components/AdminComponents/Navbars/Navbar.js";
import AdminFeedback from "./view/AdminFeedback.js";
import Coupon from "./view/Coupon.js";
import OrderManagement from "./view/Order.js";
import ProductManagement from "./view/Product.js";
import User from "./view/User.js";
import "./AdminPage.css";
import Statistical from "./view/Statistical.js";
const AdminPage = () => {

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <Routes>
            <Route index element={<Navigate to="product" replace />} />
            <Route path="product" element={<ProductManagement />} />
            <Route path="discount" element={<Coupon />} />
            <Route path="feedback" element={<AdminFeedback />} />
            <Route path="order" element={<OrderManagement />} />
            <Route path="userManager" element={<User/>} />
            <Route path="statistical" element={<Statistical/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
