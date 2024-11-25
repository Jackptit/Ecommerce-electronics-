import React from 'react';
import Product from './Product';
import styled from 'styled-components';
const FeaturedProducts = ({title,productList}) => {
    return (
        <>
            <Wrapper>
                <div className='section-center'>
                    <h2>{title}</h2>
                    <div className='products'>
                        {productList.map((product) => {
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
    margin-bottom: 40px;
   
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