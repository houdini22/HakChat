function usersListChanged(state = [], action) {
    if(action.type === 'USERS_LIST_CHANGED') {
        let newState = [...action.users];
        return newState;
    }
    return state;
}

export default usersListChanged;