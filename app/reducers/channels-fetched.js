function channelsFetched(state = [], action) {
    if (action.type === 'CHANNELS_FETCHED') {
        return action.channels;
    }
    return state;
}

export default channelsFetched;