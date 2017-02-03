import React from 'react';

import LocaleStorageWrapper from '../classes/LocalStorageWrapper';

class ChannelComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            activeChannel: null
        };
        this.localeStorageWrapper = new LocaleStorageWrapper();
    }

    handleJoinToChannel(name) {
        this.props.actions.activeTabClicked(name);

        this.props.socket.emit('join channel', {
            channel: name,
            nick: this.props.state.nick
        });

        let joinedChannels = this.localeStorageWrapper.getByPath('joined_channels', []);
        joinedChannels.push(name);
        this.localeStorageWrapper.setByPath('joined_channels', joinedChannels).save();
    }

    handleLeaveFromChannel(name) {
        this.props.socket.emit('leave channel', {
            channel: name,
            nick: this.props.state.nick
        });

        let joinedChannels = this.localeStorageWrapper.getByPath('joined_channels', []);
        joinedChannels.forEach((name2, i) => {
            if (name2 === name) {
                joinedChannels.splice(i, 1);
                return false;
            }
        });
        this.localeStorageWrapper.setByPath('joined_channels', joinedChannels).save();
    }

    render() {
        let channel = this.props.channel;
        let classes = ['channel'];

        classes.push(this.props.index % 2 === 0 ? 'odd' : 'even');

        if (this.state.activeChannel === channel.name) {
            classes.push('has-hover');
        }

        let action = '';
        let joined = this.props.joined;

        if (!joined) {
            action = (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        this.handleJoinToChannel(channel.name)
                    }}
                    className="btn btn-default btn-sm"
                >
                    Join
                </a>
            );
        } else {
            action = (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        this.handleLeaveFromChannel(channel.name);
                    }}
                    className="btn btn-default btn-sm"
                >
                    Leave
                </a>
            );
        }

        return (
            <li
                className={classes.join(' ')}
                key={channel.name}
                onMouseEnter={(e) => {
                    this.setState({activeChannel: channel.name});
                }}
                onMouseLeave={(e) => {
                    this.setState({activeChannel: null});
                }}
            >
                <div className="row">
                    <div className="col-md-8">{channel.name}</div>
                    <div className="col-md-2">{channel.joinedUsers.length}</div>
                    <div className="col-md-2">
                        {action}
                    </div>
                </div>
            </li>
        );
    }
}

export default ChannelComponent;