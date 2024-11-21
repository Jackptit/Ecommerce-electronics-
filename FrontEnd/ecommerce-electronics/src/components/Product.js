import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../contexts/Cart_Context';
import { ToastContainer, toast } from 'react-toastify';
const Product = (product) => {
    const { addToCart, countCartTotals } = useCartContext();
    const handleBuyNow = () => {
        // Gọi hàm addToCart (thêm sản phẩm vào giỏ hàng)
        addToCart(product);
        countCartTotals();

        // Hiển thị thông báo toast
        toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
    };
    return (
        <>
            <ProductWrapper>
                <div className="container">
                    <Link to={`/product/${product.id}`} className='link'>
                        <img src={product.image} alt={product.name} />
                    </Link>
                    <span className='w-tag'>Phone</span>
                    <span className='w-tag'>256gb</span>
                    <footer>
                        <Link to={`/product/${product.id}`} className='link'>
                            <p className='w-name' style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>{product.name}</p>
                        </Link>
                        <p className='w-price'>{product.price}</p>
                        <button className='buy-now' onClick={handleBuyNow}>Thêm vào giỏ hàng</button>

                    </footer>
                </div>
            </ProductWrapper>

        </>
    );
}
const ProductWrapper = styled.article`
    
    .container {
        border: 0.5px solid #f5f5f5;
        width: 200px;
        background-color: white;
        position: relative;
        margin-top:10px;
    }
    img {
        width: calc(90% - 20px); /* Giả sử muốn có 20px khoảng cách giữa các sản phẩm */
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
    .w-tag{
        display:flex;
        text-align:center;
        width: max-content;
        justify-content:center;
        background-color: #f0f0f0; /* Màu xám nhạt */
        font-style: italic; /* Kiểu chữ in nghiêng */
        font-size: 0.8rem; 
        margin: 0.5rem ; /* Căn giữa theo chiều ngang */
    }
    .w-name {
        opacity: 1; /* Đảm bảo .w-name luôn hiển thị */
        margin-bottom: 0.5rem; /* Đệm dưới 0.5rem */
        font-size: 0.8rem; 
       
    }
    .w-name:hover + .link{
        opacity: 1;
        
    }
    .w-price {
        color: red; /* Chữ màu đỏ */
        font-weight: bold;
        /* Đệm trên 0.5rem */
    }
    .buy-now {
        background-color: #70d6f4; /* Màu nền xanh dương */
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
        background-color: rgba(0, 248, 147, 0.44); /* Màu nền khi hover */
    }
`;
export default Product;