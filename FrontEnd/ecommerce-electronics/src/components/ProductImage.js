import React from "react";
import styled from "styled-components";

function ProductImage({ images  }) {
  const imagess=images.slice(0,-1);
  const [image, setImage] = React.useState(imagess[0]);
  const [fade, setFade] = React.useState(false);
  const handleImageChange = (newImage) => {
    setFade(true); // Kích hoạt hiệu ứng mờ
    setTimeout(() => {
      setImage(newImage);
      setFade(false); // Tắt hiệu ứng mờ sau khi thay đổi
    }, 300); // Khớp với thời gian của `transition`
  };
  return (
    <div>
      <ImageWrapper>
        <img src={image} alt="Product" style={{ opacity: fade ? 0.3 : 1 }} />
      </ImageWrapper>
      <ThumbnailWrapper>
        {imagess.map((image, index) => {    
          return (
            <Thumbnail
              src={image}
              key={index}
              alt="Thumbnail"
              onClick={() => handleImageChange(image)} />
          )
        })}
      </ThumbnailWrapper>
    </div>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  img {
    width: 200%;
    max-height: 400px;
    object-fit: contain;
    transition: opacity 0.3s ease-in-out;
  }
`;

// const Image = styled.img`
//   max-width: 100%;
//   height: auto;
//   border: 1px solid #ddd;
// `;

const ThumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  overflow-x: auto;
  max-width: 100%;
  &::-webkit-scrollbar {
    height: 8px; /* Độ cao của thanh cuộn */
    background-color: transparent; /* Làm thanh cuộn trong suốt */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Màu của thanh cuộn */
    border-radius: 5px; /* Bo góc */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #888; /* Màu khi hover */
  }
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 5px;
  padding: 0;
  cursor: pointer;
  border: ${({ isActive }) => (isActive ? '2px solid blue' : '1px solid #ddd')};
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    border: 2px solid blue;
  }
`;
export default ProductImage;