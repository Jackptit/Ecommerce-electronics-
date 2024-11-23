import { useState, useEffect } from "react";
const AddAddressModal = ({ show, onClose, onSave, address }) => {
  const [formData, setFormData] = useState({
    province: address ? address.province : "",
    district: address ? address.district : "",
    ward: address ? address.ward : "",
    specificAddress: address ? address.specificAddress : "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData({
        province: address.province,
        district: address.district,
        ward: address.ward,
        specificAddress: address.specificAddress,
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.province) newErrors.province = "Tỉnh không được để trống!";
    if (!formData.district) newErrors.district = "Huyện không được để trống!";
    if (!formData.ward) newErrors.ward = "Xã không được để trống!";
    if (!formData.specificAddress)
      newErrors.specificAddress = "Số nhà/tên đường không được để trống!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData); // Pass the form data to the save handler (add or update)
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {address ? "Sửa địa chỉ" : "Thêm địa chỉ"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label>Tỉnh:</label>
              <input
                type="text"
                className={`form-control ${
                  errors.province ? "is-invalid" : ""
                }`}
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
              {errors.province && (
                <div className="invalid-feedback">{errors.province}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Huyện:</label>
              <input
                type="text"
                className={`form-control ${
                  errors.district ? "is-invalid" : ""
                }`}
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
              {errors.district && (
                <div className="invalid-feedback">{errors.district}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Xã:</label>
              <input
                type="text"
                className={`form-control ${errors.ward ? "is-invalid" : ""}`}
                name="ward"
                value={formData.ward}
                onChange={handleChange}
              />
              {errors.ward && (
                <div className="invalid-feedback">{errors.ward}</div>
              )}
            </div>
            <div className="mb-3">
              <label>Số nhà/Tên đường:</label>
              <input
                type="text"
                className={`form-control ${
                  errors.specificAddress ? "is-invalid" : ""
                }`}
                name="specificAddress"
                value={formData.specificAddress}
                onChange={handleChange}
              />
              {errors.specificAddress && (
                <div className="invalid-feedback">{errors.specificAddress}</div>
              )}
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              style={{width: '200px'}}
              onClick={handleClose}
              
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{width: '200px'}}
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
