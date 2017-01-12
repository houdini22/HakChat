import React from 'react';
import {userClick as userClickAction} from '../actions/actionCreators';

class NewMessageComponent extends React.Component {
    handleKeyUp(e) {
        const input = e.target;
        const message = input.value.trim();

        if (e.keyCode === 13 && message.length) {
            this.props.socket.emit('message sent', {
                nick: this.props.nick,
                message: message
            });

            input.value = "";
            input.focus();
        }
    }

    componentDidMount() {
        this.inputNewMessage.focus();

        this.unsubscribeMessageTo = this.props.store.subscribe(() => {

        });
    }

    componentWillUnmount() {
        this.unsubscribeMessageTo();
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