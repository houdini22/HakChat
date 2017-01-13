import React from 'react';

class MessageComponent extends React.Component {
    renderChatMessage(message) {
        let odd = this.props.index % 2 === 0;
        let mainClassNames = ['message'];

        if (odd) {
            mainClassNames.push('odd');
        } else {
            mainClassNames.push('even');
        }

        let regex = new RegExp(`@(${this.props.nick})(\\s|$)`);
        let hasNickInMessage = regex.test(message.message);

        if (hasNickInMessage) {
            mainClassNames.push('has-nick');
        }

        return (
            <div className={mainClassNames.join(' ')}>
                <p>
                    <span className="date">{message.date}</span>
                    <span className="nick">{message.nick}:</span>
                    <span className="message-content">{message.message}</span>
                </p>
            </div>
        );
    }

    renderSystemMessage(message) {
        let odd = this.props.index % 2 === 0;
        let mainClassNames = ['message', 'system-message'];

        if (odd) {
            mainClassNames.push('odd');
        } else {
            mainClassNames.push('even');
        }

        let messageText = '';
        switch (message.subType) {
            case 'USER_JOINED':
                messageText = `${message.nick} joined.`;
                break;

            case 'USER_DISCONNECTED':
                messageText = `${message.nick} disconnected.`;
                break;
        }

        return (
            <div className={mainClassNames.join(' ')}>
                <p>
                    <span className="date">{message.date}</span>
                    <span className="nick">[SYSTEM]:</span>
                    <span className="message-content">{messageText}</span>
                </p>
            </div>
        );
    }

    render() {
        let message = this.props.message;

        if (message.type === "SYSTEM_MESSAGE") {
            return this.renderSystemMessage(message);
        }
        return this.renderChatMessage(message);
    }
}

MessageComponent.propTypes = {
    message: React.PropTypes.object.isRequired
};

export default MessageComponent;