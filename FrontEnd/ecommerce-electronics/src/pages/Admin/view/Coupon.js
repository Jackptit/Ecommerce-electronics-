import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiscountModal from "../../../components/AdminComponents/Modal/DiscountModal";
import { getAccessToken } from "../../../utils/commonFunction";
import axios from "axios";
import formatDate from "../../../utils/dateFormat";
import { toast } from "react-toastify"; // Import toast
import ConfirmModal from "../../../components/AdminComponents/Modal/ConfirmModal";

const CouponManagement = () => {
  const navigate = useNavigate();
  const token = getAccessToken();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({
    name: "",
    code: "",
    discountPercent: "",
    startTime: "",
    endTime: "",
    quantity: "",
    description: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupon();
  }, []);

  const fetchCoupon = async () => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }
      const coupons = await axios.get("http://localhost:8080/api/coupon", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCoupons(coupons.data);
    } catch (error) {
      console.log("Error fetching coupon:", error.status);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const updateCoupon = async (coupon) => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }
      const response = await axios.put(
        "http://localhost:8080/api/coupon",
        coupon,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //update state
      const updatedCoupons = coupons.map((item) =>
        item.id === coupon.id ? coupon : item
      );

      setCoupons(updatedCoupons);
      toast.success("Cập nhật mã giảm giá thành công !");
    } catch (error) {
      console.log("Error update coupon:", error);
      toast.error("Đã có lỗi xảy ra vui lòng thử lại sau !");
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const createCoupon = async (coupon) => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/api/coupon",
        coupon,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //update state
      const updatedCoupons = [...coupons, response.data];
      setCoupons(updatedCoupons);
      toast.success("Thêm mã giảm giá thành công !");
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      if (error.status === 400) {
        console.log("Error create coupon:", error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };

  const deleteCoupon = async (id) => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }
      const response = await axios.delete(
        `http://localhost:8080/api/coupon/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //update state
      const updatedCoupons = coupons.filter((coupon) => coupon.id !== id);
      setCoupons(updatedCoupons);
      toast.success("Xóa mã giảm giá thành công !");
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      if (error.status === 400) {
        console.log("Error create coupon:", error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };

  const handleInputChange = (e, setCoupon) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNew = () => {
    setCurrentCoupon({
      name: "",
      code: "",
      discountPercent: "",
      startTime: "",
      endTime: "",
      quantity: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleEdit = (coupon) => {
    setCurrentCoupon(coupon);
    setShowModal(true);
  };

  const handleSave = async (coupon) => {
    if (coupon.id) {
      //edit
      await updateCoupon(coupon);
    } else {
      //add new
      await createCoupon(coupon);
    }
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const handleDeleteCoupon = async () => {
    await deleteCoupon(currentCoupon.id);
    setShowConfirm(false);
  };

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách mã giảm giá theo từ khóa tìm kiếm
  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-3">
      {/* Tiêu đề Danh sách mã giảm giá và các thành phần trên */}
      <h2 className="h4">Danh sách mã giảm giá</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Tìm kiếm mã giảm giá..."
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
            <th>Tên mã</th>
            <th>Mã Code</th>
            <th>Giảm giá (%)</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Số lượng</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoupons.map((coupon, index) => (
            <tr key={coupon.id}>
              <td>{index + 1}</td>
              <td>{coupon.name}</td>
              <td>{coupon.code}</td>
              <td>{coupon.discountPercent}</td>
              <td>{formatDate(coupon.startTime)}</td>
              <td>{formatDate(coupon.endTime)}</td>
              <td>{coupon.quantity}</td>
              <td
                style={{
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                }}
              >
                {coupon.description}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(coupon)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setCurrentCoupon(coupon)
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
      <DiscountModal
        showModal={showModal}
        currentCoupon={currentCoupon}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleClose={handleClose}
      />

      {/* Modal Confirm */}
      <ConfirmModal
        show={showConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleDeleteCoupon}
        title="Xác nhận xóa"
        bodyText="Bạn có chắc chắn muốn xóa mã giảm giá này không? Hành động này không thể hoàn tác."
      />
    </div>
  );
};

export default CouponManagement;
