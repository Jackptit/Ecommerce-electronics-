import React from "react";
import { useReducer, useContext, useState, useEffect } from "react";
import Cart_Reducer from "../reducers/Cart_Reducer";
import 'react-toastify/dist/ReactToastify.css';

const init = {
    cart: [],
    total: 0,
    amount: 0,
    loading: false,
    error: null
}
const Cart_Context = React.createContext();
export const CartProvider = ({ children }) => {
    const [cartBuy, setCartBuy] = useState([]);
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
    const countCartTotals = () => {
        dispatch({ type: 'COUNT_CART_TOTALS' });
    }
    useEffect(() => {

    }, [state]);
    return (
        <Cart_Context.Provider value={{ ...state, cartBuy, setCartBuy, addToCart, increaseQuantity, decreaseQuantity, removeItem, countCartTotals }}>
            {children}
        </Cart_Context.Provider>
    )
}
export const useCartContext = () => {
    return useContext(Cart_Context);
}