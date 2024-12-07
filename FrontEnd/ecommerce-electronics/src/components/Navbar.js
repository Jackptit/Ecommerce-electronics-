import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import { saveCategories, getProducts } from "../utils/commonFunction";
import {
  faBell,
  faUser,
  faShoppingCart,
  faMapMarkerAlt,
  faMobileAlt,
  faSearch,
  faLaptop,
  faHeadphones,
  faTabletAlt,
  faDesktop,
  faClock,
  faRecycle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../contexts/UserContext";
import { useCartContext } from "../contexts/Cart_Context";
import { getAccessToken } from "../utils/commonFunction";

const NavbarComponent = () => {
  const { userState, dispatch, fetchUser } = useUserContext();
  const { cart } = useCartContext();
  const [userData, setUserData] = useState(userState?.user);
  const [cartData, setCartData] = useState(cart);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchQuery, setSearchQuery] = useState(""); // State để lưu giá trị tìm kiếm
  const [suggestions, setSuggestions] = useState([]); // State để lưu danh sách gợi ý

  const token = getAccessToken();
  useEffect(() => {
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, token]);
  useEffect(() => {
    if (cart) {
      setCartData(cart);
    }
  }, [cart, token]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category", {
          headers: { "Content-Type": "application/json" },
        });
        console.log(response.data);
        saveCategories(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const products = JSON.parse(getProducts());
  const listnameProduct = [];
  {
    products?.map((product) => {
      listnameProduct.push(product.name);
    });
  }
  // Hàm xử lý sự kiện khi người dùng nhập liệu vào ô tìm kiếm
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Lọc danh sách sản phẩm dựa trên input của người dùng
    if (query) {
      const filteredSuggestions = listnameProduct.filter(
        (product) => product.toLowerCase().includes(query.toLowerCase()) // Lọc các sản phẩm có chứa từ khóa tìm kiếm
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Nếu không có từ khóa tìm kiếm, không hiển thị gợi ý
    }
  };
  return (
    <>
      <Navbar bg="warning" expand="lg" variant="light" sticky="top">
        <Container fluid>
          <Row className="w-100 align-items-center">
            <Col
              xs={12}
              className="d-flex justify-content-between align-items-center"
            >
              {/* Logo */}
              <Navbar.Brand href="/">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPX1d6sn9wWE36oDc1sOz56DV7789e20PlQ&s"
                  alt="thegioididong"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%", // Làm hình ảnh tròn
                    objectFit: "cover",
                  }}
                />
              </Navbar.Brand>
              <div className="ms-3">
                <h3 className="mb-0"> EEShop </h3>
                <p
                  className="mb-0"
                  style={{ fontStyle: "italic", marginLeft: "20px" }}
                >
                  {" "}
                  Thế giới điện tử{" "}
                </p>
              </div>
              {/* Search Form */}
              <Form
                className="flex-grow-1 mx-4"
                style={{ position: "relative" }}
              >
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Bạn tìm gì..."
                    aria-label="Search"
                    className="me-2"
                    style={{ borderRadius: "20px", paddingRight: "20px" }} // Padding để chừa chỗ cho biểu tượng
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6c757d", // Màu của biểu tượng
                      pointerEvents: "none", // Không làm gián đoạn việc nhập liệu
                    }}
                  />
                </InputGroup>
                {suggestions.length > 0 && (
                  <ListGroup
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      right: "0",
                      zIndex: 10,
                      maxHeight: "200px",
                      overflowY: "auto",
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {suggestions?.map((suggestion, index) => (
                      <ListGroup.Item key={index} style={{ cursor: "pointer" }}>
                        {suggestion} {/* Tùy chỉnh cách hiển thị gợi ý */}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Form>
              {/* Login, Cart, Location */}
              <div className="d-flex align-items-center">
                <>
                  {userData ? (
                    <>
                      <Button
                        variant="warning"
                        className="text-dark"
                        as={Link}
                        to="/user-profile"
                      >
                        <FontAwesomeIcon icon={faUser} />
                        {"   " +userData.username}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        className="text-dark"
                        as={Link}
                        to="/login"
                      >
                        <FontAwesomeIcon icon={faUser} /> Đăng nhập
                      </Button>
                    </>
                  )}
                </>
                <div className="cart-container">
                  <Button
                    variant="warning"
                    className="text-dark mx-2 cart-button"
                    as={Link}
                    to="/cart"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng
                    {cartData?.length > 0 && (
                      <span className="cart-badge">{cartData?.length}</span>
                    )}
                  </Button>
                </div>
                <Button variant="warning" className="text-dark">
                  <FontAwesomeIcon icon={faBell} /> Thông báo
                </Button>
              </div>
            </Col>

            {/* Product Categories */}
            <Col xs={12} className="mt-2">
              <Nav className="justify-content-between">
                <>
                  <Button variant="warning" onClick={handleShow}>
                    <FontAwesomeIcon icon={faBars} />
                    Danh mục sản phẩm
                  </Button>
                  <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Danh mục sản phẩm</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <ListGroup>
                        {categories?.map((category, index) => (
                          <ListGroup.Item
                            key={index}
                            action
                            className="d-flex align-items-center"
                          >
                            <span className="">{category.icon}</span>
                            {category.name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Offcanvas.Body>
                  </Offcanvas>
                </>
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
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
