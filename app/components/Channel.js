import React from 'react';

class ChannelComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            activeChannel: null
        };
    }

    joinToChannel(name) {
        this.props.socket.emit('join channel', {
            channel: name,
            nick: this.props.state.nick
        });
    }

    leaveFromChannel(name) {
        this.props.socket.emit('leave channel', {
            channel: name,
            nick: this.props.state.nick
        });
    }

    render() {
        let channel = this.props.channel;
        let classes = ['channel'];

        classes.push(this.props.index % 2 === 0 ? 'odd' : 'even');

        if (this.state.activeChannel === channel.name) {
            classes.push('has-hover');
        }

        let joinAction = '';
        let joined = this.props.joined;

        if (!joined) {
            joinAction = (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        this.joinToChannel(channel.name)
                    }}>
                    Join
                </a>
            );
        } else {
            joinAction = (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        this.leaveFromChannel(channel.name);
                    }}>
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
                        {joinAction}
                    </div>
                </div>
            </li>
        );
    }
}

export default ChannelComponent;