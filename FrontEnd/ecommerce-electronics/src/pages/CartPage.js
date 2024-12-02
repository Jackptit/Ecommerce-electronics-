import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../contexts/Cart_Context";
import CartItem from "../components/CartItem";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { getAccessToken } from "../utils/commonFunction";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const token = getAccessToken();
  const navigate = useNavigate();
  const {
    cart,
    amount,
    dispatch,
    cartBuy,
    selectAllCartItem,
    unSelectAllCartItem,
  } = useCartContext();

  const totalAmount = cartBuy.reduce((total, item) => {
    const itemTotal = item.product.price * (item.quantity || 1);
    return total + itemTotal;
  }, 0);

  const isCheckAll = cart.length === cartBuy.length;

  useEffect(() => {
    const fetchCartData = async () => {
      if (token && cart.length === 0) {
        console.log("Fetching cart...");
        await fetchCarts(token);
      }
    };

    fetchCartData();
  }, [token]);

  const fetchCarts = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const carts = await axios.get("http://localhost:8080/api/cart_detail", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "SET_CART", payload: carts.data });
    } catch (error) {
      console.log("Error fetching coupon:", error.status);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleCheckBoxAll = (isChecked) => {
    if (isChecked) {
      selectAllCartItem();
    } else {
      unSelectAllCartItem();
    }
  };
  return (
    <Container style={{ height: cart.length === 0 ? "500px" : "auto" }}>
      <h2 className="text-center mb-4">Giỏ hàng</h2>
      {cart.length === 0 ? (
        <h6 className="text-center">Bạn chưa có sản phẩm nào trong giỏ hàng</h6>
      ) : (
        <Row>
          {/* Danh sách sản phẩm */}
          <Col lg={12}>
            <h5 className="mb-3">Sản phẩm trong giỏ</h5>
            <Form.Check
              type="checkbox"
              className="custom-checkbox mb-4"
              onChange={(e) => handleCheckBoxAll(e.target.checked)}
              checked={isCheckAll}
              label="Chọn tất cả sản phẩm"
            />
            <Row className="fw-bold mb-2 bg-warning">
              <Col xs={6} className="text-center">
                Thông tin sản phẩm
              </Col>
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
          <Col lg={12} className="mt-4 ms-auto">
            <Card className="p-4 shadow-sm bg-light text-end">
              <h3 className="mb-3">Thanh toán</h3>
              <p>
                Tổng tạm tính:{" "}
                <span>{totalAmount?.toLocaleString("vi-VN")}₫</span>
              </p>
              {/* <p>
                Thành tiền:{" "}
                <span>
                  {total?.toLocaleString("vi-VN")}₫ <small>(Đã bao gồm VAT)</small>
                </span>
              </p> */}
              <Link
                to={cartBuy.length > 0 ? "/payment" : "#"}
                className={`text-decoration-none ${
                  cartBuy.length === 0 && "disabled-link"
                }`}
              >
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  disabled={cartBuy.length === 0}
                >
                  Thanh toán
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
