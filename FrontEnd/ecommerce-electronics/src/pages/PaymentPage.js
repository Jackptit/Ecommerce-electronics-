import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useCartContext } from '../contexts/Cart_Context';

function PaymentPage() {
    const { cart, total, amount, cartBuy } = useCartContext();
    console.log(cartBuy);
    return (
        <Container fluid className="mt-4">
            <Row>
                {/* Thông tin giao hàng và thanh toán */}
                <Col lg={8} className="mb-4">
                    <h4>Thông tin giao hàng</h4>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Họ và tên người nhận <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Họ tên người nhận hàng" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Dùng để liên lạc khi giao hàng" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formCity">
                            <Form.Label>Tỉnh/thành phố <span className="text-danger">*</span></Form.Label>
                            <Form.Select>
                                <option>Chọn tỉnh/thành phố</option>
                                <option>Hà Nội</option>
                                <option>TP Hồ Chí Minh</option>
                                {/* Thêm các tùy chọn khác */}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Địa chỉ <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" placeholder="Nhập địa chỉ giao hàng" rows={3} />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formInvoice">
                            <Form.Check type="checkbox" label="Xuất hóa đơn công ty" />
                        </Form.Group>

                        <h4>Hình thức thanh toán</h4>
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
                        <p className="text-muted">Mã giảm giá và phiếu mua hàng sẽ không thể dùng lại sau khi đã đặt mua hàng</p>
                    </div>

                    <div className="border p-3">
                        <h5>Thông tin giỏ hàng</h5>
                        <Row className="mb-2">
                            <Col xs={8}>PC Đồ Đại Học 2024 NV1 x1</Col>
                            <Col xs={4} className="text-end text-danger fw-bold">16.290.000đ</Col>
                        </Row>
                        <hr />
                        <Row className="mb-2">
                            <Col xs={8}>Tổng số lượng sản phẩm</Col>
                            <Col xs={4} className="text-end">{amount}</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={8} className="fw-bold">Tổng chi phí</Col>
                            <Col xs={4} className="text-end text-danger fw-bold">{total}</Col>
                        </Row>
                        <p className="text-muted">Đã bao gồm VAT (nếu có)</p>
                        <Button variant="primary" className="w-100">Xác nhận mua hàng</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default PaymentPage;