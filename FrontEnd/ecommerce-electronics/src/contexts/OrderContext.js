import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { getAccessToken } from "../utils/commonFunction";
import orderReducer from "../reducers/OrderReducer";

const OrderContext = createContext();

// Initial state
const initialState = {
  orders: null,
  loading: false,
  error: null,
};

// Provider component
export const OrdersProvider = ({ children }) => {
  const [ordersState, dispatch] = useReducer(orderReducer, initialState);
  const token = getAccessToken();

  if (!token) {
    //navigate to login
  }

  useEffect(() => {
    if (token && !ordersState.orders && !ordersState.loading) {
      dispatch({ type: "LOADING" });
      fetchOrders(token);
    }
  }, [ordersState.orders, ordersState.loading]);

  const fetchOrders = async (accessToken) => {
    try {
      if (!accessToken) {
        dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      const ordersResponse = await axios.get(
        "http://localhost:8080/api/orders",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const ordersWithDetails = await Promise.all(
        ordersResponse.data.map(async (order) => {
          const orderDetailsResponse = await axios.get(
            `http://localhost:8080/api/order_detail/${order.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          order.orderDetails = orderDetailsResponse.data;
          return order;
        })
      );

      console.log("Orders", ordersWithDetails)
      dispatch({ type: "SET_ORDERS", payload: ordersWithDetails });
    } catch (error) {
      console.error("Error fetching orders:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return (
    <OrderContext.Provider value={{ ordersState, dispatch, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrdersContext = () => useContext(OrderContext);
