import React from 'react';

class MessageComponent extends React.Component {
    render() {
        let odd = this.props.index % 2 === 0;
        let classNames = "message" + (odd ? " odd" : " even");
        return (
            <div className={classNames}>
                <p>
                    <span className="date">{this.props.message.date}</span>
                    <span className="nick">{this.props.message.nick}:</span>
                    <span className="message-content">{this.props.message.message}</span>
                </p>
            </div>
        );
    }
}

MessageComponent.propTypes = {
    message: React.PropTypes.object.isRequired
};

export default MessageComponent;