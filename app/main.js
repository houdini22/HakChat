import React from 'react';
import {render} from 'react-dom';

import "./scss/screen.scss";

import {BrowserRouter, Match, Miss} from 'react-router';

import NotFoundComponent from './components/NotFound';
import StartScreenComponent from './components/StartScreen';
import ChatComponent from './components/Chat';

import io from 'socket.io-client';
import config from './config';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            nick: null,
            password: null
        };

        this.socket = io(config.socketAddress + ':' + config.socketPort, {
            autoConnect: false
        });
    }

    connect(nick) {
        this.setState({nick});
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Match exactly pattern="/"
                           component={() => {
                               return <StartScreenComponent socket={this.socket} connect={this.connect.bind(this)}/>
                           }}/>
                    <Match pattern="/chat"
                           component={() => {
                               return <ChatComponent socket={this.socket} nick={this.state.nick}/>
                           }}/>
                    <Miss component={NotFoundComponent}/>
                </div>
            </BrowserRouter>
        );
    }
}

render(<Main/>, document.getElementById('main'));