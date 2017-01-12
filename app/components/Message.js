import React from 'react';

class MessageComponent extends React.Component {
    render() {
        let message = this.props.message;
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
}

MessageComponent.propTypes = {
    message: React.PropTypes.object.isRequired
};

export default MessageComponent;