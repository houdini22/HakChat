import React from 'react';

class ChannelTabComponent extends React.Component {
    constructor() {
        super();
    }

    handleUserClick(e) {
        this.props.router.push(`/channel/${this.props.channel.name}`);
        this.props.actions.pendingMessages({
            channel: this.props.channel.name,
            reset: true
        });
        this.props.actions.activeTabClicked(this.props.channel.name);
    }

    render() {
        let pendingMessagesResult = '';
        let pendingMessages = this.props.state.pendingMessages[this.props.channel.name] || {};
        let classNamesLabel = ['label', 'label-pending-messages'];
        let classNamesTab = ['tab'];

        if (this.props.state.activeTab === this.props.channel.name) {
            classNamesTab.push('is-active');
        }

        if (pendingMessages.important) {
            classNamesLabel.push('label-warning');
        } else {
            classNamesLabel.push('label-default');
        }

        let style = {};

        if (pendingMessages.value) {
            style.fontWeight = 'bold';
            pendingMessagesResult = <span className={classNamesLabel.join(' ')}>{pendingMessages.value}</span>;
        }
        return (
            <div
                className={classNamesTab.join(' ')}
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