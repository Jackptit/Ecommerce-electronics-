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
          address: { ...state.address, ...action.payload },
        };
  
      default:
        return state;
    }
  };
  
  export default addressReducer;
  