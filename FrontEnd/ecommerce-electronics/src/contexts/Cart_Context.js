import React from "react";
import { useReducer, useContext, useState, useEffect } from "react";
import Cart_Reducer from "../reducers/Cart_Reducer";
import "react-toastify/dist/ReactToastify.css";

const init = {
  cart: [],
  cartBuy: [],
  total: 1,
  amount: 2,
};

const Cart_Context = React.createContext();
export const CartProvider = ({ children }) => {
  //const [cartBuy, setCartBuy] = useState([]);
  const [state, dispatch] = useReducer(Cart_Reducer, init);
  const setCart = (carts) => {
    dispatch({ type: "SET_CART", payload: carts });
  };
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const increaseQuantity = (item) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item });
  };
  const decreaseQuantity = (item) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: item });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const countCartTotals = () => {
    dispatch({ type: "COUNT_CART_TOTALS" });
  };
  const addCartBuy = (product) => {
    dispatch({ type: "ADD_TO_CART_BUY", payload: product });
  };
  const removeItemCartBuy = (product) => {
    dispatch({ type: "REMOVE_ITEM_CART_BUY", payload: product });
  };
  const selectAllCartItem = () => {
    dispatch({ type: "ADD_ALL_TO_CART_BUY" });
  };
  const unSelectAllCartItem = () => {
    dispatch({ type: "REMOVE_ALL_ITEM_CART_BUY" });
  };
  return (
    <Cart_Context.Provider
      value={{
        ...state,
        dispatch,
        addCartBuy,
        removeItemCartBuy,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        countCartTotals,
        selectAllCartItem,
        unSelectAllCartItem
      }}
    >
      {children}
    </Cart_Context.Provider>
  );
};
export const useCartContext = () => {
  return useContext(Cart_Context);
};
