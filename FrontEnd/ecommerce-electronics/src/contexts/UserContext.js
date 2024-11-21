import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const { token } = useAuthContext();

  useEffect(() => {
    console.log('token', token)
    // Kiểm tra nếu token hợp lệ và chưa có user trong state
    if (token && !userState.user && !userState.loading) {
      dispatch({ type: "LOADING" }); 
      fetchUser(token);
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
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return (
    <UserContext.Provider value={{ userState, dispatch, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
