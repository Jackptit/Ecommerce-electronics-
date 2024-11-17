const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_INFO':
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };
        default:
            return state;
    }
};

export default userReducer;
