import React from 'react';

import ChannelComponent from './Channel';
import ChannelTabComponent from './ChannelTab';
import ChannelsTabComponent from './ChannelsTab';

class ChannelsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            channels: []
        };
        this.channels = {};
    }

    componentDidMount() {
        if (!this.props.socket.connected) {
            this.props.router.push("/");
        }

        this.props.socket.on('channels', (data) => {
            this.setState({
                channels: data
            });
        });
        this.props.socket.on('joined channel', this.onJoinedChannel.bind(this));
        this.props.socket.emit('get channels', {
            nick: this.props.state.nick
        });
    }

    componentWillUnmount() {
        this.props.socket.off('channels');
        this.props.socket.off('joined channel', this.onJoinedChannel.bind(this));
    }

    onJoinedChannel(data) {
        this.props.router.push(`/channel/${data.name}`);
    }

    render() {
        let noJoinedChannels;
        this.state.channels.map((obj, i) => {
            noJoinedChannels = !obj.joinedUsers.find((user) => {
                return user.nick === this.props.state.nick;
            });
        });
        let joinedChannels;
        if (!noJoinedChannels) {
            joinedChannels = (
                <ul className="item-grid">
                    {
                        this.state.channels.map((obj, i) => {
                            let joined = obj.joinedUsers.find((user) => {
                                return user.nick === this.props.state.nick;
                            });
                            if (joined) {
                                return <ChannelComponent
                                    {...this.props}
                                    channel={obj}
                                    key={obj.name}
                                    joined={true}
                                    index={i}
                                />
                            }
                        })
                    }
                </ul>
            );
        } else {
            joinedChannels = (
                <h4 className="notification-warning notification">
                    You have no channels joined.
                </h4>
            );
        }

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
                <div
                    className="main-window channels"
                >
                    <section>
                        <h3>Your channels</h3>
                        {joinedChannels}
                    </section>

                    <section>
                        <h3>All Channels</h3>
                        <ul className="item-grid">
                            {
                                this.state.channels.map((obj, i) => {
                                    let joined = obj.joinedUsers.find((user) => {
                                        return user.nick === this.props.state.nick;
                                    });
                                    return <ChannelComponent
                                        {...this.props}
                                        channel={obj}
                                        key={obj.name}
                                        joined={!!joined}
                                        index={i}
                                    />
                                })
                            }
                        </ul>
                    </section>
                </div>
            </div>
        );
    }
}

export default ChannelsComponent;