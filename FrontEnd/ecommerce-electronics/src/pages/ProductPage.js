import React, { useEffect } from "react";
import styled from "styled-components";
import ProductImage from "../components/ProductImage";
import UserComment from "../components/UserComment";
import { Container, Button,Row,Col,Card } from "react-bootstrap";
import ModalComment from "../components/ModalComment";
import { useLocation, useParams } from 'react-router-dom';
const ProductPage = () => {
  const list_commnent = [
    {
      avatar: "https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg",
      userName: "Nguyễn Hoàng Nam",
      rating: 4,
      comment: "Sản phẩm như bìu, giá cả hợp lý"
    }
  ]
  const [showModal, setShowModal] = React.useState(false);
  const handleShowModal = () => { setShowModal(true) };
  const handleCloseModal = () => { setShowModal(false) };
  const location = useLocation();
  const product=location.state?.productData;
  const {id} = useParams();
  console.log("đây là id " , id);
  console.log("đây là product",product);
  useEffect(()=>{
    const fetchProducts = async () => {
      
    }
  },[])
  const images=product.image.split(',')
  return (
    <>
     <Container className="my-4">
      <Row>
        <Col md={6}>
          {/* Giả sử ProductImage là một component hiển thị hình ảnh */}
          <ProductImage images={images} />
        </Col>
        <Col md={6}>
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
                <Button  variant="outline-info">THÊM VÀO GIỎ HÀNG</Button>
                </Col>
                <Col md="5">
                <Button className="w-100 add-to-wishlist" variant="outline-danger">THÊM VÀO YÊU THÍCH</Button>
                </Col>
                </Row>
              </div>
            </Card.Body>
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
        
          <Button variant="danger" className="mb-4" onClick={handleShowModal}>
            Đánh giá ngay
          </Button>
          <ModalComment show={showModal} handleClose={handleCloseModal} />
          {list_commnent.map((item, index) =>
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