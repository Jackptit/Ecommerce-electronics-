import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../contexts/Cart_Context';

const CartItem = ({ item }) => {
  const { id, name, price, image, quantity } = item;
  console.log(item);
  const { state, increaseQuantity, decreaseQuantity, removeItem } = useCartContext();
  return (
    <CartItemWrapper>
      <input type="checkbox" defaultChecked />
      <div className="item-info">
        <img src={image} alt={name} />
        <div className="item-details">
          <h4>{name}</h4>
          <p>SKU: {id}</p>
        </div>
      </div>
      <p className="price">{price.toLocaleString()}₫</p>
      <div className="quantity">
        <button onClick={() => decreaseQuantity(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => increaseQuantity(id)}>+</button>
      </div>
      <p className="subtotal">{(price * quantity).toLocaleString()}₫</p>
      <button onClick={() => removeItem(id)} className="remove">X</button>
    </CartItemWrapper>
  );
};

export default CartItem;

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
  .item-info {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .item-info img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  .item-details h4 {
    font-size: 1rem;
    margin: 0;
    color: #333;
  }
  .item-details p {
    font-size: 0.85rem;
    color: #666;
  }
  .price, .subtotal {
    font-weight: bold;
    color: #ff4d4f;
  }
  .quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .quantity button {
    padding: 0.3rem 0.6rem;
    font-size: 1rem;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.2s;
  }
  .quantity button:hover {
    background-color: #ddd;
  }
  .remove {
    background: none;
    color: #ff4d4f;
    font-weight: bold;
    cursor: pointer;
    border: none;
    font-size: 1.2rem;
  }
  .remove:hover {
    color: #ff0000;
  }
`;
