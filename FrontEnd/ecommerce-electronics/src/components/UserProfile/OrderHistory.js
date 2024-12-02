import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useOrdersContext } from "../../contexts/OrderContext"; // Import context
import { toast } from "react-toastify"; // Import toast
import formatDate from "../../utils/dateFormat";
import { getAccessToken } from "../../utils/commonFunction";

const OrderHistory = () => {
  const { ordersState, dispatch, fetchOrders, updateFeedbackStatus } =
    useOrdersContext();
  const [ordersData, setOrders] = useState(ordersState?.orders);
  const token = getAccessToken();

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (ordersState.orders) {
      setOrders(ordersState.orders);
    }
  }, [ordersState.orders]);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      await fetchOrders(token);
    };

    fetchData();
  }, [token]);

  if (ordersState.loading) {
    return <p>Loading user data...</p>;
  }

  if (ordersState.error) {
    return <p>Error: {ordersState.error}</p>;
  }

  if (!ordersState.orders) {
    return <p>No user data found.</p>;
  }

  const handleReviewClick = (item) => {
    setSelectedItem(item); // Lưu thông tin sản phẩm được chọn
    setShowModal(true); // Hiển thị modal
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
    setReview("");
    setRating("");
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      idProduct: selectedItem?.product.id,
      star: rating,
      description: review,
    };

    await updateFeedbackStatus(
      token,
      reviewData,
      selectedItem?.idOrder,
      selectedItem?.idProduct
    );
    handleCloseModal();
  };

  const convertStatus = (status) => {
    return status == 1
      ? "Đã thanh toán"
      : status == 2
      ? "Chờ thanh toán"
      : "Đã Hủy";
  };

  return (
    <div>
      <h3 className="mb-4">Lịch sử mua sắm</h3>
      {ordersData?.length === 0 ? (
        <span>Bạn chưa có đơn hàng nào</span>
      ) : (
        ordersData?.map((order) => (
          <div key={order.id} className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>
                <strong>Mã đơn hàng:</strong> {order.code}
              </span>
              <span>
                <strong>Ngày mua:</strong> {formatDate(order.orderTime)}
              </span>
            </div>
            <div className="card-body">
              <p>
                <strong>
                  Tổng tiền: {order.total.toLocaleString("vi-VN")} ₫
                </strong>
              </p>
              <p>
                <strong>Trạng thái:</strong>
                <span
                  style={{
                    color:
                      order.status === 1
                        ? "green"
                        : order.status === 2
                        ? "gray"
                        : "red",
                    marginLeft: "10px",
                  }}
                >
                  <strong>
                    <i>{convertStatus(order.status)}</i>
                  </strong>
                </span>
              </p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Đánh giá sản phẩm</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderDetails.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={"https:" + item.product.image.split(",")[1]}
                          alt={"image"}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td className="fixed-width">{item.product.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.productPrice.toLocaleString("vi-VN")} ₫</td>
                      <td>
                        {item.isFeedback ? (
                          <span className="feedback-checked">Đã đánh giá</span>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            style={{ width: "120px" }}
                            onClick={() => handleReviewClick(item)}
                          >
                            Đánh giá ngay
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* Modal đánh giá */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitReview}>
            <Form.Group className="mb-3">
              <Form.Label>Sản phẩm</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={selectedItem?.product.name || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Đánh giá</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={review}
                onChange={handleReviewChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xếp hạng</Form.Label>
              <Form.Select
                required
                value={rating}
                onChange={handleRatingChange}
              >
                <option value="">Chọn xếp hạng</option>
                <option value="1">1 ⭐- Tệ</option>
                <option value="2">2 ⭐⭐- Không tốt</option>
                <option value="3">3 ⭐⭐⭐- Bình thường</option>
                <option value="4">4 ⭐⭐⭐⭐- Tốt</option>
                <option value="5">5 ⭐⭐⭐⭐⭐- Xuất sắc</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit">
              Gửi đánh giá
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderHistory;
