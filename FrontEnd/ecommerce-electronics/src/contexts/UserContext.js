import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import userReducer from "../reducers/userReducer";
import { useAuthContext } from "./Auth_Context";
const UserContext = createContext();

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { token } = useAuthContext();
  console.log(`ở usercontext ${token}`);
  useEffect(() => {
    // Kiểm tra nếu user chưa có và không có lỗi
    console.log("useEffect đang chạy");
    if (!state.user && !state.loading) {
      dispatch({ type: "LOADING" }); // Đánh dấu đang tải dữ liệu
      const fetchUser = async () => {
        try {
          const accessToken = token;
          //localStorage.getItem("accessToken"); // Lấy accessToken từ localStorage
          if (!accessToken) {
            dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
            return;
          }

          const response = await axios.get("http://localhost:8080/api/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          dispatch({ type: "SET_USER", payload: response.data }); // Lưu dữ liệu người dùng
        } catch (error) {
          console.error("Error fetching user:", error);
          dispatch({ type: "ERROR", payload: error.message }); // Cập nhật lỗi vào state
        }
      };

      fetchUser();
    }
  }, [state.user, state.loading]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
