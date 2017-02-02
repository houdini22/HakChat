import React from 'react';

class ChannelTabComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        };
    }

    handleUserClick(e) {
        this.props.router.push(`/channel/${this.props.channel.name}`);
        this.props.actions.pendingMessages({
            channel: this.props.channel.name,
            reset: true
        });
    }

    componentDidMount() {
    }

    render() {
        let pendingMessagesResult = '';
        let pendingMessages = this.props.state.pendingMessages[this.props.channel.name] || {};
        let classNames = ['label', 'label_pending_messages'];
        if (pendingMessages.important) {
            classNames.push('label-warning');
        }
        if (pendingMessages.value) {
            pendingMessagesResult = <span className={classNames.join(' ')}>{pendingMessages.value}</span>;
        }
        return (
            <div
                className="tab"
                onClick={(e) => {
                    this.handleUserClick(e);
                }}
            >
                #{this.props.channel.name}
                {pendingMessagesResult}
            </div>
        )
    }
}

export default ChannelTabComponent;