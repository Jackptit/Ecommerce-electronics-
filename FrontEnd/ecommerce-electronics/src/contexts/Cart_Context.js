import React from "react";
import { useReducer, useContext, useState, useEffect } from "react";
import Cart_Reducer from "../reducers/Cart_Reducer";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
const init = {
    cart: [],
    total: 0,
    amount: 0
}
const Cart_Context = React.createContext();
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Cart_Reducer, init);
    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    const increaseQuantity = (id) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: id });
    }
    const decreaseQuantity = (id) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: id });
    }
    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id })
    };
    useEffect(() => {
        toast.success("Sản phẩm đã thêm vào giỏ hàng!");
    }, [state.amount]);
    return (
        <Cart_Context.Provider value={{ ...state, addToCart, increaseQuantity, decreaseQuantity, removeItem }}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </Cart_Context.Provider>
    )
}
export const useCartContext = () => {
    return useContext(Cart_Context);
}