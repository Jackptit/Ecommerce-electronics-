// src/components/UserComponentModal.js
import React, { useState, useEffect } from "react";

const UserComponentModal = ({
  showModal,
  handleSave,
  handleClose,
}) => {
  const [user, setUser] = useState({
    image: "",
    phone: "",
    password: "",
    username: "",
    email: "",
    idRole: 1,
    birthday: "",
    gender:0,
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState(null);

  // Khởi tạo dữ liệu người dùng khi nhận `currentUser`
  
  // Xử lý thay đổi input
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    
  };

  // Xử lý upload avatar
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result); // Hiển thị preview ảnh
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Kiểm tra form
  const validateForm = () => {
    const errors = {};

    if (!user.username.trim()) {
      errors.username = "Họ và tên là bắt buộc.";
    }

    if (!user.email.trim()) {
      errors.email = "Email là bắt buộc.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)
    ) {
      errors.email = "Email không hợp lệ.";
    }

    if (!user.phone.trim()) {
      errors.phone = "Số điện thoại là bắt buộc.";
    } else if (!/^\d{10,15}$/.test(user.phone)) {
      errors.phone = "Số điện thoại phải từ 10 đến 15 chữ số.";
    }
      if (!user.password.trim()) {
        errors.password = "Mật khẩu là bắt buộc.";
      } else if (user.password.length < 6) {
        errors.password = "Mật khẩu phải ít nhất 6 ký tự.";
      }
    

    if (!user.birthday) {
      errors.birthday = "Ngày sinh là bắt buộc.";
    }

    if (!user.gender) {
      errors.gender = "Giới tính là bắt buộc.";
    }

    if ( !file) { // Chỉ yêu cầu avatar khi thêm mới
      errors.image = "Vui lòng chọn avatar.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Lưu dữ liệu
  const handleSubmit = async () => {
    console.log("user", user);
    if (validateForm()) {
      handleSave(user, file);
    }
  };

  if (!showModal) return null;
  const handleModalClose = () => {
    handleClose();
  }

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
             Thêm người dùng mới
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              {/* Avatar (Upload) */}
              <div className="mb-3">
                <label className="form-label">Avatar:</label>
                <input
                  type="file"
                  className={`form-control ${
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
                      alt="Avatar Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Họ và tên */}
              <div className="mb-3">
                <label className="form-label">Họ và Tên:</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  name="username"
                  value={user.username}
                  onChange={handleFieldChange}
                  placeholder="Nhập họ và tên"
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  name="email"
                  value={user.email}
                  onChange={handleFieldChange}
                  placeholder="Nhập email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Số điện thoại */}
              <div className="mb-3">
                <label className="form-label">Số điện thoại:</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                  name="phone"
                  value={user.phone}
                  onChange={handleFieldChange}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              {/* Mật khẩu */}
              <div className="mb-3">
                <label className="form-label">Mật khẩu:</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  value={user.password}
                  onChange={handleFieldChange}
                  placeholder={"Nhập mật khẩu"}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              {/* Ngày sinh */}
              <div className="mb-3">
                <label className="form-label">Ngày sinh:</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.birthday ? "is-invalid" : ""
                  }`}
                  name="birthday"
                  value={user.birthday}
                  onChange={handleFieldChange}
                />
                {errors.birthday && (
                  <div className="invalid-feedback">{errors.birthday}</div>
                )}
              </div>

              {/* Giới tính */}
              <div className="mb-3">
                <label className="form-label">Giới tính:</label>
                <select
                  className={`form-select ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                  name="gender"
                  value={user.gender}
                  onChange={handleFieldChange}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="1">Nam</option>
                  <option value="2">Nữ</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Thêm mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponentModal;
