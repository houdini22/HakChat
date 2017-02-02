import React from 'react';
import Linkify from 'react-linkify';

class MessageComponent extends React.Component {
    constructor() {
        super();
        this.soundPlayed = false;
    }

    renderChatMessage(message) {
        let odd = this.props.index % 2 === 0;
        let mainClassNames = ['message'];

        if (odd) {
            mainClassNames.push('odd');
        } else {
            mainClassNames.push('even');
        }

        let nickRegex = new RegExp(`(@${this.props.state.nick}(\\s|$))`);
        let hasNickInMessage = nickRegex.test(message.message);

        if (hasNickInMessage) {
            mainClassNames.push('has-nick');
            if (!this.soundPlayed) {
                this.soundPlayed = true;
                try {
                    this.audio = new Audio('/sounds/notification.mp3');
                    this.audio.play();
                } catch (ex) {

                }
            }
        }

        return (
            <div className={mainClassNames.join(' ')}>
                <p>
                    <span className="date">{message.date}</span>
                    <span className="nick">{message.nick}:</span>
                    <span className="message-content">
                        <Linkify
                            properties={{target: "_blank"}}>
                                {message.message}
                        </Linkify>
                    </span>
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

            case 'USER_LEFT_CHANNEL':
                messageText = `${message.nick} left channel.`;
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