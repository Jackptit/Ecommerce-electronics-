const orderReducer = (state, action) => {
    switch (action.type) {
      case "SET_ORDERS":
        return {
          ...state,
          orders: action.payload, 
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
  
      case "UPDATE_ORDER_STATUS":
        return {
          ...state,
          orders: { ...state.orders, ...action.payload },
        };
  
      default:
        return state;
    }
  };
  
  export default orderReducer;
  