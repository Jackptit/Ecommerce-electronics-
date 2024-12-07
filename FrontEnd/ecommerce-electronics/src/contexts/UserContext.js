import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { getAccessToken } from "../utils/commonFunction";
import userReducer from "../reducers/UserReducer";
import { useAuthContext } from "./Auth_Context";
import { useAddressContext } from "./AddressContext";

const UserContext = createContext();

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Provider component
export const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const token = getAccessToken();
  //const { addressState, fetchAddress } = useAddressContext();

  if (!token) {
    //navigate to login
    console.log("user not login");
  }

  useEffect(() => {
    if (token && !userState.user && !userState.loading) {
      dispatch({ type: "LOADING" });
      fetchUser(token);
      //fetchAddress(token);
    }
  }, [userState.user, userState.loading]);

  const fetchUser = async (accessToken) => {
    try {
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

      dispatch({ type: "SET_USER", payload: response.data });
      return response.data
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const updateUser = async (userData) => {
    try {
      if (!token) {
        dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      // Bắt đầu quá trình cập nhật (bật trạng thái loading)
      dispatch({ type: "LOADING" });

      // Gửi dữ liệu cập nhật người dùng qua API
      const response = await axios.put(
        "http://localhost:8080/api/user",
        userData, // Dữ liệu người dùng cần cập nhật
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "SET_USER", payload: response.data });
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return (
    <UserContext.Provider
      value={{ userState, dispatch, fetchUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
