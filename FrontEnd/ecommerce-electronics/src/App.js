
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
function App() {
  return (
    <>
      <div >
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Router>
        <Footer />
      </div >

    </>
  );
}

export default App;
