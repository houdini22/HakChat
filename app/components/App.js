import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import MainComponent from './Main';

import io from 'socket.io-client';
import config from '../config';

let socket = io(config.socketAddress + ':' + config.socketPort, {
    autoConnect: false
});

function mapStateToProps(state) {
    return {
        messages: state.messages,
        usersJoined: state.usersJoined,
        nick: state.nick,
        socket
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators, dispatch}, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default App;