import React, { createContext, useReducer, useContext } from 'react';

// Initial state for user
const initialState = {
  userInfo: {
    name: 'Nguyễn Văn A',
    email: 'example@gmail.com',
    phone: '0123456789',
    address: '123 Thanh Xuân Hà nội',
    dateOfBirth: "1990-01-01",
    gender: "Nam",
  },
  isEditing: false,
};

// Action types
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';

// Reducer function to handle state changes
const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
    case TOGGLE_EDIT_MODE:
      return { ...state, isEditing: !state.isEditing };
    default:
      return state;
  }
};

// Create Context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
