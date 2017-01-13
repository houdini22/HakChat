import React from 'react';

class NewMessageComponent extends React.Component {
    constructor() {
        super();
        this.timeout = null;
    }

    handleKeyUp(e) {
        const input = e.target;
        const message = input.value.trim();

        if (!this.userTyping) {
            this.props.socket.emit('user start typing', {
                nick: this.props.nick
            });
            this.userTyping = true;
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.props.socket.emit('user stops typing', {
                nick: this.props.nick
            });
            this.userTyping = false;
        }, 2000);

        if (e.keyCode === 13 && message.length) {
            clearTimeout(this.timeout);

            this.props.socket.emit('message sent', {
                nick: this.props.nick,
                message: message
            });

            this.userTyping = false;

            input.value = "";
            input.focus();
        }
    }

    componentDidMount() {
        this.inputNewMessage.focus();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="new-message">
                <input type="text"
                       onKeyUp={(e) => {
                           this.handleKeyUp(e);
                       }}
                       ref={(input) => {
                           this.inputNewMessage = input;
                       }}
                       onBlur={(e) => {
                           e.target.focus();
                       }}
                />
            </div>
        );
    }
}

NewMessageComponent.propTypes = {
    socket: React.PropTypes.object.isRequired
};

export default NewMessageComponent;