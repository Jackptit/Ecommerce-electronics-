// src/components/AuthForm.js
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ImageBackground from '../assets/electronic.png'; // Import hình ảnh từ assets
import { Link, useNavigate } from 'react-router-dom'; // Import Link từ react-router-dom
import { useState } from 'react';
import { saveAccessToken } from '../utils/commonFunction';

import { useOrdersContext } from '../contexts/OrderContext';
import { useUserContext } from '../contexts/UserContext';
import { useAddressContext } from '../contexts/AddressContext';
import { useCartContext } from "../contexts/Cart_Context";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const { userState, fetchUser } = useUserContext();
  const { addressState, fetchAddress } = useAddressContext();
  const { fetchCart, setCart } = useCartContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!username) {
      validationErrors.username = "Username is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "phone": username, "password": password }),
        }).then(response => response.json());

        saveAccessToken(response.accessToken); //save token to localstored

        if (response.accessToken !== undefined) {
          handleGetUserData(response.accessToken);
        }
        else if (response.status === 401) {
          setServerError("Thông tin đăng nhập không chính xác.");
        } else {
          setServerError("Có lỗi xảy ra. Vui lòng thử lại.");
        }
      } catch (error) {
        console.log(error)
        setServerError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  }

  const handleGetUserData = async (accessToken) => {
    if(!accessToken)
      return;
    const user = await fetchUser(accessToken);
    await fetchAddress(accessToken);
    await fetchCart(accessToken);

    if (user.idRole === 1) {
      navigate('/admin');
    }
    else {
      navigate('/');
    }
  }
  return (

    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 ">
      <Row className="w-100" style={{ maxWidth: "900px" }}>
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <img
            src={ImageBackground}
            alt="Login Illustration"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h3 className="text-center mb-4">Đăng nhập</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vui lòng nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="hãy nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            {serverError && (
              <div className="text-danger mb-3">
                {serverError}
              </div>
            )}
            <Button variant="warning" type="submit" className="w-100 mb-3">
              Đăng Nhập
            </Button>

            <div className="text-center mb-3">Hoặc</div>

            <Button variant="primary" className="w-100 mb-2" style={{ backgroundColor: "#3b5998" }}>
              <i className="fab fa-facebook-f"></i> Continue with Facebook
            </Button>
            <Button variant="info" className="w-100">
              <i className="fab fa-google"></i> Continue with Google
            </Button>
          </Form>
          <div className="text-center mt-3">
            <div>Bạn chưa có tài khoản?
              <Link to='/register'>Đăng ký ngay</Link></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
