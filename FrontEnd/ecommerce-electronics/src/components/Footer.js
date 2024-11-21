import React from "react";
import "./css/Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Footer = () => {
  return (
    <footer className="footer mt-5 py-3 bg-light">
      <Container>
        <Row className="mb-3">
          <Col className="d-flex justify-content-center">
            <div>
              <p>Get connected with us on social networks:</p>
              <div className="social-icons">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-google"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-linkedin"></i>
                <i className="fab fa-github"></i>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-3">
            <h5>COMPANY NAME</h5>
            <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Col>
          <Col md={3} className="mb-3">
            <h5>PRODUCTS</h5>
            <ul className="list-unstyled">
              <li>Angular</li>
              <li>React</li>
              <li>Vue</li>
              <li>Laravel</li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5>USEFUL LINKS</h5>
            <ul className="list-unstyled">
              <li>Pricing</li>
              <li>Settings</li>
              <li>Orders</li>
              <li>Help</li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5>CONTACT</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-home"></i> New York, NY 10012, US</li>
              <li><i className="fas fa-envelope"></i> info@example.com</li>
              <li><i className="fas fa-phone"></i> + 01 234 567 88</li>
              <li><i className="fas fa-print"></i> + 01 234 567 89</li>
            </ul>
          </Col>
        </Row>
        <hr />
        <div className="text-center">© 2021 Copyright: MDBootstrap.com</div>
      </Container>
    </footer>
  );
};
export default Footer;