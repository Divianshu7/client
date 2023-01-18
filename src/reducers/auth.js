export const authReducer = (state = { name: "ass" }, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, ...action.payload }//merge
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
};
