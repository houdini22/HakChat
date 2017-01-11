function messageReceived(state = [], action) {
    if(action.type === "MESSAGE_RECEIVED") {
        let newState = [...state];
        newState.push(action.message);
        return newState;
    }
    return state;
}

export default messageReceived;