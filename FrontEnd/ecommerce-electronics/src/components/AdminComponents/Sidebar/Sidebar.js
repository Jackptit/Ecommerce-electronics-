import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
  
      <div className="sidebar-header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPX1d6sn9wWE36oDc1sOz56DV7789e20PlQ&s" alt="Logo" className="sidebar-logo" />
        <h3 className="shop-name">Thế Giới Điện Tử</h3>
      </div>


      <ul>
      <li>
          <Link to="/admin/product">
            <i className="fas fa-box"></i><strong>Products</strong> 
          </Link>
        </li>
        <li>
          <Link to="/admin/discount">
            <i className="fas fa-tags"></i><strong>Discounts</strong> 
          </Link>
        </li>
        <li>
          <Link to="/admin/feedback">
            <i className="fas fa-comment-dots"></i> <strong>Feedbacks</strong>
          </Link>
        </li>
        <li>
          <Link to="/admin/order">
            <i className="fas fa-shopping-cart"></i> <strong>Orders</strong>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
