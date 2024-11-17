import React, { useState, useEffect } from 'react';

const DiscountModal = ({ showModal, currentCoupon, handleInputChange, handleSave, handleClose }) => {
  const [coupon, setCoupon] = useState(currentCoupon);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!currentCoupon.id) {
      setCoupon({ name: '', code: '', discount: '', startDate: '', endDate: '' }); // Reset the form for a new coupon
      setErrors({}); // Clear errors when opening the modal for a new coupon
    } else {
      setCoupon(currentCoupon);
    }
  }, [currentCoupon]);

  // Handle input change for fields
  const handleFieldChange = (e) => {
    handleInputChange(e, setCoupon);
  };

  // Validate the form fields
  const validateForm = () => {
    const errors = {};
    if (!coupon.name) {
      errors.name = 'Tên mã giảm giá là bắt buộc';
    }
    if (!coupon.code) {
      errors.code = 'Mã giảm giá là bắt buộc';
    }
    if (!coupon.discount || coupon.discount <= 0 || coupon.discount > 100) {
      errors.discount = 'Giảm giá phải từ 0 -> 100';
    }
    if (!coupon.startDate) {
      errors.startDate = 'Ngày bắt đầu là bắt buộc';
    }
    if (!coupon.endDate) {
      errors.endDate = 'Ngày kết thúc là bắt buộc';
    } else if (new Date(coupon.endDate) < new Date(coupon.startDate)) {
      errors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; // If no errors, return true
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      handleSave(coupon); // Only save if validation passes
    }
  };

  const handleModalClose = () => {
    handleClose(); // Close the modal
  };

  if (!showModal) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" style={{ transform: 'translateY(-1%)' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{coupon.id ? 'Cập nhật mã giảm giá' : 'Thêm mã giảm giá'}</h5>
            <button type="button" className="btn-close" onClick={handleModalClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-2">
                <label className="form-label">Tên mã giảm giá:</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={coupon.name}
                  onChange={handleFieldChange}
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-2">
                <label className="form-label">Mã:</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${errors.code ? 'is-invalid' : ''}`}
                  name="code"
                  value={coupon.code}
                  onChange={handleFieldChange}
                  required
                />
                {errors.code && <div className="invalid-feedback">{errors.code}</div>}
              </div>

              <div className="mb-2">
                <label className="form-label">Giảm giá:</label>
                <input
                  type="number"
                  className={`form-control form-control-sm ${errors.discount ? 'is-invalid' : ''}`}
                  name="discount"
                  value={coupon.discount}
                  onChange={handleFieldChange}
                  required
                />
                {errors.discount && <div className="invalid-feedback">{errors.discount}</div>}
              </div>

              <div className="mb-2">
                <label className="form-label">Ngày bắt đầu:</label>
                <input
                  type="date"
                  className={`form-control form-control-sm ${errors.startDate ? 'is-invalid' : ''}`}
                  name="startDate"
                  value={coupon.startDate}
                  onChange={handleFieldChange}
                  required
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
              </div>

              <div className="mb-2">
                <label className="form-label">Ngày kết thúc:</label>
                <input
                  type="date"
                  className={`form-control form-control-sm ${errors.endDate ? 'is-invalid' : ''}`}
                  name="endDate"
                  value={coupon.endDate}
                  onChange={handleFieldChange}
                  required
                />
                {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary btn-sm" onClick={handleModalClose}>
              Hủy
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmit}
            >
              {coupon.id ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
