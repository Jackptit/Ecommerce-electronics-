// src/components/Register.js
import React from 'react';
import AuthForm from './AuthForm';

const Register = () => {
  const handleRegister = (values) => {
    console.log('Đăng ký với thông tin:', values);
  };

  return <AuthForm isRegister={true} onSubmit={handleRegister} />;
};

export default Register;
