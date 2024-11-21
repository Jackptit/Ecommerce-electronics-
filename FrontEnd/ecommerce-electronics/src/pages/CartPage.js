import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../contexts/Cart_Context';
import CartItem from '../components/CartItem';
import { Container, Row, Col, Button, Card } from "react-bootstrap";
const CartPage = () => {
  const { cart, total, amount } = useCartContext();
  return (
    <Container >
      <h2 className="text-center mb-4">Giỏ hàng</h2>
      <Row>

        {/* Danh sách sản phẩm */}
        <Col lg={8}>
          <h5 className="mb-3">Sản phẩm trong giỏ</h5>
          <Row className="fw-bold mb-2 bg-warning" >
            <Col xs={6} className="text-center">Thông tin sản phẩm</Col>
            <Col xs={2}>Đơn giá</Col>
            <Col xs={2}>Số lượng</Col>
            <Col xs={2}>Thành tiền</Col>
            <Col xs={1}></Col> {/* Cột cho nút Xóa */}
          </Row>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Col>

        {/* Tóm tắt thanh toán */}
        <Col lg={4} className="mt-4">
          <Card className="p-4 shadow-sm bg-light">
            <h3 className="mb-3">Thanh toán</h3>
            <p>
              Tổng tạm tính: <span>{total.toLocaleString()}₫</span>
            </p>
            <p>
              Thành tiền:{" "}
              <span>
                {total.toLocaleString()}₫ <small>(Đã bao gồm VAT)</small>
              </span>
            </p>
            <Link to="/payment" className="text-decoration-none">
              <Button variant="primary" className="w-100 mt-3" >
                Tiếp tục
              </Button>
            </Link>
          </Card>
        </Col>
      </Row >
    </Container >
  );
};

export default CartPage;
