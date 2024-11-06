// src/components/AuthForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AuthForm = ({ isRegister, onSubmit }) => {
  const initialValues = isRegister
    ? { username: '', email: '', password: '', confirmPassword: '' }
    : { email: '', password: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
    ...(isRegister && {
      username: Yup.string().required('Vui lòng nhập tên người dùng'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    }),
  });

  return (
    <div className="auth-form">
      <h2>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {() => (
          <Form>
            {isRegister && (
              <div>
                <label>Tên người dùng</label>
                <Field name="username" type="text" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
            )}
            <div>
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label>Mật khẩu</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {isRegister && (
              <div>
                <label>Xác nhận mật khẩu</label>
                <Field name="confirmPassword" type="password" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
            )}
            <button type="submit">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
