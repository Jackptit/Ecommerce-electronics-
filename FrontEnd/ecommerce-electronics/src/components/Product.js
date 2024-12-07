import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../contexts/Cart_Context";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getAccessToken } from "../utils/commonFunction";
import moment from "moment-timezone";

const Product = (product) => {
  const { addToCart, countCartTotals } = useCartContext();
  const token = getAccessToken();
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    if (!token) {
      navigate("/login");
    }
    // Gọi hàm addToCart (thêm sản phẩm vào giỏ hàng)
    await handleAddToCart(token);
    
  };
  const [hovered, setHovered] = useState(false);
  const toggleFavorite = () => {};
  const images = product.image.split(",");
  const imageMain = images[0];

  const handleAddToCart = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/api/cart_detail', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "product": product, "quantity": 1 }),
        }).then(response => response.json());

        addToCart(response);
        toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
      } catch (error) {
        console.log("error add to cart",error)
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
      }
  };
  return (
    <>
      <ProductWrapper>
        <div className="container">
          <Link
            to={`/product/${product.id}`}
            state={{ productData: product }}
            className="link"
          >
            <div className="image-link">
              <img src={imageMain} alt={product.name} />
            </div>
          </Link>
          <span className="w-tag">Phone</span>
          <span className="w-tag">256gb</span>
          <footer>
            <Link
              to={`/product/${product.id}`}
              state={{ productData: product }}
              className="link"
            >
              <p
                className="w-name"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.name}
              </p>
            </Link>
            <p className="w-price">Giá chỉ còn: {product.price}</p>
            <p>
              Gía gốc:
              <del className="w-price"> {product.price}</del>
            </p>
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: hovered ? "red" : "gray",
              }}
              onClick={toggleFavorite}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <FontAwesomeIcon icon={regularHeart} />
              Yêu thích
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Thêm vào giỏ hàng
            </button>
          </footer>
        </div>
      </ProductWrapper>
    </>
  );
};
const ProductWrapper = styled.article`
  .container {
    border: 0.5px solid #f5f5f5;
    width: 200px;
    background-color: white;
    position: relative;
    margin-top: 10px;
  }
  img {
    width: calc(
      90% - 20px
    ); /* Giả sử muốn có 20px khoảng cách giữa các sản phẩm */
    margin: 1rem;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }

  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  .w-tag {
    display: flex;
    text-align: center;
    width: max-content;
    justify-content: center;
    background-color: #f0f0f0; /* Màu xám nhạt */
    font-style: italic; /* Kiểu chữ in nghiêng */
    font-size: 0.8rem;
    margin: 0.5rem; /* Căn giữa theo chiều ngang */
  }
  .w-name {
    opacity: 1; /* Đảm bảo .w-name luôn hiển thị */
    margin-bottom: 0.5rem; /* Đệm dưới 0.5rem */
    font-size: 0.8rem;
  }
  .w-name:hover + .link {
    opacity: 1;
  }
  .w-price {
    color: red; /* Chữ màu đỏ */
    font-weight: bold;
    /* Đệm trên 0.5rem */
  }
  .buy-now {
    background-color: #c8d421; /* Màu nền xanh dương */
    color: black; /* Màu chữ trắng */
    border: none; /* Không viền */

    padding: 8px 10px; /* Đệm trên dưới 10px, trái phải 20px */
    font-size: 1rem; /* Cỡ chữ */
    cursor: pointer; /* Con trỏ chuột khi di chuyển vào button */
    border-radius: 5px; /* Bo tròn góc */
    transition: background-color 0.3s ease; /* Hiệu ứng chuyển màu nền */
    display: block; /* Đặt button thành block để margin:auto có tác dụng */

    margin: 10px auto; /* Căn giữa button trên trục ngang */
  }

  .buy-now:hover {
    background-color: #df1818; /* Màu nền khi hover */
  }
  .image-link {
    height: 150px;
  }
`;
export default Product;
