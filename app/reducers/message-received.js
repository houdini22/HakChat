function messageReceived(state = {}, action) {
    if (action.type === 'MESSAGE_RECEIVED') {
        let newState = {...state};
        let channel = action.message.channel;
        if (!newState[channel]) {
            newState[channel] = [];
        }
        newState[channel].push(action.message);
        return newState;
    }
    return state;
}

export default messageReceived;