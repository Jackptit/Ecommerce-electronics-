import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import FeaturedProducts from "../components/FeaturedProducts";
import { useLocation } from "react-router-dom";
const FilterPage =()=>{
    const location = useLocation();
    const [productFilter, setProductFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const { categoryid } = location.state || {};
    const { searchQuery } = location.state || {};
    const filter = {
        idCategory: categoryid,
        keySearch: searchQuery
    }
    
    console.log(filter);
    useEffect(() => {
            fetchProductFilter();
        
    },[categoryid,searchQuery]);
    const fetchProductFilter = async() => {
        try{
            const products = await axios.post(`http://localhost:8080/api/product/filter`,{...filter},{
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("product data o filterPage",products.data);
            setProductFilter(products.data);
        }
        catch(error){
            console.log("Error fetching products:", error.status);
        }
    }
        return (
            <div>
                <FeaturedProducts title={`Co tat ca ${productFilter.length} san pham phu hop`} productList={ productFilter} />
            </div>
        )

}
export default FilterPage;