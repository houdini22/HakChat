import React from 'react';

class NewMessageComponent extends React.Component {
    constructor() {
        super();
        this.timeout = null;
        this.state = {inputValue: ''};
    }

    sendUserStartsTypingMessage() {
        if (!this.userTyping) {
            this.props.socket.emit('user start typing', {
                nick: this.props.state.nick
            });
            this.userTyping = true;
        }
        this.runUserStopsTypingTimeout();
    }

    clearUserStopsTypingTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    runUserStopsTypingTimeout() {
        this.clearUserStopsTypingTimeout();
        this.timeout = setTimeout(() => {
            this.props.socket.emit('user stops typing', {
                nick: this.props.state.nick
            });
            this.userTyping = false;
        }, 2000);
    }

    focusInput() {
        this.inputNewMessage.focus();
    }

    handleKeyUp(e) {
        let input = e.target;
        let message = this.state.inputValue;

        if (e.keyCode === 13 && message.length) {

            this.clearUserStopsTypingTimeout();

            this.props.socket.emit('message sent', {
                nick: this.props.state.nick,
                message: message
            });

            this.userTyping = false;
            this.setState({inputValue: ''});
            input.value = "";
            this.focusInput();
        }
    }

    handleChange(e) {
        const message = e.target.value.trim();
        this.setState({inputValue: message});
        this.sendUserStartsTypingMessage();
    }

    componentDidMount() {
        this.inputNewMessage.focus();
    }

    componentDidUpdate() {
        const hasMessageTo = this.props.state.messageTo.length > 0;
        let message = this.state.inputValue.trim();
        if (hasMessageTo) {
            this.sendUserStartsTypingMessage();

            const nick = `@${this.props.state.messageTo}`;

            if (message.length) {
                message += ' ' + nick;
            } else {
                message = nick;
            }
        }

        if (hasMessageTo) {
            this.props.actions.userClick('');
            this.setState({inputValue: message});
        }

        this.focusInput();
    }

    render() {
        const message = this.state.inputValue;
        return (
            <div className="new-message">
                <input type="text"
                       onChange={(e) => {
                           this.handleChange(e);
                       }}
                       onKeyUp={(e) => {
                           this.handleKeyUp(e);
                       }}
                       ref={(input) => {
                           this.inputNewMessage = input;
                       }}
                       onBlur={(e) => {
                           this.focusInput();
                       }}
                       value={message}
                />
            </div>
        );
    }
}

export default NewMessageComponent;