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

    case "FEEDBACK_ORDER_PRODUCT":
      const updatedOrders = state.orders.map((order) => {
        console.log("order from reducer:",order)
        const updatedOrdersWithDetails = order.orderDetails.map(
          (detail) => {
            console.log("detail from reducer:",detail)
            if (
              detail.idOrder === action.payload.idOrder &&
              detail.idProduct === action.payload.idProduct
            ) {
              return { ...detail, isFeedback: true };
            }
            return detail;
          }
        );

        return { ...order, orderDetails: updatedOrdersWithDetails };
      });

      return {
        ...state,
        orders: updatedOrders,
        loading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
