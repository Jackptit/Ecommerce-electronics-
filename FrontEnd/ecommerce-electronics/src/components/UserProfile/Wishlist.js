import React from "react";

const Wishlist = () => {
  const products = [
    {
      id: 1,
      name: "Sản phẩm 1",
      description: "Mô tả sản phẩm 1",
      price: "500,000 VND",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/314210/oppo-reno-11-pro-trang-thumb-600x600.jpg",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      description: "Mô tả sản phẩm 2",
      price: "1,200,000 VND",
      image:
        "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/329858/asus-x1504za-i5-nj1608w-thumb-638621785794788808-600x600.jpg",
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      description: "Mô tả sản phẩm 3",
      price: "750,000 VND",
      image:
        "https://cdn.tgdd.vn/Products/Images/522/326643/lenovo-tab-m11-grey-thumb-600x600.jpg",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      description: "Mô tả sản phẩm 4",
      price: "950,000 VND",
      image:
        "https://cdn.tgdd.vn/Products/Images/7264/279658/mvw-ml068-01-nam-thumb-fix-600x600.jpg",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      description: "Mô tả sản phẩm 4",
      price: "950,000 VND",
      image:
        "https://cdn.tgdd.vn/Products/Images/44/308697/msi-gaming-gf63-thin-12ve-i5-460vn-thumb-600x600.png",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      description: "Mô tả sản phẩm 4",
      price: "950,000 VND",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/314210/oppo-reno-11-pro-trang-thumb-600x600.jpg",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      description: "Mô tả sản phẩm 4",
      price: "950,000 VND",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/314210/oppo-reno-11-pro-trang-thumb-600x600.jpg",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      description: "Mô tả sản phẩm 4",
      price: "950,000 VND",
      image:
        "https://cdn.tgdd.vn/Products/Images/42/314210/oppo-reno-11-pro-trang-thumb-600x600.jpg",
    },
  ];

  return (
    <div className="container wishlist">
      <h2 className="my-4">Sản phẩm yêu thích</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text text-success">{product.price}</p>
                <button className="btn btn-primary">Thêm vào giỏ</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
