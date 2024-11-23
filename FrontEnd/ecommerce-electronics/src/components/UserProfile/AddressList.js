import React, { useState, useEffect } from "react";
import { useAddressContext } from "../../contexts/AddressContext";

const AddressList = () => {
  const { addressState, dispatch, updateAddress } = useAddressContext();
  const [addresses, setAddresses] = useState(addressState?.address);

  useEffect(() => {
    if (addressState.address) {
      setAddresses(addressState.address);
    }
  }, [addressState.address]);

  if (addressState.loading) {
    return <p>Loading address data...</p>;
  }

  if (addressState.error) {
    return <p>Error: {addressState.error}</p>;
  }

  if (!addressState.address) {
    return <p>No address data found.</p>;
  }

  const addAddress = () => {
    const newAddress = prompt("Nhập địa chỉ mới:");
    if (newAddress) {
      setAddresses([...addresses, { id: Date.now(), address: newAddress }]);
    }
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5>Địa chỉ giao hàng</h5>
      </div>
      <div className="card-body">
        <ul className="list-group mb-3">
          {addresses?.map((addr) => (
            <li
              key={addr.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {addr.specificAddress +
                ", " +
                addr.ward +
                ", " +
                addr.district +
                ", " +
                addr.province}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeAddress(addr.id)}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={addAddress}>
          Thêm địa chỉ
        </button>
      </div>
    </div>
  );
};

export default AddressList;
