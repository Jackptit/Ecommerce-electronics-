import React from "react";
import styled from "styled-components";
import ProductImage from "../components/ProductImage";
const ProductPage = () => {
  const product = {
    name: "Màn hình LCD Xiaomi G27i EU ELA5375EU 27 inch (1920x1080/ IPS/ 165Hz/ 1ms)",
    brand: "Xiaomi",
    price: "3.390.000₫",
    images: [{ url: "https://lh3.googleusercontent.com/KGkAbtWwoyPn6hccimhAO97T6lLYZ7N443dopw168t3dQh0F4ehNjShwp30yT2kkuzYyjg0Dl1tWM24PuJ6mvEBxSVj7V11mEQ=w500-rw" },
    { url: "https://lh3.googleusercontent.com/LQ7j2DGWxxWBid5Wa8wgTwvBm6-lrEohkkO04KddNN_xInu-UyJFHrR333RRzG_Yz2AYnBuj-CTkeQIvN84WTo7B2BqlnBGQIQ=w1000-rw" },
    { url: "https://lh3.googleusercontent.com/5ijB67P2B9lthaSkgLqThcZNz5ty3ULb-9f7_3EfKW8rsBZEE9MD7V7nt2zMXuRhXLU1b6ZIulKD_bZYZ2rvRE_0D9qvQZAY=w1000-rw" },
    { url: "https://lh3.googleusercontent.com/4_qheypokfuW3GuRtiNUf31K-YhhlUbFSf7DyQykYplYVUzuBpOPYR8TJ0unAy9hWxdpeo_8Lg9eT6POr_qdq2unu0Rllydg=w1000-rw" }
    ],
    detail: `-Kích thước: 27" (1920 x 1080), Tỷ lệ 16:9
                - Tấm nền IPS, Góc nhìn: 178 (H) / 178 (V)
                - Tần số quét: 165Hz , Thời gian phản hồi 1 ms
                - HIển thị màu sắc: 16.7 triệu màu
                - Cổng hình ảnh: 1 x DisplayPort, 1 x HDMI 2.0`,
  }
  return (
    <Wrapper>
      <div className="product-center">
        <ProductImage images={product.images} />
        <section className="content">
          <h2>{product.name}</h2>
          <h5>Thương hiệu: {product.brand}</h5>
          <div className="price">
            <p>{product.price}</p>
          </div>
          <div className="buttons">
            <button className="btn add-to-cart">THÊM VÀO GIỎ HÀNG</button>
          </div>
          <div className="details">
            <h3>Thông tin sản phẩm</h3>
            <p>{product.detail}</p>
          </div>
        </section>
      </div>
    </Wrapper>
  )
};
const Wrapper = styled.section`
  padding: 2rem;
  display: flex;
  justify-content: center;

  .product-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .content {
    margin-top: 2rem;
    h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    h5 {
      font-size: 16px;
      color: #555;
      margin-bottom: 10px;
    }

    .price {
      margin-bottom: 20px;
    }

    .buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 20px;

      .btn {
        padding: 10px 20px;
        border: none;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
      }


      .add-to-cart {
        background-color: #fff;
        color: blue;
        border: 1px solid blue;
      }

      .btn:hover {
        opacity: 0.8;
      }
    }

    .details {
      h3 {
        margin-bottom: 10px;
        font-size: 18px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 8px;
          font-size: 14px;
          color: #444;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .product-center {
      grid-template-columns: 1fr;
    }

    .content {
      padding: 1rem;
    }
  }
`;
export default ProductPage;