import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import messageReceived from './message-received';
import userLoggedIn from './user-logged-in';
import userClick from './user-click';
import windowState from './window-state';
import activeTabClicked from './active-tab-clicked';
import channelsFetched from './channels-fetched';
import pendingMessages from './pending-messages';

const rootReducer = combineReducers({
    messages: messageReceived,
    nick: userLoggedIn,
    messageTo: userClick,
    windowState: windowState,
    activeTab: activeTabClicked,
    channels: channelsFetched,
    pendingMessages: pendingMessages,
    routing: routerReducer
});

export default rootReducer;