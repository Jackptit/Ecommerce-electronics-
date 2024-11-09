const Cart_Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            //const updatedCart = [...state.cart, action.payload];
            const itemIndex = state.cart.findIndex((item) => {
                return item.id === action.payload.id;

            })
            const updatedAmount = state.amount + 1; // Assuming each product adds 1 to the amount
            if (itemIndex === -1) {
                return {
                    ...state,
                    amount: updatedAmount,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }]
                };
            }
            const updateCart = state.cart.map((item) =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            return {
                ...state,
                amount: updatedAmount,
                cart: updateCart
            }
        case 'INCREASE_QUANTITY':
            const tempCart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            });
            return { ...state, cart: tempCart };
        case 'DECREASE_QUANTITY':
            const temp = state.cart.map((item) => {
                if (item.id === action.payload) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    return item
                }
                return item;
            });
            return { ...state, cart: temp };
        case 'REMOVE_ITEM':
            const newCart = state.cart.filter((item) => item.id !== action.payload.id);
            return { ...state, cart: newCart };
        case 'COUNT_CART_TOTALS':
            const { totalAmount, totalItem } = state.cart.reduce((total, item) => {
                const { price, quantity } = item;
                total.totalItem += quantity;
                total.totalAmount += price * quantity;
                return total;
            }, {
                totalAmount: 0,
                amountItem: 0
            });
            return {
                ...state,
                total: totalAmount,
                amount: totalItem
            }
        default:
            return state;
    }
}
export default Cart_Reducer;