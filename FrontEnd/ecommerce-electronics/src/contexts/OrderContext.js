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
import { toast } from "react-toastify"; //

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
        "http://192.168.33.9:8080/api/orders",
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
            `http://192.168.33.9:8080/api/order_detail/${order.id}`,
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

      console.log("Orders", ordersWithDetails);
      dispatch({ type: "SET_ORDERS", payload: ordersWithDetails });
    } catch (error) {
      console.error("Error fetching orders:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const updateFeedbackStatus = async (accesstoken, reviewData, idOrder, idProduct) => {
    try {
      if (!accesstoken) {
        dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      // create feedback
      const response = await axios.post(
        "http://127.0.0.1:8080/api/feedback",
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        dispatch({ type: "ERROR", payload: response.message });
        toast.error("Đánh giá sản phẩm thất bại!");
        return;
      }

      //set status feedback = true
      const orderInfo = {
        idOrder: idOrder,
        idProduct: idProduct,
      };
      const feedbackStatus = await axios.put(
        "http://127.0.0.1:8080/api/order_detail",
        orderInfo,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (feedbackStatus.status === 200) {
        toast.success("Đánh giá sản phẩm thành công!");
        dispatch({ type: "FEEDBACK_ORDER_PRODUCT", payload: orderInfo });
        console.log("Thất bại khi update status");
      } else {
        toast.error("Đánh giá sản phẩm thất bại!");
        dispatch({ type: "ERROR", payload: feedbackStatus.message });
      }
      
    } catch (error) {
      console.log("Error feedback orders:", error);
      dispatch({ type: "ERROR", payload: error.message });
      toast.error("Đánh giá sản phẩm thất bại!");
    }
  };

  return (
    <OrderContext.Provider value={{ ordersState, dispatch, fetchOrders, updateFeedbackStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrdersContext = () => useContext(OrderContext);
