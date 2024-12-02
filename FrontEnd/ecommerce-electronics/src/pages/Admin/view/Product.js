import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../../utils/commonFunction";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import ConfirmModal from "../../../components/AdminComponents/Modal/ConfirmModal";
import ProductModal from "../../../components/AdminComponents/Modal/ProductModal";
import ReactLoading from "react-loading";

const ProductManagement = () => {
  const navigate = useNavigate();
  const token = getAccessToken();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const products = await axios.get("http://localhost:8080/api/product", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const categories = await axios.get("http://localhost:8080/api/category", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(products.data);
      setCategories(categories.data);
    } catch (error) {
      console.log("Error fetching products:", error.status);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(currentProduct, 0);
    setShowConfirm(false);
  };

  const deleteProduct = async (product) => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/product/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //update state
      const updatedProducts = products.filter((item) => item !== product);

      setProducts(updatedProducts);
      toast.success("Xóa sản phẩm thành công !");
    } catch (error) {
      console.log("Error update coupon:", error);
      toast.error("Đã có lỗi xảy ra vui lòng thử lại sau !");
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const updateProduct = async (product, file) => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      setLoading(true);
      //upload image
      const formData = new FormData();
      formData.append("file", file); // Thêm ảnh vào formData
      formData.append("upload_preset", "assets_project3"); // Upload preset của bạn
      formData.append("folder", "assets"); // Chỉ định thư mục "assets" trên Cloudinary

      const cloudinaryData = await fetch(
        `https://api.cloudinary.com/v1_1/dwrd1yxgh/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await cloudinaryData.json();
      const newProd = {
        ...product,
        image:
          data.secure_url.replace("https://", "//").concat(",") + product.image,
      };

      console.log(newProd)
      const response = await axios.put(
        "http://localhost:8080/api/product",
        newProd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //update state
      const updatedProducts = products.map((item) =>
        item.id === newProd.id ? newProd : item
      );

      setProducts(updatedProducts);
      setLoading(false);
      toast.success("Cập nhật sản phẩm thành công !");
    } catch (error) {
      setLoading(false);
      console.log("Error update coupon:", error);
      toast.error("Đã có lỗi xảy ra vui lòng thử lại sau !");
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };


  const createProduct = async (product, file) => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      setLoading(true);
      //upload image
      const formData = new FormData();
      formData.append("file", file); // Thêm ảnh vào formData
      formData.append("upload_preset", "assets_project3"); // Upload preset của bạn
      formData.append("folder", "assets"); // Chỉ định thư mục "assets" trên Cloudinary

      const cloudinaryData = await fetch(
        `https://api.cloudinary.com/v1_1/dwrd1yxgh/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await cloudinaryData.json();
      const newProd = {
        ...product,
        image:
          data.secure_url.replace("https://", "//").concat(","),
      };

      // delete newProd.category;
      console.log("product:", newProd)

      const response = await axios.post(
        "http://localhost:8080/api/product",
        {...newProd},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //update state
      const updatedProducts = [...products, response.data];

      setProducts(updatedProducts);
      setLoading(false);
      toast.success("Thêm sản phẩm mới thành công !");
    } catch (error) {
      setLoading(false);
      console.log("Error create product:", error);
      toast.error("Đã có lỗi xảy ra vui lòng thử lại sau !");
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách mã giảm giá theo từ khóa tìm kiếm
  const filteredOrder = products.filter(
    (product) =>
      product.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleSave = async (product, file) => {
    if (product.id) {
      //edit
      await updateProduct(product, file);
    } else {
      //add new
      await createProduct(product, file);
    }
    setShowModal(false);
  };

  const handleClose = () => {
    setCurrentProduct(null);
    setShowModal(false);
  };

  const loadingStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  };

  return (
    <div className="container mt-3">
      {loading && (
        <div style={loadingStyle}>
          <ReactLoading type="spin" color="#00BFFF" height={50} width={50} />
        </div>
      )}
      {/* Tiêu đề Danh sách mã giảm giá và các thành phần trên */}
      <h2 className="h4">Danh sách sản phẩm</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "250px" }}
          />
          <i className="fas fa-search ms-2" style={{ fontSize: "16px" }}></i>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleAddNew}
          style={{
            fontSize: "14px",
            backgroundColor: "#007bff", // Màu nền xanh dương
            borderColor: "#007bff", // Đổi màu viền nếu cần
            color: "white",
            width: "120px",
          }}
        >
          + Thêm mới
        </button>
      </div>

      {/* Coupon Table */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Hình ảnh</th>
            <th>Mã SP</th>
            <th>Tên SP</th>
            <th>Loại SP</th>
            <th>Giá bán</th>
            <th>Số lượng còn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrder.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={"https:" + product.image.split(",")[0]}
                  alt={"image"}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>{product.id}</td>
              <td
                style={{
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "400px",
                }}
              >
                {product.name}
              </td>
              <td>{product.category.name}</td>
              <td>{product.price.toLocaleString("vi-VN") + " đ"}</td>
              <td>{product.quantity}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-3"
                  onClick={() => {
                    handleEdit(product);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setCurrentProduct(product);
                    setShowConfirm(true);
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pass Props to Modal */}
      <ProductModal
        showModal={showModal}
        currentProduct={currentProduct}
        //handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleClose={handleClose}
        categories={categories}
      />

      {/* Modal Confirm */}
      <ConfirmModal
        show={showConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleDeleteProduct}
        title="Xác nhận xóa sản phẩm"
        bodyText="Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác."
      />
    </div>
  );
};

export default ProductManagement;
