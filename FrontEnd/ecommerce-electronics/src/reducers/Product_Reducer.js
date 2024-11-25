

const productReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
              ...state,
              products: action.payload,
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
    }
}
export default productReducer;