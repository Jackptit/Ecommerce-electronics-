import React, { useState } from 'react';

const AddressList = () => {
    const [addresses, setAddresses] = useState([
        { id: 1, address: '123 Đường A, TP. HCM' },
        { id: 2, address: '456 Đường B, Hà Nội' },
    ]);

    const addAddress = () => {
        const newAddress = prompt('Nhập địa chỉ mới:');
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
                    {addresses.map((addr) => (
                        <li key={addr.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {addr.address}
                            <button className="btn btn-danger btn-sm" onClick={() => removeAddress(addr.id)}>
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
