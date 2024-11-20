import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import userReducer from "../reducers/userReducer";

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

  useEffect(() => {
    // Kiểm tra nếu user chưa có và không có lỗi
    if (!state.user && !state.loading) {
      dispatch({ type: "LOADING" }); // Đánh dấu đang tải dữ liệu

      const fetchUser = async () => {
        try {
          const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOjEyLFwiaWRSb2xlXCI6MixcInBob25lXCI6XCIwOTYzMDEyODEyXCIsXCJlbWFpbFwiOlwiXCIsXCJ1c2VybmFtZVwiOlwiXCIsXCJwYXNzd29yZFwiOlwiMVwiLFwicmFua1wiOlwixJDhu5NuZ1wiLFwicG9pbnRcIjoxMTUwMCxcImJpcnRoZGF5XCI6XCIyMDI0LTA0LTAzVDAwOjAwOjAwLjAwMCswN1wiLFwiZ2VuZGVyXCI6MSxcImltYWdlXCI6XCJodHRwczovL3dhYy1jZG4uYXRsYXNzaWFuLmNvbS9kYW0vamNyOmJhMDNhMjE1LTJmNDUtNDBmNS04NTQwLWIyMDE1MjIzYzkxOC9NYXgtUl9IZWFkc2hvdCUyMCgxKS5qcGc_Y2RuVmVyc2lvblxcdTAwM2QxNTM5XCIsXCJzdGF0dXNcIjoxfSIsImlhdCI6MTczMjAwNjM0NCwiZXhwIjoxNzMyMDkyNzQ0fQ.BkZ6JOvWFRxqvXYLuNYH3OeACfbIGdbtrJlyqya3Sac'
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
