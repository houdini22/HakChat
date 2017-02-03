import React from 'react';

import NewMessageComponent from './NewMessage';
import MessagesComponent from './Messages';
import UsersJoinedComponent from './JoinedUsers';
import ChannelTabComponent from './ChannelTab';
import ChannelsTabComponent from './ChannelsTab';

class ChatComponent extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (!this.props.socket.connected) {
            this.props.router.push("/");
        }

        this.props.socket.on('channels', this.onSocketChannels.bind(this));

        this.props.socket.emit('get channels', {
            nick: this.props.state.nick
        });
    }

    componentWillUnmount() {
        this.props.socket.off('channels', this.onSocketChannels.bind(this));
    }

    onSocketChannels(data) {
        this.props.actions.channelsFetched(data);
    }

    render() {
        return (
            <div className="main-screen">
                <div className="tabs">
                    <ChannelsTabComponent
                        {...this.props}
                    />
                    {
                        this.props.state.channels.map((channel, i) => {
                            let joined = channel.joinedUsers.find((user) => {
                                return user.nick === this.props.state.nick;
                            });
                            if (joined) {
                                return (
                                    <ChannelTabComponent
                                        {...this.props}
                                        channel={channel}
                                        key={i}
                                        index={i}
                                    />
                                );
                            }
                        })
                    }
                </div>
                <MessagesComponent
                    {...this.props}
                    channel={this.props.state.activeTab}
                />
                <UsersJoinedComponent
                    {...this.props}
                />
                <NewMessageComponent
                    {...this.props}
                />
            </div>
        );
    }
}

ChatComponent.propTypes = {
    nick: React.PropTypes.string,
    password: React.PropTypes.string
};

export default ChatComponent;