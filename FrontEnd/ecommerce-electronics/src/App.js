import "./App.css";
import { useEffect, useState } from "react";
import NavbarComponent from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/HomePage";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ChatBot from "react-chatbotify";
import Register from "./components/Register";
import UserProfile from "./pages/UserProfilePage";
import AdminPage from "./pages/Admin/AdminPage";
import AuthForm from "./components/AuthForm";
import PaymentPage from "./pages/PaymentPage";
import { getAccessToken } from "./utils/commonFunction";
import { useUserContext } from "./contexts/UserContext";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const { userState, dispatch, fetchUser } = useUserContext();
  const [userData, setUserData] = useState(userState?.user);

  useEffect(() => {
    const token = getAccessToken();
    const fetchUserData = async () => {
      if (token && !userState.user && !userState.loading) {
        console.log("Fetching user...");
        await fetchUser(token);
      }
    };
    
    fetchUserData(); // Gọi hàm async
  }, [userState.user, userState.loading]);

  useEffect(() => {
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user]);

  const settings = {
    avatar:
      "https://inkythuatso.com/uploads/thumbnails/800/2021/10/logo-messenger-inkythuatso-2-01-30-15-48-06.jpg",
  };

  const location = useLocation();
  const excludedRoutes = ["/login", "/admin", "/register"];
  const isExcluded = excludedRoutes.some((route) =>
    location.pathname.includes(route)
  );
  return (
    <>
      {!isExcluded && (
        <>
          <NavbarComponent settings={settings} />

        </>
      )}

      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile/*" element={<UserProfile />} />
        <Route path="/payment" element={<PaymentPage />} />

        <Route
          path="/admin/*"
          element={<AdminPage />}
        />
      </Routes>
      {!isExcluded && (
        <>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
