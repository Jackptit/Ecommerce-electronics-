import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faMapMarkerAlt, faMobileAlt, faSearch, faLaptop, faHeadphones, faTabletAlt, faDesktop, faClock, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Container, Col, Row, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserContext } from '../contexts/UserContext';
import { useAuthContext } from '../contexts/Auth_Context';
const NavbarComponent = () => {
  const { userState, dispatch } = useUserContext();
  const [userData, setUserData] = useState(userState?.user);
  const { token } = useAuthContext();

  return (
    <>
      <Navbar bg="warning" expand="lg" variant="light" sticky="top" >
        <Container fluid>
          <Row className="w-100 align-items-center">
            <Col xs={12} className="d-flex justify-content-between align-items-center">
              {/* Logo */}
              <Navbar.Brand href="/">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPX1d6sn9wWE36oDc1sOz56DV7789e20PlQ&s"
                  alt="thegioididong"
                  style={{
                    width: 50, height: 50, borderRadius: "50%", // Làm hình ảnh tròn
                    objectFit: "cover"
                  }}
                />

              </Navbar.Brand>
              <div className="ms-3">
                <h3 className="mb-0"> EEShop </h3>
                <p className="mb-0" style={{ fontStyle: "italic", marginLeft: "20px" }}> Thế giới điện tử </p>
              </div>
              {/* Search Form */}
              <Form className="flex-grow-1 mx-4" style={{ position: "relative" }}>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Bạn tìm gì..."
                    aria-label="Search"
                    className="me-2"
                    style={{ borderRadius: "20px", paddingRight: "20px" }} // Padding để chừa chỗ cho biểu tượng
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6c757d", // Màu của biểu tượng
                      pointerEvents: "none" // Không làm gián đoạn việc nhập liệu
                    }}
                  />
                </InputGroup>
              </Form>
              {/* Login, Cart, Location */}
              <div className="d-flex align-items-center">
                <>
                  {userData ?
                    <>
                      <Button variant="warning" className="text-dark" as={Link} to="/user-profile">
                        <FontAwesomeIcon icon={faUser} />{userData.username}
                      </Button>
                    </>
                    : <>
                      <Button variant="warning" className="text-dark" as={Link} to="/login">
                        <FontAwesomeIcon icon={faUser} /> Đăng nhập
                      </Button>
                    </>
                  }
                </>
                <Button variant="warning" className="text-dark mx-2" as={Link} to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng
                </Button>
                <Button variant="warning" className="text-dark" >
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Hà Nội
                </Button>
              </div>
            </Col>

            {/* Product Categories */}
            <Col xs={12} className="mt-2">
              <Nav className="justify-content-between" >
                <Nav.Link href="#phones" className="text-dark">
                  <FontAwesomeIcon icon={faMobileAlt} /> Điện thoại
                </Nav.Link>
                <Nav.Link href="#laptops" className="text-dark">
                  <FontAwesomeIcon icon={faLaptop} /> Laptop
                </Nav.Link>
                <Nav.Link href="#accessories" className="text-dark">
                  <FontAwesomeIcon icon={faHeadphones} /> Phụ kiện
                </Nav.Link>
                <Nav.Link href="#watches" className="text-dark">
                  <FontAwesomeIcon icon={faClock} /> Đồng hồ
                </Nav.Link>
                <Nav.Link href="#tablets" className="text-dark">
                  <FontAwesomeIcon icon={faTabletAlt} /> Tablet
                </Nav.Link>
                <Nav.Link href="#old-new" className="text-dark">
                  <FontAwesomeIcon icon={faRecycle} /> Máy cũ
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar >
    </>
  );
};

export default NavbarComponent;
