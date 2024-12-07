import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PaymentSuccessModal = ({ open, onClose, toCart, toOrders }) => {
  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán thành công!</Modal.Title>
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
          Cảm ơn bạn đã tin tưởng cửa hàng chúng tôi!
          Đơn hàng sẽ sớm chuyển sản phẩm đến bạn nhanh nhất có thể, hãy chuẩn bị nhận hàng nhé!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={toCart}>
          Chuyển đến giỏ hàng
        </Button>
        <Button variant="primary" onClick={toOrders}>
          Xem đơn hàng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentSuccessModal;
