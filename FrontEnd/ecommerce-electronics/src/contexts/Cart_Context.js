import React, {useEffect} from "react";
import { useReducer, useContext } from "react";
import Cart_Reducer from "../reducers/Cart_Reducer";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
import { getAccessToken } from "../utils/commonFunction";

const init = {
    cart: [],
    cartBuy: [],
    total: 1,
    amount: 2,
};




const Cart_Context = React.createContext();
export const CartProvider = ({ children }) => {
    const token = getAccessToken();
    //const [cartBuy, setCartBuy] = useState([]);
    const [state, dispatch] = useReducer(Cart_Reducer, init);

    useEffect(() => {
        if (token && state.cart.length === 0) {
            fetchCart(token); 
        }
      }, [state.cart]);


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
    const payment = (cartsbuy) => {
        dispatch({ type: "PAYMENT", payload: cartsbuy });
    };

    const fetchCart = async (token) => {
        try {
          if (!token) {
            return;
          }
    
          const carts = await axios.get("http://localhost:8080/api/cart_detail", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          // Sắp xếp danh sách theo thời gian (gần nhất đến lâu nhất)
          carts.data.sort((a, b) => {
            const timeA = moment(a.create_at).valueOf();
            const timeB = moment(b.create_at).valueOf();
            return timeB - timeA; 
          });
    
          dispatch({ type: "SET_CART", payload: carts.data });
          return carts.data
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
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
                unSelectAllCartItem,
                fetchCart,
                payment
            }}
        >
            {children}
        </Cart_Context.Provider>
    );
};
export const useCartContext = () => {
    return useContext(Cart_Context);
};
