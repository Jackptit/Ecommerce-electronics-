const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_USER_INFO":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case "UPDATE_FAVOURITE_PRODUCT":
      return {
        ...state,
        user: {
          ...state.user,
          favourite: action.payload, // Cập nhật lại trường favourite
        },
      };

    default:
      return state;
  }
};

export default userReducer;
