import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaCamera, FaStar, FaRegStar } from 'react-icons/fa'; // Icon thêm hình ảnh

const ModalComment = ({ show, handleClose }) => {
    const list_rate = [
        "...",
        "Rất tệ",
        "Tệ",
        "Bình thường",
        "Tốt",
        "Tuyệt vời"
    ]
    const maxStars = 5;
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');

    // Xử lý khi nhập cảm nhận
    const handleRate = (value) => {
        setRating(value);
    }
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title >Đánh giá & nhận xét</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Đánh giá sao */}

                <p className="fw-semibold fs-5">
                    Đánh giá của bạn
                </p>
                {[...Array(maxStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={index}
                            style={{ cursor: 'pointer', fontSize: '32px', color: '#ffc107' }}
                            onClick={() => handleRate(starValue)} // Click vào sao
                            onMouseEnter={() => setHoveredRating(starValue)} // Hover vào sao
                            onMouseLeave={() => setHoveredRating(0)} // Thoát hover
                        >
                            {starValue <= (hoveredRating || rating) ? <FaStar /> : <FaRegStar />}
                        </span>
                    );
                })}
                <p > {rating} sao,sản phẩm này {list_rate[rating]}</p>
                {/* Nhập cảm nhận */}
                <Form.Group controlId="formBasicComment" className="mb-3 mt-5">
                    <Form.Label className="fw-semibold fs-5">Cảm nhận của bạn về sản phẩm</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        placeholder='Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 ký tự)'
                        onChange={handleCommentChange}
                        minLength={15}
                    />
                </Form.Group>

                {/* Thêm hình ảnh */}
                <Button variant="secondary" className="mb-3">
                    <FaCamera /> Thêm hình ảnh
                </Button>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Gửi đánh giá
                </Button>
            </Modal.Footer>
        </Modal >
    );
};
export default ModalComment;
