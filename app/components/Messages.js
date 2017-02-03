import React from 'react';

import MessageComponent from './Message';

class MessagesComponent extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.socket.emit('get channels', {
            nick: this.props.state.nick
        });
    }

    componentDidUpdate() {
        this.messageDiv.scrollTop = this.messageDiv.scrollHeight;
    }

    render() {
        return (
            <div className="main-window messages"
                 ref={(input) => {
                     this.messageDiv = input;
                 }}
            >
                {
                    this.props.state.messages[this.props.params.name].map((message, i) => {
                        return <MessageComponent
                            {...this.props}
                            message={message}
                            key={i}
                            index={i}
                        />
                    })
                }
            </div>
        );
    }
}

export default MessagesComponent;