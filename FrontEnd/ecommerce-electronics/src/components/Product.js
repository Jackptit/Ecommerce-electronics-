import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Product = (product) => {
    return (
        <>
            <ProductWrapper>
                <div className="container">
                    <img src={product.image} alt={product.name} />
                    <Link to={`/product/${product.id}`} className='link '></Link>

                    <span className='w-tag'>Phone</span>
                    <footer>
                        <h3 className='w-name'>{product.name}</h3>
                        <p className='w-price'>{product.price}</p>
                        <button className='buy-now'>Mua Ngay</button>
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
    .link {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--clr-primary-5);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        transition: var(--transition);
        opacity: 0;
        cursor: pointer;
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
        justify-content:center;
        background-color: #f0f0f0; /* Màu xám nhạt */
        font-style: italic; /* Kiểu chữ in nghiêng */
        font-size: 0.8rem; 
    }
    .w-name {

    }
    .w-price {
        color: red; /* Chữ màu đỏ */
        font-weight: bold;
    }
    .buy-now {
        background-color: #70d6f4; /* Màu nền xanh dương */
        color: white; /* Màu chữ trắng */
        border: none; /* Không viền */
        padding: 10px 20px; /* Đệm trên dưới 10px, trái phải 20px */
        font-size: 1rem; /* Cỡ chữ */
        cursor: pointer; /* Con trỏ chuột khi di chuyển vào button */
        border-radius: 5px; /* Bo tròn góc */
        transition: background-color 0.3s ease; /* Hiệu ứng chuyển màu nền */
        display: block; /* Đặt button thành block để margin:auto có tác dụng */
    margin: 20px auto; /* Căn giữa button trên trục ngang */
    }

    .buy-now:hover {
        background-color: #0056b3; /* Màu nền khi hover */
    }
`;
export default Product;