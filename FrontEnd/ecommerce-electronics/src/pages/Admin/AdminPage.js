import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../../components/AdminComponents/Sidebar/Sidebar.js";
import Header from "../../components/AdminComponents/Navbars/Navbar.js";
import AdminFeedback from "./view/AdminFeedback.js";
import Coupon from "./view/Coupon.js";
import { useUserContext } from "../../contexts/UserContext.js";
import { getAccessToken } from "../../utils/commonFunction.js";
import "./AdminPage.css";

const AdminPage = () => {
  const { userState, dispatch, fetchUser } = useUserContext();
  const token = getAccessToken();
  const [userData, setUserData] = useState(userState?.user || null); // Set initial value as null
  
  useEffect(() => {
    if (userState?.user) {
      setUserData(userState.user); // Update userData when userState changes
    }
  }, [userState?.user]); // Re-run effect when userState changes

  // Check for valid token and if user is admin
  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  if (userData?.idRole !== 1) {
    console.log(userData?.idRole)
    return <Navigate to="/login" replace />; // Redirect to login if not admin
  }

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
