function activeTabClicked(state = '', action) {
    if (action.type === "ACTIVE_TAB_CLICKED") {
        return action.tab;
    }
    return state;
}

export default activeTabClicked;