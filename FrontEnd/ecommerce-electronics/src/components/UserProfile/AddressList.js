import React, { useState, useEffect } from "react";
import { useAddressContext } from "../../contexts/AddressContext";
import AddAddressModal from "./Model/AddAddressModal";
import { toast } from "react-toastify"; // Import toast
import { getAccessToken } from "../../utils/commonFunction";

const AddressList = () => {
  const { addressState, dispatch, updateAddress, addAddress, deleteAddress, fetchAddress } =
    useAddressContext();
  const [addresses, setAddresses] = useState(addressState?.address);
  const [showModal, setShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null); // Store current address for update

  useEffect(() => {
    fetchAddress(getAccessToken());
  }, []);

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

  const showAddAddressModal = () => {
    setCurrentAddress(null); // For adding a new address, reset the current address
    setShowModal(true);
  };

  const showEditAddressModal = (address) => {
    setCurrentAddress(address); // Set the address to be edited
    setShowModal(true);
  };



  const handleAddAddress = async (newAddress) => {
    try {
      await addAddress(newAddress);
      setShowModal(false);
      toast.success("Thêm địa chỉ thành công!");
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Thêm địa chỉ thất bại!");
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      toast.success("Xóa địa chỉ thành công!");
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Xóa địa chỉ thất bại!");
    }
  };

  const handleUpdateAddress = async (infoUpdate) => {
    try {
      const updatedAddress = {
        ...infoUpdate,
        id: currentAddress.id,
        idUser: currentAddress.idUser,
        isDefault: currentAddress.isDefault,
        status: currentAddress.status,
      };
      await updateAddress(updatedAddress); // Call the update function
      setShowModal(false);
      setCurrentAddress("");
      toast.success("Cập nhật địa chỉ thành công!");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Cập nhật địa chỉ thất bại!");
    }
  };

  const setDefaultAddress = async (address) => {
    try {
      address.isDefault = true;
      await updateAddress(address, true);
      toast.success("Cập nhật địa chỉ thành công!");
    } catch (error) {
      toast.error("Cập nhật địa chỉ thất bại!");
      console.error("Error updating address:", error);
    }
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
              <span>
                {addr.specificAddress}, {addr.ward}, {addr.district},{" "}
                {addr.province}
              </span>
              <div>
                {addr.isDefault ? (
                  <span className="badge bg-success me-2">
                    <i>Mặc định ✓</i>
                  </span>
                ) : (
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => setDefaultAddress(addr)}
                  >
                    Chọn mặc định
                  </button>
                )}
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => showEditAddressModal(addr)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteAddress(addr.id)}
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={showAddAddressModal}>
          Thêm địa chỉ
        </button>
      </div>

      <AddAddressModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={currentAddress ? handleUpdateAddress : handleAddAddress} // Use appropriate handler based on action
        address={currentAddress} // Pass the current address to the modal for editing
      />
    </div>
  );
};

export default AddressList;
