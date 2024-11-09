import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../contexts/Cart_Context';
import CartItem from '../components/CartItem';

const CartPage = () => {
    const { cart, total, amount } = useCartContext();
    console.log(cart);
    console.log(total);
    console.log(amount);
    return (
        <Wrapper>
            <div className="cart-container">
                <h2>Giỏ hàng</h2>
                <div className="cart-items">
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <Summary>
                    <h3>Thanh toán</h3>
                    <p>Tổng tạm tính: <span>{total.toLocaleString()}₫</span></p>
                    <p>Thành tiền: <span>{total.toLocaleString()}₫</span> (Đã bao gồm VAT)</p>
                    <button className="continue-button">Tiếp tục</button>
                </Summary>
            </div>
        </Wrapper>
    );
};

export default CartPage;

const Wrapper = styled.div`
    margin-top: 50px;
  .cart-container {
    max-width: 1200px;
    margin: auto;
    padding: 1rem;
    display: flex;
    gap: 2rem;
    background-color: white;
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .cart-items {
    flex: 3;
  }
`;

const Summary = styled.div`
  flex: 1;
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 8px;
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  p {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
  }
  .continue-button {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`;
