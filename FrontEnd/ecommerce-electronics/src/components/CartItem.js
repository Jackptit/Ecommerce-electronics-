import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../contexts/Cart_Context';
import { Row, Col, Image, Button, Form, Container } from 'react-bootstrap';

const CartItem = ({ item }) => {
  const { id, name, price, image, quantity } = item;
  const { state, cartBuy, increaseQuantity, decreaseQuantity, removeItem, countCartTotals, setCartBuy } = useCartContext();
  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
    countCartTotals();
  }
  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
    countCartTotals();
  }
  const handleCheckBox = (isChecked) => {
    if (isChecked) {
      setCartBuy([...cartBuy, item]);
    }
    else {
      setCartBuy(
        cartBuy.filter((p) => p.id !== item.id)
      );
    }
  }

  return (
    <Container
      style={{
        backgroundColor: "#f8f9fa", /* Màu nền nhạt */
        padding: "3px",/* Bo tròn các góc */
        marginTop: "10px",          /* Khoảng cách trên */

      }}
      className="position-relative">
      <Row className="align-items-center my-3">
        <Col xs={1}>
          <Form.Check type="checkbox" onChange={(e) =>
            handleCheckBox(e.target.checked)
          }
          />
        </Col>
        <Col xs={2}>
          <Image src={image} alt={name} fluid rounded />
        </Col>
        <Col xs={3}>
          <div>
            <h6>{name}</h6>
            <p className="text-muted">SKU: {id}</p>
          </div>
        </Col>
        <Col xs={2}>
          <p className="mb-0 text-danger fw-bold">{price.toLocaleString()}₫</p>
        </Col>
        <Col xs={2} className="d-flex align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleDecreaseQuantity(id)}
          >
            -
          </Button>
          <span className="mx-1">{quantity}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleIncreaseQuantity(id)}
          >
            +
          </Button>
        </Col>
        <Col xs={1}>
          <p className="mb-0 text-danger fw-bold">{(price * quantity).toLocaleString()}₫</p>
        </Col>
        <Col xs={1} >
          <Button
            variant="danger"
            size="sm"
            onClick={() => removeItem(id)}
            className="position-absolute top-0 end-0 m-2"
          >
            Xóa
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartItem;

