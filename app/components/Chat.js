import React from 'react';

import NewMessageComponent from './NewMessage';
import MessageComponent from './Message';
import UsersJoinedComponent from './JoinedUsers';

class ChatComponent extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (this.props.socket.connected) {
            this.props.socket.on('chat message', (data) => {
                this.props.messageReceived(data);
            });
            this.props.socket.on('system message', (data) => {
                this.props.messageReceived(data);
            })
        } else {
            this.props.router.push("/");
        }

        this.props.socket.on('disconnect', () => {
            this.props.socket.off('chat message');
            this.props.router.push('/');
        });

        this.props.socket.emit('get users');
    }

    componentDidUpdate() {
        this.messageDiv.scrollTop = this.messageDiv.scrollHeight;
    }

    render() {
        let i = 0;
        return (
            <div className="chat-screen">
                <div className="messages"
                     ref={(input) => {
                         this.messageDiv = input;
                     }}
                >
                    {
                        this.props.messages.map((message) => {
                            i++;
                            return <MessageComponent
                                {...this.props}
                                message={message}
                                key={i}
                                index={i}
                            />
                        })
                    }
                </div>
                <UsersJoinedComponent
                    {...this.props}
                />
                <NewMessageComponent
                    {...this.props}
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