import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const mockReviews = [
  {
    id: 1,
    product: "Laptop Dell XPS 13",
    user: "Nguyen Van A",
    content: "Sản phẩm rất tốt, chạy mượt mà.",
    rating: 5,
    isRepply: true,
    response: "Cảm ơn bạn đã đánh giá sản phẩm của chúng tôi!",
  },
  {
    id: 2,
    product: "Tai nghe Bluetooth Sony WH-1000XM4",
    user: "Tran Thi B",
    content: "Âm thanh hay nhưng kết nối đôi khi bị ngắt.",
    rating: 4,
    isRepply: false,
    response: "",
  },
  {
    id: 3,
    product: "Điện thoại iPhone 14",
    user: "Le Van C",
    content: "Giá cao nhưng hiệu năng tốt.",
    rating: 4,
    isRepply: true,
    response: "",
  },
];

const AdminReviewPage = () => {
  
  const [reviews, setReviews] = useState(mockReviews);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState(""); // Filter by rating
  const [statusFilter, setStatusFilter] = useState(""); // Filter by response status

  const handleModalOpen = (review) => {
    setSelectedReview(review);
    setResponse(review.response || "");
    setError(""); // Reset lỗi khi mở modal
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedReview(null);
    setShowModal(false);
  };

  const handleSubmitResponse = () => {
    if (!response.trim()) {
      setError("Vui lòng nhập phản hồi!");
      return;
    }

    const updatedReviews = reviews.map((review) =>
      review.id === selectedReview.id
        ? { ...review, response, isRepply: true }
        : review
    );
    setReviews(updatedReviews);
    handleModalClose();
  };

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách đánh giá theo từ khóa tìm kiếm, số sao, và trạng thái phản hồi
  const filteredFeedbacks = reviews.filter((review) => {
    const matchesSearchTerm = review.product
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === "" || review.rating === parseInt(ratingFilter);
    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "responded" ? review.isRepply : !review.isRepply);

    return matchesSearchTerm && matchesRating && matchesStatus;
  });

  return (
    <div>
      <h2>Quản lý đánh giá</h2>

      {/* Filter Section */}
      <div className="d-flex align-items-center mb-3">
        {/* Search Input */}
        <div style={{ flex: 1 }}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Tìm kiếm đánh giá..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "250px" }}
          />
        </div>

        {/* Dropdown Section */}
        <div className="d-flex ms-auto gap-4">
          {/* Dropdown for rating filter */}
          <Form.Select
            aria-label="Đánh giá"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="">Đánh giá ⭐</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </Form.Select>

          {/* Dropdown for status filter */}
          <Form.Select
            aria-label="Trạng thái"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ maxWidth: "200px", marginRight: "50px" }}
          >
            <option value="">Trạng thái</option>
            <option value="pending">Chờ phản hồi</option>
            <option value="responded">Đã phản hồi</option>
          </Form.Select>
        </div>
      </div>

      {/* Table to display filtered reviews */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Sản phẩm</th>
            <th>Người đánh giá</th>
            <th>Nội dung</th>
            <th>Đánh giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((review, index) => (
              <tr key={review.id}>
                <td>{index + 1}</td>
                <td>{review.product}</td>
                <td>{review.user}</td>
                <td>{review.content}</td>
                <td>{review.rating} ⭐</td>
                <td>
                  {!review.isRepply ? (
                    <Button size="sm" onClick={() => handleModalOpen(review)}>
                      Phản hồi
                    </Button>
                  ) : (
                    <span style={{ color: "green" }}>Đã phản hồi</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Không có kết quả phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal phản hồi */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Phản hồi đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitResponse();
            }}
          >
            <Form.Group>
              <Form.Label>Phản hồi:</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={7}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Nhập phản hồi của bạn"
              />
              {error && (
                <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
              )}
            </Form.Group>
            <Button type="submit" variant="primary">
              Gửi phản hồi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminReviewPage;
