import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RegisterSuccessModal = ({ open, onClose }) => {
  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Đăng ký thành công!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {/* Hình ảnh lớn ở giữa */}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/011/858/556/small_2x/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png"
          alt="Success"
          style={{ width: '100%', maxWidth: '200px', marginBottom: '20px' }}
        />
        {/* Nội dung thông báo */}
        <p>
          Tài khoản của bạn đã được tạo thành công. Hãy tận hưởng trải nghiệm mua sắm
          thỏa thích cùng chúng tôi!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterSuccessModal;
