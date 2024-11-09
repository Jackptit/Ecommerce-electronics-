
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ChatBot from 'react-chatbotify'
function App() {
  const settings = {
    avatar: 'https://inkythuatso.com/uploads/thumbnails/800/2021/10/logo-messenger-inkythuatso-2-01-30-15-48-06.jpg',
  };
  return (
    <>
      <div >
        <Router>
          <Navbar settings={settings} />
          <ChatBot />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </Router>
      </div >

    </>
  );
}

export default App;
