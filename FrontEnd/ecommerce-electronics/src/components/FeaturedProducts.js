import React from 'react';
import Product from './Product';
import styled from 'styled-components';
import { Dropdown,Row,Col,Button, Container } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { FaFilter, FaSlidersH } from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';
//có bug vì chỉ lọc được các danh sách hiển thị trong 1 trang
const FeaturedProducts = ({title,productList}) => {
    const [products, setProducts] = useState(productList);
    console.log("day la products", productList)
    console.log( products)
    const [priceRange, setPriceRange] = useState([0, 9400000]);
    const [sortOption, setSortOption] = useState("");
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
      };
  // Handle range slider
  const handleRangeChange = (values) => {
    setPriceRange(values);
  };
  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    // Thực hiện xử lý dữ liệu sắp xếp tại đây
    console.log("Sort by:", option);
  };
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "low-high") {
      handleSort("price-asc");
    } else if (selectedValue === "high-low") {
      handleSort("price-desc");
    }
  };
  useEffect(() => {
    let updatedList =productList 
      .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

    if (sortOption === "price-asc") {
      updatedList = updatedList.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      updatedList = updatedList.sort((a, b) => b.price - a.price);
    }

    setProducts(updatedList);
  }, [priceRange, sortOption, productList]);
    return (
        <>
            <Wrapper>
                <div className='section-center'>
                    <h2>{title}</h2>
                    {/* Price Filter */}
                <Container style={{marginBottom:"20px"}}>
               
                <button onClick={toggleFilterVisibility} style={{ display: "flex", alignItems: "center" }}>
                    {/* Biểu tượng FaFilter */}
                    <FaFilter style={{ marginRight: "8px" }} /> Lọc
               
                </button>
                {isFilterVisible && (
                    <div style={{ marginTop: '20px', position: 'relative', width: '80%', margin: 'auto' }}>
                        <label>Chọn mức giá phù hợp với bạn:</label>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => handleRangeChange([Number(e.target.value), priceRange[1]])}
                            style={{
                                width: '120px',
                                marginRight: '10px',
                                textAlign: 'center',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                padding: '10px',
                            }}
                            />
                             
                                <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => handleRangeChange([priceRange[0], Number(e.target.value)])}
                                style={{
                                    width: '120px',
                                    marginLeft: '10px',
                                    textAlign: 'center',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                }}
                                />
                        </div>
                         {/* Dropdown select để chọn giá */}
                            <select
                            onChange={handleSelectChange}
                            style={{
                                width: '200px',
                                marginRight: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                padding: '10px',
                                marginTop: "10px"
                            }}
                            >
                            <option value="">Chọn cách sắp xếp</option>
                            <option value="low-high">Cao đến thấp</option>
                            <option value="high-low">Thấp đến cao</option>
                            </select>
                        </div>
                )}
                
                </Container>
                    <div className='products'>
                        {products.length ? products.map((product) => {
                            return <Product key={product.id} {...product} /> })
                            :productList.map((product) => {
                            return <Product key={product.id} {...product} />;
                        }) 
                        }
                        {console.log(products.length)}
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