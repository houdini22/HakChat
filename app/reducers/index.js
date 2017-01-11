import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import messageReceived from './message-received';
import userLoggedIn from './user-logged-in';
import usersListChanged from './users-list-changed';

const rootReducer = combineReducers({
    messages: messageReceived,
    nick: userLoggedIn,
    usersJoined: usersListChanged,
    routing: routerReducer
});

export default rootReducer;