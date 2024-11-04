const Cart_Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const updatedCart = [...state.cart, action.payload];
            const updatedAmount = state.amount + 1; // Assuming each product adds 1 to the amount
            return {
                ...state,
                amount: updatedAmount,
                cart: updatedCart

            };
        default:
            return state;
    }
}
export default Cart_Reducer;