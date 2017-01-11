function userLoggedIn(state = false, action) {
    if (action.type === 'USER_LOGGED_IN') {
        return action.nick;
    }
    return state;
}

export default userLoggedIn;