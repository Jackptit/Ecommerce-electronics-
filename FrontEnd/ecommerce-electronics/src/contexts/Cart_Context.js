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
    const [count, setCount] = useState(state.amount);
    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    useEffect(() => {
        setCount(state.amount);
        if (state.amount > 0) {
            toast.success("Sản phẩm đã thêm vào giỏ hàng!");
        }
    }, [state.amount]);
    return (
        <Cart_Context.Provider value={{ ...state, addToCart }}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </Cart_Context.Provider>
    )
}
export const useCartContext = () => {
    return useContext(Cart_Context);
}