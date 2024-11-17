import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OrderHistory = () => {
  // Dữ liệu mẫu
  const orders = [
    {
      id: "ORD001",
      date: "2024-11-15",
      total: 500000,
      status: "Đã giao hàng",
      items: [
        {
          name: "Điện thoại Iphone 16 Promax",
          quantity: 2,
          price: 100000,
          image:
            "https://lh3.googleusercontent.com/KGkAbtWwoyPn6hccimhAO97T6lLYZ7N443dopw168t3dQh0F4ehNjShwp30yT2kkuzYyjg0Dl1tWM24PuJ6mvEBxSVj7V11mEQ=w500-rw",
          feedback: false,
        },
        {
          name: "Điện thoại Samsum Galaxy S22 Ultra",
          quantity: 1,
          price: 300000,
          image:
            "https://lh3.googleusercontent.com/KGkAbtWwoyPn6hccimhAO97T6lLYZ7N443dopw168t3dQh0F4ehNjShwp30yT2kkuzYyjg0Dl1tWM24PuJ6mvEBxSVj7V11mEQ=w500-rw",
          feedback: false,
        },
      ],
    },
    {
      id: "ORD002",
      date: "2024-11-10",
      total: 300000,
      status: "Đang vận chuyển",
      items: [
        {
          name: "Màn hình LCD Xiaomi G27i EU ELA5375EU 27 inch (1920x1080/ IPS/ 165Hz/ 1ms) ",
          quantity: 1,
          price: 300000,
          image:
            "https://lh3.googleusercontent.com/KGkAbtWwoyPn6hccimhAO97T6lLYZ7N443dopw168t3dQh0F4ehNjShwp30yT2kkuzYyjg0Dl1tWM24PuJ6mvEBxSVj7V11mEQ=w500-rw",
          feedback: true,
        },
      ],
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleReviewClick = (item) => {
    setSelectedItem(item); // Lưu thông tin sản phẩm được chọn
    setShowModal(true); // Hiển thị modal
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("Đánh giá sản phẩm:", selectedItem.name);
    // Gửi đánh giá lên server tại đây
    handleCloseModal();
  };

  return (
    <div>
      <h3 className="mb-4">Lịch sử mua sắm</h3>
      {orders.map((order) => (
        <div key={order.id} className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>
              <strong>Mã đơn hàng:</strong> {order.id}
            </span>
            <span>
              <strong>Ngày mua:</strong> {order.date}
            </span>
          </div>
          <div className="card-body">
            <p>
              <strong>Tổng tiền:</strong> {order.total.toLocaleString("vi-VN")}₫
            </p>
            <p>
              <strong>Trạng thái:</strong> {order.status}
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
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    </td>
                    <td className="fixed-width">{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString("vi-VN")}₫</td>
                    <td>
                      {item.feedback ? (
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
      ))}

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
                value={selectedItem?.name || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Đánh giá</Form.Label>
              <Form.Control as="textarea" rows={3} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xếp hạng</Form.Label>
              <Form.Select required>
                <option value="">Chọn xếp hạng</option>
                <option value="1">1 ⭐- Tệ</option>
                <option value="2">2 ⭐- Không tốt</option>
                <option value="3">3 ⭐- Bình thường</option>
                <option value="4">4 ⭐- Tốt</option>
                <option value="5">5 ⭐- Xuất sắc</option>
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
