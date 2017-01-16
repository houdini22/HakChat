function userClick(state = '', action) {
    if (action.type === 'USER_CLICK') {
        return action.nick;
    }
    return state;
}

export default userClick;