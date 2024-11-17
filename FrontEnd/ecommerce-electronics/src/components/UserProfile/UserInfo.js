import React, { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext"; // Import context
import { toast } from "react-toastify"; // Import toast

const UserInfo = () => {
  const { state, dispatch } = useUserContext(); // Access state and dispatch from context
  const [userData, setUserData] = useState(state.userInfo); // local state to manage the form

  // Toggle edit mode
  const handleEdit = () => {
    dispatch({ type: "TOGGLE_EDIT_MODE" });
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit (update user information)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_USER_INFO", payload: userData });
    toast.success("Cập nhật thông tin thành công!"); // Show success toast
  };

  useEffect(() => {
    // Sync form data with context
    setUserData(state.userInfo);
  }, [state.userInfo]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5>Thông tin cá nhân</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><strong>Họ và Tên:</strong></label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={userData.name}
              onChange={handleChange}
              disabled={!state.isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label"><strong>Email:</strong></label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={userData.email}
              onChange={handleChange}
              disabled={!state.isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label"><strong>Số điện thoại:</strong></label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={userData.phone}
              onChange={handleChange}
              disabled={!state.isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label"><strong>Ngày sinh:</strong></label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              value={userData.dateOfBirth}
              onChange={handleChange}
              disabled={!state.isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label"><strong>Giới tính:</strong></label>
            <select
              name="gender"
              className="form-control"
              value={userData.gender}
              onChange={handleChange}
              disabled={!state.isEditing}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label"><strong>Địa chỉ:</strong></label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={userData.address}
              onChange={handleChange}
              disabled={!state.isEditing}
            />
          </div>
          <div className="d-flex justify-content-center gap-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={!state.isEditing}
            >
              Cập nhật
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleEdit}
            >
              {state.isEditing ? "Hủy" : "Chỉnh sửa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
