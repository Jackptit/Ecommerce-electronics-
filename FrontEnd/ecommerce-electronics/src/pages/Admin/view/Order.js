import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiscountModal from "../../../components/AdminComponents/Modal/DiscountModal";
import { getAccessToken } from "../../../utils/commonFunction";
import axios from "axios";
import formatDate from "../../../utils/dateFormat";
import { toast } from "react-toastify"; // Import toast
import ConfirmModal from "../../../components/AdminComponents/Modal/ConfirmModal";

const OrderManagement = () => {
  const navigate = useNavigate();
  const token = getAccessToken();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }
      const orders = await axios.get("http://localhost:8080/api/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setOrders(orders.data);
    } catch (error) {
      console.log("Error fetching orders:", error.status);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const handleDeleteCoupon = async () => {
    await handleConfirmOrder(currentOrder, 0);
    setShowConfirm(false);
  };

  const handleConfirmOrder = async (order, status) => {
    try {
      if (!token) {
        navigate("/login");
        //dispatch({ type: "ERROR", payload: "Access token not found" }); // Không có access token
        return;
      }

      const data = {
        id: order.id,
        status: status,
      };
      const response = await axios.put(
        "http://localhost:8080/api/orders",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //update state
      const updatedOrders = orders.map((item) =>
        item.id === response.data.id ? response.data : item
      );

      setOrders(updatedOrders);
      if (status === 2) toast.success("Xác nhận đơn hàng thành công !");
      else toast.success("Hủy đơn hàng thành công !");
    } catch (error) {
      console.log("Error update coupon:", error);
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
  const filteredOrder = orders.filter(
    (order) =>
      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-3">
      {/* Tiêu đề Danh sách mã giảm giá và các thành phần trên */}
      <h2 className="h4">Danh sách đơn hàng</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "250px" }}
          />
          <i className="fas fa-search ms-2" style={{ fontSize: "16px" }}></i>
        </div>
      </div>

      {/* Coupon Table */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã đơn</th>
            <th>Phương thức</th>
            <th>Người đặt</th>
            <th>Tổng tiền</th>
            <th>Giảm giá</th>
            <th>Thời gian</th>
            <th>Địa chỉ giao</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrder.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.code}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.user.username}</td>
              <td>{order.total.toLocaleString("vi-VN")}</td>
              <td>
                {(
                  +order.discountCoupon + +order.discountProduct
                ).toLocaleString("vi-VN")}
              </td>
              <td>{formatDate(order.orderTime)}</td>
              <td>{order.userAddress}</td>
              {/* <td
                style={{
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                }}
              >
                {coupon.description}
              </td> */}
              <td>
                {order.status === 1 && (
                  <button
                    className="btn btn-primary btn-sm me-3 "
                    style={{ width: "80px" }}
                    onClick={() => handleConfirmOrder(order, 2)}
                  >
                    Xác nhận
                  </button>
                )}
                {order.status === 2 && (
                  <span style={{ marginRight: "10px" }}>
                    <i>Đã xác nhận</i>
                  </span>
                )}
                {(order.status === 2 || order.status === 1) && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setCurrentOrder(order);
                      setShowConfirm(true);
                    }}
                  >
                    Hủy
                  </button>
                )}
                {order.status === 0 && (
                  <span style={{ color: "red" }}>
                    <strong>
                      <i>Đã hủy</i>
                    </strong>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Confirm */}
      <ConfirmModal
        show={showConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleDeleteCoupon}
        title="Xác nhận hủy đơn hàng"
        bodyText="Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác."
      />
    </div>
  );
};

export default OrderManagement;
