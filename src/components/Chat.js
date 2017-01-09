import React from 'react';

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
    }

    componentDidMount() {
        if (this.props.socket.connected) {
            this.props.socket.on('chat message', (data) => {
                this.handleIncomingMessage(data);
            });
        } else {
            this.context.router.transitionTo("/");
        }

        this.props.socket.on('disconnect', () => {
            this.props.socket.off('chat message');
            this.context.router.transitionTo('/');
        });

        this.props.socket.emit('get users');
    }

    handleNewMessage(message) {
        this.props.socket.emit('message sent', {
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
                    socket={this.props.socket}
                />
                <NewMessageComponent
                    handleNewMessage={this.handleNewMessage.bind(this)}
                    socket={this.props.socket}
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