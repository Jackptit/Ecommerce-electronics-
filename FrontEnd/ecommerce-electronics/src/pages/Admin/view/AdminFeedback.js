import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { useOrdersContext } from "../../../contexts/UserContext"; // Import context
import { toast } from "react-toastify"; // Import toast
import { getAccessToken } from "../../../utils/commonFunction";
import axios from "axios";

const AdminReviewPage = () => {
  const navigate = useNavigate();
  const token = getAccessToken();
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState(""); // Filter by rating
  const [statusFilter, setStatusFilter] = useState(""); // Filter by response status

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  const fetchAllFeedback = async () => {
    try {
      if (!token) {
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      const feedbacks = await axios.get("http://localhost:8080/api/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setReviews(feedbacks.data);
    } catch (error) {
      console.log("Error fetching feedbacks:", error);
      if(error.status === 401){
        navigate('/login');
      }
    }
  };

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

  const handleSubmitResponse = async () => {
    if (!response?.trim()) {
      setError("Vui lòng nhập phản hồi!");
      return;
    }

    try {
      if (!token) {
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      const dataUpdate = {
        id: selectedReview.id,
        reply: response?.trim(),
      };

      // admin reply
      const feedbackReply = await axios.put(
        "http://localhost:8080/api/feedback",
        dataUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //update state
      const updatedReviews = reviews.map((review) =>
        review.id === dataUpdate.id
          ? { ...review, reply: feedbackReply.data.reply }
          : review
      ); 

      setReviews(updatedReviews);
      handleModalClose();
      toast.success('Đã gửi phản hồi đánh giá thành công !');
    } catch (error) {
      console.log("Error fetching feedbacks:", error);
      toast.error('Đã có lỗi xảy ra vui lòng thử lại sau !');
      if(error.status === 401){
        navigate('/login');
      }
    }
  };

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách đánh giá theo từ khóa tìm kiếm, số sao, và trạng thái phản hồi
  const filteredFeedbacks = reviews?.filter((review) => {
    const matchesSearchTerm = review.product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === "" ||
      (Number.isInteger(parseInt(ratingFilter)) &&
        review.star === parseInt(ratingFilter));
    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "responded"
        ? review.reply && review.reply?.trim() !== ""
        : !review.reply || review.reply?.trim() === "");

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
                <td
                  style={{
                    maxWidth: "450px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {review.product.name}
                </td>

                <td>{review.user.username}</td>
                <td>{review.description}</td>
                <td>{review.star} ⭐</td>
                <td>
                  {review.reply?.trim() === "" ||
                  !review.reply ? (
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
                Không có dữ liệu
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
