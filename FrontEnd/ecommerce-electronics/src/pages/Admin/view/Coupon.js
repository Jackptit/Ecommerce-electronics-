import React, { useState } from 'react';
import DiscountModal from '../../../components/AdminComponents/Modal/DiscountModal';

const CouponManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({
    id: '',
    name: '',
    code: '',
    discount: '',
    startDate: '',
    endDate: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [coupons, setCoupons] = useState([
    { id: 1, name: 'Giảm giá Tết', code: 'TET2024', discount: 10, startDate: '2024-01-01', endDate: '2024-01-31' },
    { id: 2, name: 'SALE10', code: 'SALE10', discount: 10, quantity: 100, startDate: '2024-11-01', endDate: '2024-11-30' },
    { id: 3, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 4, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 5, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 6, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 7, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 8, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 9, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 10, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 11, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 12, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
    { id: 13, name: 'BLACKFRIDAY', code: 'BF2024', discount: 50, quantity: 50, startDate: '2024-11-25', endDate: '2024-11-30' },
  ]);

  const handleInputChange = (e, setCoupon) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNew = () => {
    setCurrentCoupon({
      id: '',
      name: '',
      code: '',
      discount: '',
      startDate: '',
      endDate: ''
    });
    setShowModal(true);
  };

  const handleEdit = (coupon) => {
    setCurrentCoupon(coupon);
    setShowModal(true);
  };

  const handleSave = (coupon) => {
    if (coupon.id) {
      setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? coupon : c)));
    } else {
      setCoupons((prev) => [...prev, { ...coupon, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

   // Hàm tìm kiếm
   const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách mã giảm giá theo từ khóa tìm kiếm
  const filteredCoupons = coupons.filter((coupon) =>
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
          style={{ width: '250px' }}
        />
        <i className="fas fa-search ms-2" style={{ fontSize: '16px' }}></i>
      </div>
      <button
        className="btn btn-primary btn-sm"
        onClick={handleAddNew}
        style={{
          fontSize: '14px',
          backgroundColor: '#007bff', // Màu nền xanh dương
          borderColor: '#007bff', // Đổi màu viền nếu cần
          color: 'white',
          width: '120px',
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
            <th>Mã</th>
            <th>Giảm giá</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoupons.map((coupon, index) => (
            <tr key={coupon.id}>
              <td>{index + 1}</td>
              <td>{coupon.name}</td>
              <td>{coupon.code}</td>
              <td>{coupon.discount}</td>
              <td>{coupon.startDate}</td>
              <td>{coupon.endDate}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(coupon)}>
                  Sửa
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => {/* Delete coupon */}}>
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
    </div>
  );
};

export default CouponManagement;
