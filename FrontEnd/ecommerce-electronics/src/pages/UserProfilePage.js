import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import UserInfo from "../components/UserProfile/UserInfo";
import AddressList from "../components/UserProfile/AddressList";
import OrderHistory from "../components/UserProfile/OrderHistory";
import Wishlist from "../components/UserProfile/Wishlist";
import { UserProvider } from "../contexts/UserContext"; // Import UserProvider
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "../components/UserProfile/UserProfile.css";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify
// import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../contexts/UserContext";
import { removeAccessToken } from "../utils/commonFunction";

const UserProfile = () => {
  const { userState, dispatch } = useUserContext();
  return (
    //<UserProvider>
    <div className="container mt-4 user-profile">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-3 user-profile-sidebar p-3">
          <h4 className="text-center">Tài khoản</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-center" to="user-info">
                <i className="bi bi-person"></i> Thông tin cá nhân
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" to="address-list">
                <i className="bi bi-geo-alt"></i> Địa chỉ giao hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" to="order-history">
                <i className="bi bi-clock-history"></i> Lịch sử mua sắm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-center" to="wish-list">
                <i className="bi bi-heart"></i> Sản phẩm yêu thích
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-danger w-100 text-center"
                onClick={() => {
                  // Logic logout
                  removeAccessToken(); 
                  window.location.href = "/login"; 
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Đăng xuất
              </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="col-md-9 content">
          <Routes>
            <Route
              index
              element={
                userState.user ? (
                  <Navigate to="user-info" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
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
