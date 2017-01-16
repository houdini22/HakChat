import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import messageReceived from './message-received';
import userLoggedIn from './user-logged-in';
import usersListChanged from './users-list-changed';
import userClick from './user-click';
import usersTyping from './users-typing';
import windowState from './window-state';

const rootReducer = combineReducers({
    messages: messageReceived,
    nick: userLoggedIn,
    usersJoined: usersListChanged,
    messageTo: userClick,
    usersTyping: usersTyping,
    windowState: windowState,
    routing: routerReducer
});

export default rootReducer;