import React from 'react';
import {BrowserRouter, Match, Miss} from 'react-router';

import StartScreenComponent from './StartScreen';
import ChatComponent from './Chat';
import NotFoundComponent from './NotFound';

class AppComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            nick: null,
            password: null
        };
    }

    connect(nick, password) {
        this.setState({
            nick,
            password
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Match exactly pattern="/"
                           component={() => {
                               return <StartScreenComponent connect={this.connect.bind(this)}/>
                           }}/>
                    <Match pattern="/chat"
                           component={() => {
                               return <ChatComponent nick={this.state.nick} password={this.state.password}/>
                           }}/>
                    <Miss component={NotFoundComponent}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppComponent;