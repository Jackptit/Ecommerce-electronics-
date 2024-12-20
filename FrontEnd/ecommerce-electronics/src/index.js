import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/Auth_Context";
import { CartProvider } from "./contexts/Cart_Context";
import { UserProvider } from "./contexts/UserContext";
import { AddressProvider } from "./contexts/AddressContext";
import { OrdersProvider } from "./contexts/OrderContext";
import { ToastContainer, toast } from "react-toastify";
import { ProductProvider } from "./contexts/Product_Context";
import Product from "./components/Product";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <ProductProvider>
    <AuthProvider>
      <AddressProvider>
        <UserProvider>
          <OrdersProvider>
            <CartProvider>
              <App />
              <ToastContainer />
            </CartProvider>
          </OrdersProvider>
        </UserProvider>
      </AddressProvider>
    </AuthProvider>
    </ProductProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
