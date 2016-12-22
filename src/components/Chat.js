import React from 'react';

import io from 'socket.io-client';
import config from '../config';

import NewMessageComponent from './NewMessage';
import MessageComponent from './Message';
import UsersJoinedComponent from './UsersJoined';

class ChatComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            joined: false,
            usersJoined: []
        };

        this.handleIncomingMessage = this.handleIncomingMessage.bind(this);

        this.socket = io(config.socketAddress + ':' + config.socketPort, {
            autoConnect: false
        });
    }

    componentDidMount() {
        if (this.props.nick && this.props.password) {
            this.socket.on('chat message', (data) => {
                this.handleIncomingMessage(data);
            });
            this.socket.emit('join', {
                nick: this.props.nick,
                password: this.props.password
            });
            this.socket.on('joined', () => {
                this.socket.emit('get users');
            });
            this.socket.connect();
        } else {
            this.context.router.transitionTo("/");
        }
    }

    handleNewMessage(message) {
        this.socket.emit('message sent', {
            nick: this.props.nick,
            message: message
        });
    }

    handleIncomingMessage(data) {
        var messages = [...this.state.messages];
        messages.push(data);
        this.setState({messages});
    }

    componentDidUpdate() {
        this.messageDiv.scrollTop = this.messageDiv.scrollHeight;
    }

    render() {
        let i = 0;
        return (
            <div className="chat-screen">
                <div className="messages"
                     ref={(div) => {
                         this.messageDiv = div;
                     }}
                >
                    {
                        this.state.messages.map((message) => {
                            i++;
                            return <MessageComponent
                                message={message}
                                key={i}
                                index={i}
                            />
                        })
                    }
                </div>
                <UsersJoinedComponent
                    socket={this.socket}
                />
                <NewMessageComponent
                    handleNewMessage={this.handleNewMessage.bind(this)}
                    socket={this.socket}
                />
            </div>
        );
    }
}

ChatComponent.propTypes = {
    nick: React.PropTypes.string,
    password: React.PropTypes.string
};

ChatComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ChatComponent;