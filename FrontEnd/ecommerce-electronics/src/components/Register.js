// src/components/Register.js
import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageBackground from "../assets/electronic.png"; // Import hình ảnh từ assets
import "./css/Register.css"; // Import CSS từ file Register.css
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveAccessToken } from "../utils/commonFunction";
import { useUserContext } from "../contexts/UserContext";
import { useAddressContext } from "../contexts/AddressContext";
import RegisterSuccessModal from "./UserProfile/Model/RegisterSuccessModal";
import { getAccessToken } from "../utils/commonFunction";

const Register = () => {
  const navigate = useNavigate();
  const { userState, fetchUser } = useUserContext();
  const { addressState, fetchAddress, addAddress } = useAddressContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    address: "",
    email: "",
    birthday: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.username) {
      validationErrors.username = "Username is required";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    if (!formData.address) {
      validationErrors.address = "Address is required";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!formData.birthday) {
      validationErrors.birthday = "Birth Date is required";
    }

    if (!formData.phone) {
      validationErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      validationErrors.phone = "Phone Number must be 10 digits";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowErrorAlert(true);
    } else {
      handleRegister(formData);
      console.log("Form submitted successfully", formData);
      setShowErrorAlert(false);
      setErrors({});
    }
  };

  const handleRegister = async (newUser) => {
    try {
      const user = await axios.post(
        "http://localhost:8080/api/auth/register",
        newUser
      );

      console.log(user);
      if (!user) {
        console.log(user);
        toast.error(user.data.message);
        return;
      }

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: user.data.phone,
          password: user.data.password,
        }),
      }).then((response) => response.json());

      saveAccessToken(response.accessToken); //save token to localstored

      await addAddress(parseAddress(newUser.address));

      if (response.accessToken !== undefined) {
        setIsRegisterSuccess(true);
      }
    } catch (error) {
      console.log("Error register:", error.response.data.message);
      if (error.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleGetUserData = async (accessToken) => {
    const user = await fetchUser(accessToken);
    await fetchAddress(accessToken);
    if (user.idRole === 1) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleCloseModal = () => {
    setIsRegisterSuccess(false);
    const token = getAccessToken();
    handleGetUserData(token);
  }

  const parseAddress = (stringAddress) => {
    try {
      const parts = stringAddress.split(",").map((part) => part.trim());
      const province = parts.pop().trim();
      const district = parts.pop().trim();
      const ward = parts.pop().trim();

      const specificAddress = parts.join(", ");

      return {
        province: province,
        district: district,
        ward: ward,
        specificAddress: specificAddress,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 "
    >
      <Row className="w-100" style={{ maxWidth: "900px" }}>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <img
            src={ImageBackground}
            alt="Register Illustration"
            className="img-fluid"
            style={{ maxHeight: "1000px" }}
          />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h3 className="text-center mb-4">Register</h3>
          {showErrorAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowErrorAlert(false)}
              dismissible
            >
              Please correct the errors below before submitting.
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="register-background">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicBirthDate">
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    isInvalid={!!errors.birthday}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.birthday}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="warning" type="submit" className="w-100 mb-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <RegisterSuccessModal open={isRegisterSuccess} onClose={handleCloseModal} />
    </Container>
  );
};

export default Register;
