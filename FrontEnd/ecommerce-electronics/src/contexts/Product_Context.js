import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import productReducer from "../reducers/Product_Reducer";
import { getAccessToken, saveProducts } from "../utils/commonFunction";

const Product_Context = React.createContext();
const initialState = {
    products: null,
    loading: false,
    error: null,
  };
export const ProductProvider = ({ children }) => {
    const [productState, dispatch] = useReducer(productReducer, initialState);
    const token= getAccessToken();
    useEffect(() => {
      if ( !productState.products && !productState.loading) {
        dispatch({ type: "LOADING" });
        fetchProduct();
      }
    }, [productState.products, productState.loading]);
    const fetchProduct = async () => {
      try{
       const response= await axios.get("http://192.168.33.9:8080/api/product",
        {
            headers: {
                "Content-Type": "application/json",
            },
        }       
       )
       console.log(response.data);
       saveProducts(JSON.stringify(response.data));
       dispatch({ type: "SET_PRODUCTS", payload: response.data });
       return response.data
      }
      catch(error){
          console.error("Error fetching product:", error);
          dispatch({ type: "ERROR", payload: error.message });
      }
    }
    return (
      <Product_Context.Provider value={{ productState,dispatch }}>
        {children}
      </Product_Context.Provider>
    );
}
export const useProductContext = () => {
  return useContext(Product_Context);
}