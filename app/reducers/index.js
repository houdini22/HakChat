import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import messageReceived from './message-received';
import userLoggedIn from './user-logged-in';
import usersListChanged from './users-list-changed';
import userClick from './user-click';

const rootReducer = combineReducers({
    messages: messageReceived,
    nick: userLoggedIn,
    usersJoined: usersListChanged,
    messageTo: userClick,
    routing: routerReducer
});

export default rootReducer;