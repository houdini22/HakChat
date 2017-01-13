function usersTyping(state = [], action) {
    if (action.type === "USERS_TYPING") {
        let newState = [...state];
        newState.push(action.message);
        return newState;
    }
    return state;
}

export default usersTyping;