import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../utils/commonFunction";
import { useUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";

const Wishlist = () => {
  const token = getAccessToken();
  const { userState, dispatch, updateUser } = useUserContext();
  const [userData, setUserData] = useState(userState?.user);
  const [favouriteProducts, setFavouriteProduct] = useState([]);

  useEffect(() => {
    // Update userData if state.user changes
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user]);

  useEffect(() => {
    if (userState.user) {
      setUserData(userState.user);
    }
    const getAllFavouriteProduct = async () => {
      const favouriteProductIDs = userData?.favourite
        .toString()
        .split(",")
        .map(Number);
      const products = await axios.get("http://localhost:8080/api/product");
      console.log(products);
      const favouriteProducts = products.data.filter((product) =>
        favouriteProductIDs?.includes(product.id)
      );
      setFavouriteProduct(favouriteProducts);
    };
    getAllFavouriteProduct();
  }, [userState.user]);

  // if (userState.loading) {
  //   return <p>Loading user data...</p>;
  // }

  // if (userState.error) {
  //   return <p>Error: {userState.error}</p>;
  // }

  // if (!userState.user) {
  //   return <p>No user data found.</p>;
  // }

  const handleRemove = async (favouriteProductID) => {
    try {
      const newFavouriteIds = userState?.user.favourite
        .split(",")
        .filter((item) => Number(item) !== favouriteProductID)
        .join(",");

      const response = await updateUser({favourite: newFavouriteIds});
     
      if(response.status === 200){
        dispatch({ type: "UPDATE_USER_INFO", payload: response.data });
        setUserData(response.data);
        toast.success('Xóa sản phẩm yêu thích thành công !');
      }
      //
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra vui long thử lại sau !')
    }
  };

  return (
    <div className="container wishlist">
      <h2 className="my-4">Sản phẩm yêu thích</h2>
      <div className="row">
        {favouriteProducts.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card position-relative">
              {/* Nút Remove */}
              <button
                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                onClick={() => handleRemove(product.id)}
              >
                ✕
              </button>
              <img
                src={product.image.split(",")[1]}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.name}
                </h5>
                <p className="card-text text-success">
                  {product.price.toLocaleString("vi-VN")} ₫
                </p>
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
