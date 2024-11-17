import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import UserInfo from "../components/UserProfile/UserInfo";
import AddressList from "../components/UserProfile/AddressList";
import OrderHistory from "../components/UserProfile/OrderHistory";
import Wishlist from "../components/UserProfile/Wishlist";
import { UserProvider } from "../contexts/UserContext"; // Import UserProvider
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "../components/UserProfile/UserProfile.css";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
// import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  return (
    //<UserProvider>
      <div className="container mt-4 user-profile">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-md-3 user-profile-sidebar p-3">
            <h4 className="text-center">Tài khoản</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="user-info">
                  <i className="bi bi-person"></i> Thông tin cá nhân
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="address-list">
                  <i className="bi bi-geo-alt"></i> Địa chỉ giao hàng
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="order-history">
                  <i className="bi bi-clock-history"></i> Lịch sử mua sắm
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="wish-list">
                  <i className="bi bi-heart"></i> Sản phẩm yêu thích
                </Link>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className="col-md-9 content">
            <Routes>
              <Route index element={<Navigate to="user-info" replace />} />
              <Route path="user-info" element={<UserInfo />} />
              <Route path="address-list" element={<AddressList />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="wish-list" element={<Wishlist />} />
            </Routes>
          </div>
        </div>
      </div>
      //<ToastContainer /> {/* Add ToastContainer here */}
   // </UserProvider>
  );
};

export default UserProfile;
