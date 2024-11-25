import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icon User
import { useLocation, useNavigate  } from 'react-router-dom';
import './Navbar.css';
import { useUserContext } from "../../../contexts/UserContext"; // Import context
import { removeAccessToken } from '../../../utils/commonFunction';

const Header = () => {
  const { userState, dispatch, updateUser } = useUserContext();
  const [userData, setUserData] = useState(userState?.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);  // Tham chiếu đến dropdown
  const navigate = useNavigate(); 

  useEffect(() => {
    // Update userData if state.user changes
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user]);

  // Hàm toggle dropdown
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan truyền ra ngoài
    setDropdownOpen(!dropdownOpen);
  };

  // Hàm kiểm tra click ngoài dropdown để đóng dropdown
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    removeAccessToken();
    navigate("/login", { replace: true }); // Sử dụng navigate hook để chuyển hướng
  }

  // Thêm event listener khi dropdown mở và xóa khi dropdown đóng
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup listener khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const getTabTitle = () => {
    switch (location.pathname) {
      case '/admin/discount':
        return 'Discount Management';
      case '/admin/feedback':
        return 'Feedback';
      case '/admin/settings':
        return 'Settings';
      default:
        return 'Admin Dashboard';
    }
  };

  return (
    <div className="header">
      <div className="header-title">
        <h3>{getTabTitle()}</h3>
      </div>
      <div className="user-info">
        <FaUserCircle size={30} />
        <span>{userData?.username}</span>
        <button onClick={toggleDropdown} className="user-info-button">
          <i className="dropdown-icon">▼</i> {/* Nút dropdown */}
        </button>
        <div
          ref={dropdownRef} // Gắn ref vào dropdown để theo dõi click ngoài
          className={`dropdown ${dropdownOpen ? 'show' : ''}`}
        >
          <ul>
            <li>Profile</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
