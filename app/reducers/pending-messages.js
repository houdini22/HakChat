function pendingMessages(state = {}, action) {
    if (action.type === 'PENDING_MESSAGE_INC') {
        let newState = {...state};
        if (action.reset === true) {
            newState[action.channel] = {
                value: 0
            };
        } else {
            newState[action.channel] = newState[action.channel] || {value: 0};
            if (!newState[action.channel].value) {
                newState[action.channel].value = 0;
            }

            newState[action.channel].important = newState[action.channel].important || action.important;

            newState[action.channel].value += 1;
        }
        return newState;
    }
    return state;
}

export default pendingMessages;