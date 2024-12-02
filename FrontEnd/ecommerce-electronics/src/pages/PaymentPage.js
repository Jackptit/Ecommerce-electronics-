import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartContext } from "../contexts/Cart_Context";
import { useAddressContext } from "../contexts/AddressContext";
import { useUserContext } from "../contexts/UserContext";
import {
  getAccessToken,
  getCartBuy,
  saveCartBuy,
  removeCartBuy,
} from "../utils/commonFunction";
import ReactLoading from "react-loading";
import moment from "moment-timezone";

function PaymentPage() {
  const token = getAccessToken();
  const { cartBuy } = useCartContext();
  const { addressState, fetchAddress } = useAddressContext();
  const { userState, dispatch, fetchUser } = useUserContext();
  const [cartBuyItem, setCartBuyItem] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [currentCoupon, setCurrentCoupon] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShowErrorModal(true);
  const handleClose = () => setShowErrorModal(false);

  useEffect(() => {
    fetchAddress(token);
    fetchUser(token);
    fetchCoupon(token);
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

  const fetchCoupon = async (token) => {
    try {
      if (!token) {
        return;
      }
      const coupons = await axios.get("http://localhost:8080/api/coupon", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCoupons(coupons.data);
    } catch (error) {
      console.log("Error fetching coupon:", error.status);
    }
  };

  const defaultAddress = addressState.address.find(
    (item) => item.isDefault === true
  );
  const username = userState.user?.username;
  const phone = userState.user?.phone;

  const totalAmount = cartBuyItem.reduce((total, item) => {
    const itemTotal = item.product.price * (item.quantity || 1);
    return total + itemTotal;
  }, 0);

  const handleApplyCoupon = () => {
    const coupon = coupons.find((item) => item.code === currentCoupon.trim());

    if (!coupon) {
      setErrors({
        ...errors,
        coupon: "Mã không hợp lệ, vui lòng sử dụng mã khuyến mãi khác!",
      });
      setCurrentCoupon('');
      setTotalDiscount(0);
      return;
    }

    if(moment(coupon.endTime).valueOf() < Date.now() < Date.now()){
      setErrors({
        ...errors,
        coupon: "Mã khuyến mãi đã hết hạn, vui lòng chọn mã khuyến mãi khác!",
      });
      setCurrentCoupon('');
      setTotalDiscount(0);
      return;
    }

    // Tính tổng số tiền giảm giá
    const discount = (totalAmount * coupon.discountPercent) / 100;
    setTotalDiscount(discount);
  };

  const handleBuy = () => {
    if(!phone || phone === null || phone === '' || phone === undefined){
      handleShow();
      return;
    }
    try {
      setLoading(true);



      setLoading(false);
    } catch (error) {
      console.log('error buy: ',error)
      setLoading(false);
    }
  }

  const handleNavigate = () =>{
    navigate("/user-profile/user-info"); 
    handleClose();
  }

  const loadingStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  };

  return (
    <Container fluid className="mt-4 ">
      {loading && (
        <div style={loadingStyle}>
          <ReactLoading type="spin" color="#00BFFF" height={50} width={50} />
        </div>
      )}
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
                value={currentCoupon}
                onChange={(e) => setCurrentCoupon(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={handleApplyCoupon}
                disabled={!currentCoupon.trim()}
              >
                Áp dụng
              </Button>
            </InputGroup>
            {errors.coupon && <p className="text-danger me-1">{errors.coupon}</p>}

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
                {totalDiscount.toLocaleString("vi-VN")}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={8} className="fw-bold">
                Tổng thanh toán
              </Col>
              <Col xs={4} className="text-end text-danger fw-bold">
                {(totalAmount - totalDiscount).toLocaleString("vi-VN")}
              </Col>
            </Row>
            <p className="text-muted">Đã bao gồm VAT (nếu có)</p>
            <Button variant="primary" className="w-100" onClick={handleBuy} disabled={cartBuyItem.length < 1}>
              Xác nhận mua hàng
            </Button>
          </div>
        </Col>
      </Row>

      {/* Modal hiển thị thông báo */}
      <Modal show={showErrorModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Tài khoản của bạn chưa xác minh số điện thoại, vui lòng thiết lập số điện thoại trước khi mua hàng!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleNavigate} >
            Thiết lập
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default PaymentPage;
