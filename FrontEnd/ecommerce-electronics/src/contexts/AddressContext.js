import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import addressReducer from "../reducers/AddressReducer";
import { getAccessToken } from "../utils/commonFunction";
import { useAuthContext } from "./Auth_Context";

const AddressContext = createContext();

// Initial state
const initialState = {
  address: null,
  loading: false,
  error: null,
};

// Provider component
export const AddressProvider = ({ children }) => {
  const [addressState, dispatch] = useReducer(addressReducer, initialState);
  const  token  = getAccessToken();

  if (!token) {
    //navigate to login
  }

  useEffect(() => {
    if (token && !addressState.address && !addressState.loading) {
      dispatch({ type: "LOADING" });
      fetchAddress(token);
    }
  }, [addressState.address, addressState.loading]);

  const fetchAddress = async (accessToken) => {
    try {
      if (!accessToken) {
        dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      const response = await axios.get("http://localhost:8080/api/address", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("response: ", response);
      dispatch({ type: "SET_ADDRESS", payload: response.data });
    } catch (error) {
      console.error("Error fetching address:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const updateAddress = async (address) => {
    try {
      if (!token) {
        dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }
      dispatch({ type: "LOADING" });

      const response = await axios.put(
        "http://localhost:8080/api/address",
        address, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "SET_ADDRESS", payload: response.data });
      return response;
    } catch (error) {
      console.error("Error updating address:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return (
    <AddressContext.Provider
      value={{ addressState, dispatch, fetchAddress, updateAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => useContext(AddressContext);
