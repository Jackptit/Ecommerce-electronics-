import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductImage from "../components/ProductImage";
import UserComment from "../components/UserComment";
import { Container, Button,Row,Col,Card } from "react-bootstrap";
import ModalComment from "../components/ModalComment";
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import axios from "axios";
import {FacebookShareButton,FacebookIcon} from "react-share";
import { useCartContext } from "../contexts/Cart_Context";
import { toast } from "react-toastify";
import { getAccessToken } from "../utils/commonFunction";
const ProductPage = () => {
  const list_commnent = [
    {
      avatar: "https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg",
      userName: "Nguyễn Hoàng Nam",
      rating: 4,
      comment: "Sản phẩm như bìu, giá cả hợp lý"
    }
  ]
  const token = getAccessToken();
  const navigate = useNavigate();
  const { addToCart, countCartTotals } = useCartContext();
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const handleShowModal = () => { setShowModal(true) };
  const handleCloseModal = () => { setShowModal(false) };
  const location = useLocation();
  const product=location.state?.productData;
  const {id} = useParams();
  console.log("đây là id " , id);
  console.log("đây là product",product);
  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    try{
      const response = await axios.get(`http://localhost:8080/api/feedback/product/${id}`);
      const data = response.data;
      console.log(data);
      setComments(data);
    }
    catch(error){
      console.log("Error fetching comments:", error.status);
    }
  }
  const images=product.image.split(',')
  const handleBuyNow = async () => {
    if (!token) {
      navigate("/login");
      return
    }
    // Gọi hàm addToCart (thêm sản phẩm vào giỏ hàng)
    await handleAddToCart(token);
    
  };
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
     <Container className="my-4">
   
      <Row>
        <Col md={6}>
          {/* Giả sử ProductImage là một component hiển thị hình ảnh */}
          <ProductImage images={images} />
        </Col>
        <Col md={6} >
          <Card className="p-3 mt-5">
            <Card.Body>
              <Card.Title as="h2">{product.name}</Card.Title>
              <div className="price">
                  <Row>
                    <Col md="5">
                      <p className="discount-percentage" style={styles.discountPercentage}>Gía khuyến mãi: {(product.price-product.price*product.discountPercent/100).toLocaleString()}₫</p>
                   
                    </Col>
                    <Col md="5">
                    <div style={styles.priceWrapper}>
                      <p className="old-price" style={styles.oldPrice}>{product.price.toLocaleString()}₫</p>
                     <p className="discount-price" style={styles.discountPrice}>-{product.discountPercent}%</p>
                     </div>
                    </Col>
                    
                  </Row>    
              </div>
              <div className="buttons">
              <Row>
                <Col md="5">
                <Button  variant="outline-info" onClick={handleBuyNow}>THÊM VÀO GIỎ HÀNG</Button>
                </Col>
                <Col md="5">
                <Button className="w-100 add-to-wishlist" variant="outline-danger">THÊM VÀO YÊU THÍCH</Button>
                </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
          <Card className="p-3 mt-3">
            <Card.Body>
              <Card.Title as="h4" className="text-danger">
                YÊN TÂM MUA SẮM TẠI EEShop
              </Card.Title>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                  <img src="https://img.icons8.com/emoji/48/000000/star-emoji.png" alt="star" style={{ width: '20px', marginRight: '8px' }} />
                  Chất lượng sản phẩm là hàng đầu
                </li>
                <li>
                  <img src="https://img.icons8.com/emoji/48/000000/star-emoji.png" alt="star" style={{ width: '20px', marginRight: '8px' }} />
                  Dùng test máy 15 ngày đầu lỗi 1 đổi 1
                </li>
                <li>
                  <img src="https://img.icons8.com/emoji/48/000000/star-emoji.png" alt="star" style={{ width: '20px', marginRight: '8px' }} />
                  Hỗ trợ và hậu mãi sau bán hàng tốt nhất
                </li>
                <li>
                  <img src="https://img.icons8.com/emoji/48/000000/star-emoji.png" alt="star" style={{ width: '20px', marginRight: '8px' }} />
                  Trả góp ưu đãi lãi suất qua thẻ visa
                </li>
                <li>
                  <img src="https://img.icons8.com/emoji/48/000000/star-emoji.png" alt="star" style={{ width: '20px', marginRight: '8px' }} />
                  Giao hàng miễn phí toàn quốc nhanh nhất
                </li>
              </ul>
            </Card.Body>
           <FacebookShareButton
           url={window.location.href}
           quote={product.name}
           hashtag="#EEShop"
           style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#4267B2', // Facebook blue color
        color: '#fff',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'none',
      }}>
           
           <FacebookIcon  size={32} round={true} style={{ marginRight: '10px' }}/>Chia sẻ sản phẩm
           </FacebookShareButton>
          </Card>
        </Col>
        
      </Row>
    </Container>
        <Container style={{ maxWidth: '700px', marginLeft: '20px', paddingLeft: '15px', paddingRight: '15px' }}>
        <div className="details">
            <h3>Thông tin sản phẩm</h3>
            <div dangerouslySetInnerHTML={{ __html: product.description}} className="product-description" />
            <style>
        {`
          .product-description table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          .product-description td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
          }

          .product-description th {
            background-color: #f4f4f4;
            font-weight: bold;
            padding: 10px;
          }

          .product-description tr:nth-child(even) {
            background-color: #f9f9f9;
          }

          .product-description tr:hover {
            background-color: #f1f1f1;
          }
        `}
      </style>
          </div>
        
        <h5 className="mt-5">Đánh giá của khách hàng</h5>  
          <ModalComment show={showModal} handleClose={handleCloseModal }  />
          {comments.map((item, index) =>
            <UserComment key={index} props={item} />)
          }
        </Container>
     
   </>
  )
};
const styles = {
  priceWrapper: {
    display: 'flex',
    alignItems: 'center',  // Căn chỉnh theo chiều dọc nếu cần
  },
  price: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
  },
  oldPrice: {
    fontSize: '18px',
    textDecoration: 'line-through',
    color: '#6c757d',
  },
  discountPrice: {
    fontSize: '18px',
   
    color: '#dc3545',
  },
  discountPercentage: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#dc3545',
  }
};
export default ProductPage;