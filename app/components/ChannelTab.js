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
        this.props.actions.activeTabClicked(this.props.channel.name);
    }

    componentDidMount() {
    }

    render() {
        let pendingMessagesResult = '';
        let pendingMessages = this.props.state.pendingMessages[this.props.channel.name] || {};
        let classNameLabel = ['label', 'label_pending_messages'];
        let classNames = ['tab'];
        if (this.props.state.activeTab === this.props.params.name) {
            classNames.push('is-active');
        }
        let style = {};
        if (pendingMessages.important) {
            classNameLabel.push('label-warning');
        }
        if (pendingMessages.value) {
            style.fontWeight = 'bold';
            pendingMessagesResult = <span className={classNameLabel.join(' ')}>{pendingMessages.value}</span>;
        }
        return (
            <div
                className={classNames.join(' ')}
                onClick={(e) => {
                    this.handleUserClick(e);
                }}
                style={style}
            >
                #{this.props.channel.name}
                {pendingMessagesResult}
            </div>
        )
    }
}

export default ChannelTabComponent;