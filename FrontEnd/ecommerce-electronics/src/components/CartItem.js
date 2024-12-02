import React, { useState } from "react";
import { useCartContext } from "../contexts/Cart_Context";
import { Row, Col, Image, Button, Form, Container } from "react-bootstrap";
import ConfirmModal from "./AdminComponents/Modal/ConfirmModal";
import axios from "axios";
import { getAccessToken } from "../utils/commonFunction";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
  const {
    cartBuy,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    addCartBuy,
    removeItemCartBuy,
  } = useCartContext();

  const navigate = useNavigate();
  const token = getAccessToken();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleIncreaseQuantity = async (item) => {
    increaseQuantity(item);
    await updateCartItem(item, 1);
  };
  const handleDecreaseQuantity = async (item) => {
    decreaseQuantity(item);
    await updateCartItem(item, -1);
  };
  const handleCheckBox = (isChecked) => {
    if (isChecked) {
      addCartBuy(item);
    } else {
      removeItemCartBuy(item);
    }
  };


  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const handleDeleteCartItem = () => {
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    removeItem(item);
    setShowConfirm(false);
    await deleteCartItem(item.product.id)
  };


  const updateCartItem = async (item, quantity) => {  //tăng => quantity = 1, ngược lại quantity = -1
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const newItem = {...item, quantity: item.quantity + quantity};
      const response = await axios.put(
        "http://localhost:8080/api/cart_detail",
        newItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    } catch (error) {
      console.log("Error update coupon:", error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  }

  const deleteCartItem  = async (productId) => {  
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.delete(
        `http://localhost:8080/api/cart_detail/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    } catch (error) {
      console.log("Error update coupon:", error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  }

  return (
    <Container
      style={{
        backgroundColor: "#f8f9fa" /* Màu nền nhạt */,
        padding: "3px" /* Bo tròn các góc */,
        marginTop: "10px" /* Khoảng cách trên */,
      }}
      className="position-relative"
    >
      <Row className="align-items-center my-3">
        <Col xs={1}>
          <Form.Check
            type="checkbox"
            className="custom-checkbox"
            checked={cartBuy.some(
              (cartItem) =>
                cartItem.product.id === item.product.id &&
                cartItem.user.id === item.user.id
            )}
            onChange={(e) => handleCheckBox(e.target.checked)}
          />
        </Col>
        <Col xs={2}>
          <Image
            src={item.product.image.split(",")[0]}
            alt="image"
            fluid
            rounded
          />
        </Col>
        <Col xs={3}>
          <div>
            <h5>{item.product.name}</h5>
            {/* //<p className="text-muted"> {item.product.name}</p> */}
            <p className="text-muted"> Loại : {item.product.category.name}</p>
          </div>
        </Col>
        <Col xs={2}>
          <p className="mb-0 text-danger fw-bold">
            {item.product.price?.toLocaleString("vi-VN")}₫
          </p>
        </Col>
        <Col xs={2} className="d-flex align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            style={{
              height: '15px',
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',    
              marginRight: '5px'
            }}
            onClick={() =>
              item.quantity === 1
                ? handleDeleteCartItem(item)
                : handleDecreaseQuantity(item)
            }
          >
            -
          </Button>
          <span className="mx-1">{item.quantity}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            style={{
              height: '15px',
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',    
               marginLeft: '5px'
            }}
            onClick={() => handleIncreaseQuantity(item)}
          >
            +
          </Button>
        </Col>
        <Col xs={1}>
          <p className="mb-0 text-danger fw-bold">
            {(item.product.price * item.quantity)?.toLocaleString("vi-VN")}₫
          </p>
        </Col>
        <Col xs={1}>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDeleteCartItem()}
            className="position-absolute top-0 end-0 m-2"
          >
            Xóa
          </Button>
        </Col>
      </Row>
      {/* Modal Confirm */}
      <ConfirmModal
        show={showConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        bodyText="Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác."
      />
    </Container>
  );
};

export default CartItem;
