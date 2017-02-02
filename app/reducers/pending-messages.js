function pendingMessages(state = {}, action) {
    if (action.type === 'PENDING_MESSAGE_INC') {
        let newState = {...state};
        if(action.reset === true) {
            newState[action.channel] = 0;
        } else {
            if(!newState[action.channel]) {
                newState[action.channel] = 0;
            }
            newState[action.channel] += 1;
        }
        return newState;
    }
    return state;
}

export default pendingMessages;