import React from 'react';

import MessageComponent from './Message';

class MessagesComponent extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.actions.pendingMessages({
            channel: this.props.params.name,
            reset: true
        });
    }

    componentDidUpdate() {
        this.messageDiv.scrollTop = this.messageDiv.scrollHeight;
    }

    render() {
        let messages = [];
        if (this.props.state.messages[this.props.params.name]) {
            messages = this.props.state.messages[this.props.params.name];
        }
        return (
            <div className="main-window messages"
                 ref={(input) => {
                     this.messageDiv = input;
                 }}
            >
                {
                    messages.map((message, i) => {
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