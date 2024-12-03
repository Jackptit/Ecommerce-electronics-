import React from "react";
import styled from "styled-components";

function ProductImage({ images  }) {
  const [image, setImage] = React.useState(images[0]);
  return (
    <div>
      <ImageWrapper>
        <img src={image} alt="Product" />
      </ImageWrapper>
      <ThumbnailWrapper>
        {images.map((image, index) => {    
          return (
            <Thumbnail
              src={image}
              key={index}
              alt="Thumbnail"
              onClick={() => setImage(image)} />
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
    width: 100%;
    max-height: 300px;
    object-fit: contain;
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
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid #ddd;
  &:hover {
    border: 1px solid blue;
  }
`;
export default ProductImage;