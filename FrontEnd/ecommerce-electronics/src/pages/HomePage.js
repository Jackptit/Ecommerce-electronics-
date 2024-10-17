import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import Sliding from '../assets/Sliding-airpod-4.webp';
import Headphone from '../assets/tai-nghe-sony-wf-c510-home.webp';
import Phone from '../assets/tecno-spark-go-1-home.webp';
import FeaturedProducts from '../components/FeaturedProducts';


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
                        <div className='img-slick'>
                            <img src={Sliding} alt="Sliding" />
                        </div>
                        <div className='img-slick'>
                            <img src={Headphone} alt="Headphone" />
                        </div>
                        <div className='img-slick'>
                            <img src={Phone} alt="Phone" />
                        </div>
                    </Slider>
                </SliderWrapper>
                <FeaturedProducts />
            </Wrapper>
        </>
    )
}
const SliderWrapper = styled.div`
    margin-top: 20px;
   
`;
const Wrapper = styled.div`
    background-color: #f6f5fa;
    width: 100%;
    min-height: 200vh;
`;
export default Home;