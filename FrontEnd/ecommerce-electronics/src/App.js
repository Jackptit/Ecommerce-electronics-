import "./App.css";
import Navbar from "./components/Navbar";
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
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./pages/UserProfilePage";
import AdminPage from "./pages/Admin/AdminPage";


function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const settings = {
    avatar:
      "https://inkythuatso.com/uploads/thumbnails/800/2021/10/logo-messenger-inkythuatso-2-01-30-15-48-06.jpg",
  };

  const location = useLocation();
  const excludedRoutes = ["/login", "/admin", "/register"];
  const isExcluded = excludedRoutes.some((route) =>
    location.pathname.includes(route)
  );
  const isAdmin = true;
  return (
    <>
      {!isExcluded && (
        <>
          <Navbar settings={settings} />
          <ChatBot />
        </>
      )}

      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile/*" element={<UserProfile />} />

        {/* Admin routes */}
        {/* <Route
        path="/admin/*"
        element={isAdmin ? <AdminPage /> : <Navigate to="/login" />}
      /> */}
        <Route
          path="/admin/*"
          element={isAdmin ? <AdminPage /> : <Navigate to="/login" />}
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
