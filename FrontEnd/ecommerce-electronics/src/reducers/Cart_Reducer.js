const Cart_Reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };

      case "ADD_TO_CART": {
        // Xử lý cart
        const existingCartProductIndex = state.cart.findIndex(
            (item) => item.product.id === action.payload.product.id
        );
    
        let cartAfterAdd;
        if (existingCartProductIndex !== -1) {
            // Nếu sản phẩm đã có trong cart, tăng số lượng
            cartAfterAdd = state.cart.map((item, index) =>
                index === existingCartProductIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // Nếu sản phẩm chưa có, thêm mới và đặt số lượng là 1
            cartAfterAdd = [...state.cart, { ...action.payload, quantity: 1 }];
        }
    
        // Xử lý cartBuy với điều kiện user.id và product.id
        const existingCartBuyProductIndex = state.cartBuy.findIndex((item) => {
            return (
                item.user.id === action.payload.user.id &&
                item.product.id === action.payload.product.id
            );
        });
    
        let cartBuyAfterAdd;
        if (existingCartBuyProductIndex !== -1) {
            // Nếu sản phẩm đã có trong cartBuy, tăng số lượng
            cartBuyAfterAdd = state.cartBuy.map((item, index) =>
                index === existingCartBuyProductIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // Nếu sản phẩm chưa có, thêm mới và đặt số lượng là 1
            cartBuyAfterAdd = [
                ...state.cartBuy,
                { ...action.payload, quantity: 1 },
            ];
        }
    
        return { ...state, cart: cartAfterAdd, cartBuy: cartBuyAfterAdd };
    }
    

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

    case "PAYMENT": {
      const cartAfterAdd = state.cart.filter(
        (item) =>
          !action.payload.some(
            (cartbuy) => cartbuy.product.id === item.product.id
          )
      );
      return { ...state, cart: cartAfterAdd, cartBuy: [] };
    }

    default:
      return state;
  }
};
export default Cart_Reducer;
