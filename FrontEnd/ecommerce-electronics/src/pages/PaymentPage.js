import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useCartContext } from "../contexts/Cart_Context";
import { useAddressContext } from "../contexts/AddressContext";
import { useUserContext } from "../contexts/UserContext";
import {
  getAccessToken,
  getCartBuy,
  saveCartBuy,
  removeCartBuy,
} from "../utils/commonFunction";

function PaymentPage() {
  const token = getAccessToken();
  const { cartBuy } = useCartContext();
  const { addressState, fetchAddress } = useAddressContext();
  const { userState, dispatch, fetchUser } = useUserContext();
  const [cartBuyItem, setCartBuyItem] = useState([]);

  useEffect(() => {
    fetchAddress(token);
    fetchUser(token);
  }, [token]);

  useEffect(() => {
    if (cartBuy && cartBuy.length > 0) {
      setCartBuyItem(cartBuy); // Update cartBuy from context
      saveCartBuy(cartBuy); // Save to localStorage
    } else {
      const itemsFromLocal = getCartBuy();
      if (itemsFromLocal.length > 0) {
        setCartBuyItem(itemsFromLocal); // Restore cartBuy from localStorage
      }
    }
  }, [cartBuy]);

  const defaultAddress = addressState.address.find(
    (item) => item.isDefault === true
  );
  const username = userState.user?.username;
  const phone = userState.user?.phone;

  const totalAmount = cartBuyItem.reduce((total, item) => {
    const itemTotal = item.product.price * (item.quantity || 1);
    return total + itemTotal;
  }, 0);

  return (
    <Container fluid className="mt-4 ">
      <Row className="ms-5">
        {/* Thông tin giao hàng và thanh toán */}
        <Col lg={8} className="mb-4">
          <h4 className="mb-3 font-weight-bold">Thông tin giao hàng</h4>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label className="fw-bold me-4 fs-5">
                    Khách hàng:
                  </Form.Label>
                  <Form.Text className="text-muted fs-5">{username}</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label className="fw-bold me-4 fs-5">
                    Số điện thoại:
                  </Form.Label>
                  <Form.Text className="text-muted fs-5">{phone}</Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label className="fw-bold me-4 fs-5">Địa chỉ</Form.Label>
              <Form.Text className="text-muted fs-5 me-4">
                {defaultAddress?.specificAddress +
                  ", " +
                  defaultAddress?.ward +
                  ", " +
                  defaultAddress?.district +
                  ", " +
                  defaultAddress?.province}
              </Form.Text>
              <Link
                to="/user-profile/address-list"
                className="text-decoration-none"
              >
                <i className="fas fa-edit fs-5"></i>
              </Link>
            </Form.Group>
            <hr></hr>
            {/* danh sách sản phẩm */}
            <h4 className="mt-4 mb-3 font-weight-bold">Danh sách sản phẩm</h4>
            <Form.Group className="mt-4 mb-3">
              {cartBuyItem.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between mb-3 p-2 border rounded"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={"https:" + item.product.image.split(",")[0]}
                      alt={"image"}
                      className="me-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h6
                        className="mb-1 text-wrap"
                        style={{ maxWidth: "600px" }}
                      >
                        {item.product.name}
                      </h6>
                      <small className="text-muted">
                        Số lượng: {item.quantity}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center ">
                    <span>{item.quantity} x </span>
                    <span className="fw-bold text-primary ms-2">
                      {item.product.price.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
              ))}
            </Form.Group>
            <hr></hr>
            <Form.Group className="mb-4" controlId="formInvoice">
              <Form.Check type="checkbox" label="Xuất hóa đơn công ty" />
            </Form.Group>

            <h4 className="mt-4 mb-3 font-weight-bold">Hình thức thanh toán</h4>
            <Form.Group className="mb-3" controlId="formPaymentMethod">
              <Form.Check
                type="radio"
                label="Thanh toán bằng chuyển khoản"
                name="paymentMethod"
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="Thanh toán khi nhận hàng"
                name="paymentMethod"
              />
            </Form.Group>
            <hr></hr>
            <Form.Group className="mt-4 text-start">
              <Form.Text className="text-muted fs-6">
                <i>Thời gian: {new Date().toLocaleString("vi-VN")}</i>
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>

        {/* Nhập mã voucher và thông tin giỏ hàng */}
        <Col lg={4}>
          <div className="border p-3 mb-4">
            <h5>Nhập mã voucher</h5>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Nhập mã khuyến mãi"
                aria-label="Nhập mã khuyến mãi"
              />
              <Button variant="outline-secondary">Áp dụng</Button>
            </InputGroup>
            <p className="text-muted">
              Mã giảm giá và phiếu mua hàng sẽ không thể dùng lại sau khi đã đặt
              mua hàng
            </p>
          </div>

          <div className="border p-3">
            <h5>Thanh toán</h5>
            {/* <Row className="mb-2">
                            <Col xs={8}>PC Đồ Đại Học 2024 NV1 x1</Col>
                            <Col xs={4} className="text-end text-danger fw-bold">16.290.000đ</Col>
                        </Row> */}
            <hr />
            <Row className="mb-2">
              <Col xs={8}>Tổng chi phí</Col>
              <Col xs={4} className="text-end">
                {totalAmount.toLocaleString("vi-VN")}₫
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={8}>Tổng khuyến mãi</Col>
              <Col xs={4} className="text-end text-danger fw-bold">
                {100000}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={8} className="fw-bold">
                Tổng thanh toán
              </Col>
              <Col xs={4} className="text-end text-danger fw-bold">
                {800000}
              </Col>
            </Row>
            <p className="text-muted">Đã bao gồm VAT (nếu có)</p>
            <Button variant="primary" className="w-100">
              Xác nhận mua hàng
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default PaymentPage;
