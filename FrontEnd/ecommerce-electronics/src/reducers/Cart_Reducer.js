const Cart_Reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_CART":
      //const updatedCart = [...state.cart, action.payload];
      const itemIndex = state.cart.findIndex((item) => {
        return item.id === action.payload.id;
      });
      const updatedAmount = state.amount + 1; // Assuming each product adds 1 to the amount
      if (itemIndex === -1) {
        return {
          ...state,
          amount: updatedAmount,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
      const updateCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        amount: updatedAmount,
        cart: updateCart,
      };
    case "INCREASE_QUANTITY":
      const tempCart = state.cart.map((item) => {
        if (
          item.user.id === action.payload.user.id &&
          item.product.id === action.payload.product.id
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      const tempCartBuy = state.cartBuy.map((item) => {
        if (
          item.user.id === action.payload.user.id &&
          item.product.id === action.payload.product.id
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      return { ...state, cart: tempCart, cartBuy: tempCartBuy };

    case "DECREASE_QUANTITY":
      const tempCartDecr = state.cart.map((item) => {
        if (
          item.user.id === action.payload.user.id &&
          item.product.id === action.payload.product.id
        ) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item; // Nếu quantity <= 1, không giảm nữa
        }
        return item;
      });

      const tempCartBuyDecr = state.cartBuy.map((item) => {
        if (
          item.user.id === action.payload.user.id &&
          item.product.id === action.payload.product.id
        ) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item; // Nếu quantity <= 1, không giảm nữa
        }
        return item;
      });

      return { ...state, cart: tempCartDecr, cartBuy: tempCartBuyDecr };

    case "REMOVE_ITEM":
      const newCart = state.cart.filter(
        (item) =>
          item.user.id !== action.payload.user.id ||
          item.product.id !== action.payload.product.id
      );

      const newCartBuyRemove = state.cartBuy.filter(
        (item) =>
          item.user.id !== action.payload.user.id ||
          item.product.id !== action.payload.product.id
      );

      return { ...state, cart: newCart, cartBuy: newCartBuyRemove };

    case "COUNT_CART_TOTALS":
      const { totalAmount, totalItem } = state.cart.reduce(
        (total, item) => {
          const { price, quantity } = item;
          total.totalItem += quantity;
          total.totalAmount += price * quantity;
          return total;
        },
        {
          totalAmount: 0,
          amountItem: 0,
        }
      );
      return {
        ...state,
        total: totalAmount,
        amount: totalItem,
      };

    case "ADD_TO_CART_BUY":
      return {
        ...state,
        cartBuy: [...state.cartBuy, action.payload],
      };

    case "ADD_ALL_TO_CART_BUY":
      return {
        ...state,
        cartBuy: [...state.cart],
      };
    case "REMOVE_ITEM_CART_BUY":
      const newCartBuy = state.cartBuy.filter(
        (item) =>
          item.user.id !== action.payload.user.id ||
          item.product.id !== action.payload.product.id
      );
      return { ...state, cartBuy: newCartBuy };

    case "REMOVE_ALL_ITEM_CART_BUY":
      return { ...state, cartBuy: [] };

    default:
      return state;
  }
};
export default Cart_Reducer;
