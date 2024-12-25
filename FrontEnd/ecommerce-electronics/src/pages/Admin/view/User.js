import React from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../../utils/commonFunction";
import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from "react-toastify"; // Import toast
import ReactLoading from "react-loading";
import UserManagerModal from "../../../components/AdminComponents/Modal/UserManagerModal";
import ConfirmModal from "../../../components/AdminComponents/Modal/ConfirmModal";
const User = () => {
const navigate = useNavigate();
const token = getAccessToken();
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [showModal, setShowModal] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
const [currentUser, setCurrentUser] = useState(null)
useEffect(() => {
    
    fetchAllUser();
  }, []);
const fetchAllUser = async() => {
    try{
       
        if(!token){
            navigate("/login");
            return;
        }
        const users = await axios.get("http://localhost:8080/api/user/allUser", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(users.data);
        setUsers(users.data);
    }
    catch(error){
        console.log("Error fetching users:", error.status);
        if(error.status === 401){
            navigate("/login");
        }
    }
}
const deleteUser = async(id) => {
    try{
        if(!token){
            navigate("/login");
            return;
        }
        const response = await axios.delete(`http://localhost:8080/api/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        const UpdateUser= users.filter((item) => item.id !==id);
        setUsers(UpdateUser);
        toast.success(`Đã xóa người dùng có mã ${id} ra khỏi hệ thống !`);
        
    }
    catch(error){
        console.log("Error fetching users:", error.status);
        if(error.status === 401){
            navigate("/login");
        }
    }
}
const createUser =async (user,file) => {
    try{
        if(!token){
            navigate("/login");
            return;
        }
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
        console.log("data nhan duoc tu icloudinary",data)
        const newProd = {
          ...user,
          image:
            data.secure_url.replace("https://", "//"),
        };
        console.log("user can tao",newProd);
        const response = await axios.post(`http://localhost:8080/api/user`,{...newProd}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const updateUsers= [...users,response.data];
        setUsers(updateUsers);
        setLoading(false);
        toast.success(`Đã thêm nhân viên ${user.username} vào hệ thống !`);
        
    }
    catch(error){
        console.log("Error fetching users:", error);
        toast.error("số điện thoại đã được sử dụng");
        if(error.status === 401){
            navigate("/login");
        }
    }
}

const filteredUsers =  users.filter(
    (user) =>(
      user.username.includes(searchTerm))
);

const handleSearch = (e) => {
    setSearchTerm(e.target.value);
}
const handleAddNew = () => {
    setShowModal(true);
  }
const handleClose = () => {
    setCurrentUser(null);
    setShowModal(false);
}
const handleInputChange = (e) => {

}
const handleCloseConfirm = () => {
    setShowConfirm(false);
}
const handleDeleteUser = async() => {
    console.log(currentUser.id);
    await deleteUser(currentUser.id);
    setShowConfirm(false);
}
const handleSave = async(user,file) => {
    console.log(user,file)
    await createUser(user,file);
    setShowModal(false);
}
const loadingStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  };
  
    return (
        <>

            <div className="container mt-3">
            
      {/* Tiêu đề Danh sách mã giảm giá và các thành phần trên */}
      <h2 className="h4">Danh sách người dùng hệ thống</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Tìm kiếm người dùng theo tên..."
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
          + Thêm mới nhân viên
        </button>
      </div>

      {/* Coupon Table */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã người dùng</th>
            <th>Số điện thoại</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Giới tính</th>
            <th>Rank</th>
            <th>Ngày sinh</th>
          </tr>
        </thead>
        <tbody>
        {
            filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.phone}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.gender===1?"Nam":"Nữ"}</td>
              <td>{user.rank}</td>
              <td>{user.birthday}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setCurrentUser(user);
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
      <UserManagerModal
        showModal={showModal}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleClose={handleClose}
      />

      {/* Modal Confirm */}
      <ConfirmModal
        show={showConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleDeleteUser}
        title="Xác nhận xóa"
        bodyText="Bạn có chắc chắn muốn xóa mã giảm giá này không? Hành động này không thể hoàn tác."
      />
    </div>
        </>
    );
}
export default User;