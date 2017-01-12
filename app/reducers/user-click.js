function userClick(state = false, action) {
    if (action.type === 'USER_CLICK') {
        return action.nick;
    }
    return state;
}

export default userClick;