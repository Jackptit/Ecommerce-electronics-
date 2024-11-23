import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Sliding from "../assets/Sliding-airpod-4.webp";
import Headphone from "../assets/tai-nghe-sony-wf-c510-home.webp";
import Phone from "../assets/tecno-spark-go-1-home.webp";
import FeaturedProducts from "../components/FeaturedProducts";
import { useReducer, useState } from "react";


const Home = () => {
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <Wrapper>
        <SliderWrapper>
          <Slider {...settings}>
            <div className="img-slick">
              <img src={Sliding} alt="Sliding" />
            </div>
            <div className="img-slick">
              <img src={Headphone} alt="Headphone" />
            </div>
            <div className="img-slick">
              <img src={Phone} alt="Phone" />
            </div>
          </Slider>
        </SliderWrapper>
        <FeaturedProducts />
        <FeaturedProducts />
      </Wrapper>
    </>
  );
};
const SliderWrapper = styled.div`
  margin-top: 20px;
  max-width: 80%; // Giới hạn chiều rộng tối đa của slider
  margin-left: auto; // Căn giữa slider
  margin-right: auto; // Căn giữa slider
  padding: 0 10%;
  max-height: 200px; // Giới hạn chiều cao tối đa của slider
  .img-slick img {
    width: 100%; // Đảm bảo ảnh chiếm toàn bộ chiều rộng của container
    height: auto; // Giữ tỷ lệ nguyên vẹn của ảnh
    object-fit: cover; // Đảm bảo ảnh che phủ toàn bộ không gian mà không làm thay đổi tỷ lệ
  }
`;
const Wrapper = styled.div`
  background-color: #f6f5fa;
  width: 100%;
  min-height: 200vh;
`;
export default Home;
