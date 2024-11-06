import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaUser, FaShoppingCart, FaMapMarkerAlt, FaMobileAlt, FaLaptop, FaHeadphones, FaTabletAlt, FaClock, FaBell, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Styled Components
const Navbarr = styled.nav`
  z-index: 1000;
  width: 100%;
  background-color: #FFD600
  position: fixed;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  margin-left: 20px;
  img {
    height: 50px;
    border-radius: 40px;
  }
  h1{
    font-style: italic;
    margin-bottom: 0;
  }
  p{
    margin-top: 0;
    margin-left: 20px;
    font-size: 12px;
    font-family: cursive;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  width: 40%;

  input {
    border: none;
    outline: none;
    width: 100%;
    padding: 5px;
    font-size: 16px;
  }

  svg {
    color: grey;
  }
`;

const IconLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-left: 20px;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    font-size: 14px;

    svg {
      margin-right: 5px;
    }

    &:hover {
      color: #333;
    }
  }
`;

const Categories = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #FFD600;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    font-size: 14px;
    margin: 0 10px;

    svg {
      margin-right: 5px;
    }

    &:hover {
      color: #333;
    }
  }
`;

const Navbar = () => {
  return (
    <>
      <Navbarr>
        <Logo>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPX1d6sn9wWE36oDc1sOz56DV7789e20PlQ&s" alt="shop" />
          <div>
            <h1> EEShop </h1>
            <p> Thế giới điện tử </p>
          </div>
        </Logo>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Bạn tìm gì?" />
          <button>
            <FaFilter />
          </button>
        </SearchBar>
        <IconLinks>
          <a href="#"><FaUser /> Đăng nhập</a>
          <a href="#"><FaShoppingCart /> Giỏ hàng</a>
          <a href="#"><FaMapMarkerAlt /> Hà Nội</a>
        </IconLinks>
      </Navbarr>
      <Categories>
        <a href="#"><FaMobileAlt /> Điện thoại</a>
        <a href="#"><FaLaptop /> Laptop</a>
        <a href="#"><FaHeadphones /> Phụ kiện</a>
        <a href="#"><FaTabletAlt /> Tablet</a>
        <a href="#"><FaClock /> Đồng hồ</a>
        <a href="#"><FaBell /> Máy cũ, Thu cũ</a>
      </Categories>
    </>
  );
};

export default Navbar;
