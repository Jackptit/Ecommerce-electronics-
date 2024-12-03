import React, { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext"; // Import context
import { toast } from "react-toastify"; // Import toast
import formatDate from "../../utils/dateFormat";

const UserInfo = () => {
  const { userState, dispatch, updateUser } = useUserContext();
  const [userData, setUserData] = useState(userState?.user);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    // Update userData if state.user changes
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user]);

  if (userState.loading) {
    return <p>Loading user data...</p>;
  }

  if (userState.error) {
    return <p>Error: {userState.error}</p>;
  }

  if (!userState.user) {
    return <p>No user data found.</p>;
  }

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const genderValue = value === "Nam" ? 1 : value === "Nữ" ? 2 : 3;

    setUserData((prevData) => ({
      ...prevData,
      [name]: name === "gender" ? genderValue : value,
    }));
  };

  // Handle submit (update user information)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateUser(userData);
      if (result.status == 200) {
        toast.success("Cập nhật thông tin thành công!");
      } else {
        toast.error("Cập nhật thông tin thất bại!");
      }
      setIsEditing(false);
    } catch (error) {
      setIsEditing(false);
      console.error("Unexpected error:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5>Thông tin cá nhân</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Họ và Tên:</strong>
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={userData?.username || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={userData?.email || ""}
              onChange={handleChange}
              disabled={true}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Số điện thoại:</strong>
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={userData?.phone || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Ngày sinh:</strong>
            </label>
            <input
              type="date"
              name="birthday"
              className="form-control"
              value={formatDate(userData?.birthday) || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <strong>Giới tính:</strong>
            </label>
            <select
              name="gender"
              className="form-control"
              value={
                userData?.gender === 1
                  ? "Nam"
                  : userData?.gender === 2
                  ? "Nữ"
                  : userData?.gender === 3
                  ? "Khác"
                  : ""
              }
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          {/* <div className="mb-3">
            <label className="form-label"><strong>Địa chỉ:</strong></label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={userData?.address || ""}
              onChange={handleChange}
              disabled={!state.isEditing}
            />
          </div> */}
          <div className="d-flex justify-content-center gap-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={!isEditing}
            >
              Cập nhật
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleEdit}
            >
              {"Chỉnh sửa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
