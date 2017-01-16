// users list changed
export function usersListChanged(users) {
    return {
        type: "USERS_LIST_CHANGED",
        users
    };
}

// message received
export function messageReceived(message) {
    return {
        type: "MESSAGE_RECEIVED",
        message
    };
}

// user logged in
export function userLoggedIn(nick) {
    return {
        type: "USER_LOGGED_IN",
        nick
    };
}

export function userClick(nick) {
    return {
        type: 'USER_CLICK',
        nick
    };
}

export function windowState(state) {
    return {
        type: 'WINDOW_STATE',
        state
    };
}