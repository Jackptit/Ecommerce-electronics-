const addressReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
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

    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: state.address.map((addr) =>
          addr.id === action.payload.id ? { ...addr, ...action.payload } : addr
        ),
        loading: false,
      };

      case "UPDATE_DEFAULT_ADDRESS":
        return {
          ...state,
          address: state.address.map((addr) =>
            addr.id === action.payload.id
              ? { ...addr, isDefault: true } 
              : { ...addr, isDefault: false } 
          ),
          loading: false,
        };
      

    case "ADD_ADDRESS":
      return {
        ...state,
        address: [...state.address, action.payload],
        loading: false,
      };

      case "DELETE_ADDRESS":
      return {
        ...state,
        address: state.address.filter((addr) => addr.id !== action.payload),
      };

    default:
      return state;
  }
};

export default addressReducer;
