// src/components/Login.js
import React from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './AuthForm.css'; // Đảm bảo đã import CSS

const Login = () => {
  const handleLogin = (values) => {
    console.log('Đăng nhập với thông tin:', values);
    // Thêm logic đăng nhập tại đây (ví dụ: gọi API)
  };

  return (
    <div className="auth-container">
      <AuthForm isRegister={false} onSubmit={handleLogin} />
      <p className="redirect-text">
        Nếu chưa có tài khoản, <Link to="/register">đăng ký ở đây</Link>.
      </p>
    </div>
  );
};

export default Login;
