import React, { useState, useEffect } from "react";
import formatDate from "../../../utils/dateFormat";

const DiscountModal = ({
  showModal,
  currentCoupon,
  handleInputChange,
  handleSave,
  handleClose,
}) => {
  const [coupon, setCoupon] = useState(currentCoupon);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!currentCoupon.id) {
      setCoupon({
        name: "",
        code: "",
        discountPercent: "",
        startTime: "",
        endTime: "",
        quantity: "",
        description: "",
      });
      setErrors({});
    } else {
      setCoupon(currentCoupon);
    }
  }, [currentCoupon]);

  const handleFieldChange = (e) => {
    handleInputChange(e, setCoupon);
  };

  const validateForm = () => {
    const errors = {};
    if (!coupon.name) {
      errors.name = "Tên mã giảm giá là bắt buộc";
    }
    if (!coupon.description) {
      errors.description = "Mô tả mã giảm giá là bắt buộc";
    }
    if (!coupon.code) {
      errors.code = "Mã giảm giá là bắt buộc";
    }
    if (
      !coupon.discountPercent ||
      coupon.discountPercent <= 0 ||
      coupon.discountPercent > 100
    ) {
      errors.discountPercent = "Giảm giá phải từ 0 -> 100";
    }
    if (!coupon.startTime) {
      errors.startTime = "Ngày bắt đầu là bắt buộc";
    }
    if (!coupon.endTime) {
      errors.endTime = "Ngày kết thúc là bắt buộc";
    } else if (new Date(coupon.endTime) < new Date(coupon.startTime)) {
      errors.endTime = "Ngày kết thúc phải sau ngày bắt đầu";
    }
    if (!coupon.quantity || coupon.quantity <= 0) {
      errors.quantity = "Số lượng phải lớn hơn 0";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave(coupon);
    }
  };

  const handleModalClose = () => {
    handleClose();
  };

  if (!showModal) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" style={{ transform: "translateY(-1%)" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {coupon.id ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-2">
                <label className="form-label">Tên mã giảm giá:</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  name="name"
                  value={coupon.name}
                  onChange={handleFieldChange}
                  required
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Mã Code:</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    errors.code ? "is-invalid" : ""
                  }`}
                  name="code"
                  value={coupon.code}
                  onChange={handleFieldChange}
                  required
                />
                {errors.code && (
                  <div className="invalid-feedback">{errors.code}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Giảm giá (%):</label>
                <input
                  type="number"
                  className={`form-control form-control-sm ${
                    errors.discountPercent ? "is-invalid" : ""
                  }`}
                  name="discountPercent"
                  value={coupon.discountPercent}
                  onChange={handleFieldChange}
                  required
                />
                {errors.discountPercent && (
                  <div className="invalid-feedback">
                    {errors.discountPercent}
                  </div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Ngày bắt đầu:</label>
                <input
                  type="date"
                  className={`form-control form-control-sm ${
                    errors.startTime ? "is-invalid" : ""
                  }`}
                  name="startTime"
                  value={formatDate(coupon.startTime)}
                  onChange={handleFieldChange}
                  required
                />
                {errors.startTime && (
                  <div className="invalid-feedback">{errors.startTime}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Ngày kết thúc:</label>
                <input
                  type="date"
                  className={`form-control form-control-sm ${
                    errors.endTime ? "is-invalid" : ""
                  }`}
                  name="endTime"
                  value={formatDate(coupon.endTime)}
                  onChange={handleFieldChange}
                  required
                />
                {errors.endTime && (
                  <div className="invalid-feedback">{errors.endTime}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Số lượng mã giảm giá:</label>
                <input
                  type="number"
                  className={`form-control form-control-sm ${
                    errors.quantity ? "is-invalid" : ""
                  }`}
                  name="quantity"
                  value={coupon.quantity}
                  min="1"
                  onChange={handleFieldChange}
                  required
                />
                {errors.quantity && (
                  <div className="invalid-feedback">{errors.quantity}</div>
                )}
              </div>
              <div className="mb-2">
                <label className="form-label">Mô tả:</label>
                <textarea
                  className={`form-control form-control-sm ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  name="description"
                  value={coupon.description}
                  onChange={handleFieldChange}
                  required
                  rows="5" // Số dòng hiển thị
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
              {coupon.id ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
