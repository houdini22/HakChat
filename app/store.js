import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from './reducers/index';

const defaultState = {
    messages: {
        'main': []
    },
    nick: null,
    messageTo: '',
    windowState: 'isWindowFocused',
    activeTab: '_CHANNELS_',
    channels: [],
    pendingMessages: {}
};

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(browserHistory, store);

export default store;