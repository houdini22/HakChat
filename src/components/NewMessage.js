import React from 'react';

class NewMessageComponent extends React.Component {
    handleKeyUp(e) {
        const input = e.target;
        const message = input.value.trim();

        if (e.keyCode === 13 && message.length) {
            this.props.handleNewMessage(message);

            input.value = "";
            input.focus();
        }
    }

    componentDidMount() {
        this.inputNewMessage.focus();
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
    handleNewMessage: React.PropTypes.func.isRequired,
    socket: React.PropTypes.object.isRequired
};

export default NewMessageComponent;