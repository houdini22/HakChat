import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import MainComponent from './__Main';

import store from '../store';

import io from 'socket.io-client';
import config from '../config';

let socket = io(config.socketAddress + ':' + config.socketPort, {
    autoConnect: false
});

function mapStateToProps(state) {
    return {
        state: {
            messages: state.messages,
            nick: state.nick,
            messageTo: state.messageTo,
            windowState: state.windowState,
            channels: state.channels,
            activeTab: state.activeTab,
            pendingMessages: state.pendingMessages
        },
        socket,
        store
    };
}

function mapDispatchToProps(dispatch) {
    let result = {actions: {}};
    Object.keys(actionCreators).forEach((key) => {
        result.actions[key] = bindActionCreators(actionCreators[key], dispatch);
    });
    return result;
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default App;