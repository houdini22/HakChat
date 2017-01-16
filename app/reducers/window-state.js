function messageReceived(state = 'isWindowFocused', action) {
    if (action.type === "WINDOW_STATE") {
        return action.windowState;
    }
    return state;
}

export default messageReceived;