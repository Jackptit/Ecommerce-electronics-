import React, { useState, useEffect } from "react";

const ProductModal = ({
  showModal,
  currentProduct,
  handleSave,
  handleClose,
  categories, // Danh sách các danh mục
}) => {
  const [product, setProduct] = useState("");
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState(null);

  // Khởi tạo dữ liệu sản phẩm khi nhận `currentProduct`
  useEffect(() => {
    if (currentProduct?.id) {
      setProduct(currentProduct);
      setImagePreview(currentProduct.image.split(",")[0] || "");
    } else {
      setProduct({
        image: "",
        id: "",
        name: "",
        category: "",
        price: "",
        quantity: "",
        description:"",
      });
      setImagePreview("/assets/default2.png");
    }
    setErrors({});
  }, [currentProduct]);

  // Xử lý thay đổi input
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedCategory = categories.find(
        (cat) => cat.id === parseInt(value, 10)
      );
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: selectedCategory || {}, // Gán đối tượng danh mục đầy đủ
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  // Xử lý upload ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // Hiển thị preview ảnh
      };
      reader.readAsDataURL(file);
    }
  };

  // Kiểm tra form
  const validateForm = () => {
    const errors = {};
    if (!product.name) {
      errors.name = "Tên sản phẩm là bắt buộc";
    }
    if (!product.category) {
      errors.category = "Danh mục là bắt buộc";
    }
    if (!product.price || product.price <= 0) {
      errors.price = "Giá sản phẩm phải lớn hơn 0";
    }
    if (!product.quantity || product.quantity <= 0) {
      errors.quantity = "Số lượng phải lớn hơn 0";
    }
    if (!file) {
      errors.image = "Vui lòng chọn image trước khi thêm";
    }
    if (!product.description) {
      errors.description = "Vui lòng thêm mô tả";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Lưu dữ liệu
  const handleSubmit = async () => {
    if (validateForm()) {
      handleSave(product, file);
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {product.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              {/* Hình ảnh (Upload) */}
              <div className="mb-2">
                <label className="form-label">Hình ảnh:</label>
                <input
                  type="file"
                  className={`form-control form-control-sm ${
                    errors.image ? "is-invalid" : ""
                  }`}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}
                {imagePreview && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* ID sản phẩm (Readonly) */}
              {product.id && (
                <div className="mb-2">
                  <label className="form-label">ID sản phẩm:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={product.id}
                    readOnly
                  />
                </div>
              )}

              {/* Tên sản phẩm */}
              <div className="mb-2">
                <label className="form-label">Tên sản phẩm:</label>
                <textarea
                  className={`form-control form-control-sm ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  name="name"
                  value={product.name}
                  onChange={handleFieldChange}
                  required
                  rows="3"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* Các input dài nằm 1 hàng ngang */}
              <div className="d-flex mb-2">
                <div className="flex-fill me-2">
                  <label className="form-label">Giá:</label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    name="price"
                    value={product.price.toLocaleString("vi-VN")} // Hiển thị giá với dấu phân cách
                    onChange={(e) => {
                      // Loại bỏ dấu phân cách và chuyển đổi lại thành số
                      const formattedPrice = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        price: formattedPrice
                          ? parseInt(formattedPrice, 10)
                          : 0,
                      }));
                    }}
                    required
                  />
                  {errors.price && (
                    <div className="invalid-feedback">{errors.price}</div>
                  )}
                </div>

                <div className="flex-fill ms-2">
                  <label className="form-label">Số lượng:</label>
                  <input
                    type="number"
                    className={`form-control form-control-sm ${
                      errors.quantity ? "is-invalid" : ""
                    }`}
                    name="quantity"
                    value={product.quantity}
                    min="1"
                    onChange={handleFieldChange}
                    required
                  />
                  {errors.quantity && (
                    <div className="invalid-feedback">{errors.quantity}</div>
                  )}
                </div>
              </div>

              {/* Danh mục (Dropdown) */}
              <div className="mb-2">
                <label className="form-label">Danh mục:</label>
                <select
                  className={`form-control form-control-sm ${
                    errors.category ? "is-invalid" : ""
                  }`}
                  name="category"
                  value={product.category?.id || ""}
                  onChange={(e) => {
                    const selectedCategory = categories.find(
                      (cat) => cat.id === parseInt(e.target.value, 10)
                    );
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      category: selectedCategory || {},
                      idCategory:
                        selectedCategory === undefined ||
                        selectedCategory === null
                          ? prevProduct.idCategory
                          : selectedCategory.id,
                    }));
                  }}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="invalid-feedback">{errors.category}</div>
                )}
              </div>

              {/* Mô tả sản phẩm */}
             <div className="mb-2">
                <label className="form-label">Mô tả thêm:</label>
                <textarea
                  className={`form-control form-control-sm ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  name="description"
                  value={product.description}
                  onChange={handleFieldChange}
                  required
                  rows="5"
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
              {product.id ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
