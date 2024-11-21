import React from 'react';
import Product from './Product';
import styled from 'styled-components';
const FeaturedProducts = () => {
    const products = [
        {
            id: 1,
            name: 'Samsung Galaxy S21',
            price: 99999,
            quantity: 12,
            image: 'https://cdn.tgdd.vn/Products/Images/42/309831/xiaomi-redmi-note-13-gold-thumb-600x600.jpg'
        },
        {
            id: 2,
            name: 'Google Pixel 5',
            price: 89999,
            quantity: 12,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329938/xiaomi-14t-grey-thumb-600x600.jpg'
        },
        {
            id: 3,
            name: 'OnePlus 9 Pro',
            price: 109999,
            quantity: 12,
            image: 'https://cdn.tgdd.vn/Products/Images/42/314206/xiaomi-redmi-note-13-green-thumb-600x600.jpg'
        },
        {
            id: 4,
            name: 'iPhone 12 Pro',
            price: 119999,
            quantity: 12,
            image: 'https://cdn.tgdd.vn/Products/Images/42/313889/xiaomi-14-ultra-white-thumbnew-600x600.jpg'
        },
        {
            id: 5,
            name: 'Samsung Galaxy S21',
            price: 99999,
            quantity: 12,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-tu-nhien-thumb-600x600.jpg'
        },
        {
            id: 6,
            name: 'Google Pixel 5',
            price: 89999,
            quantity: 12,
            image: 'https://cdn.tgdd.vn/Products/Images/42/320722/samsung-galaxy-z-flip6-xanh-thumbn-600x600.jpg'
        },
        {
            id: 7,
            name: 'OnePlus 9 Pro',
            price: 109999,
            quantity: 12,
            image: 'https://cdn.tgdd.vn/Products/Images/42/314206/xiaomi-redmi-note-13-green-thumb-600x600.jpg'
        },
        {
            id: 8,
            name: 'iPhone 12 Pro 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            price: 119999,
            quantity: 12,
            image: 'https://cdn.tgdd.vn/Products/Images/42/329008/xiaomi-redmi-14c-blue-1-600x600.jpg'
        }
    ];
    return (
        <>
            <Wrapper>
                <div className='section-center'>
                    <h2>Gợi ý cho bạn</h2>
                    <div className='products'>
                        {products.map((product) => {
                            return <Product key={product.id} {...product} />;
                        })}
                    </div>
                </div>
            </Wrapper>
        </>
    );
}
const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;  
    background-color: white;
    margin-top: 20px;
    border-radius: 20px;
    margin-left: 20px;
    margin-right: 20px;
   
    .section-center{
       
        padding: 2rem;  
    }
    .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: -1rem; /* Điều chỉnh này giúp bù đắp cho margin của từng sản phẩm */
    }

`;
export default FeaturedProducts;