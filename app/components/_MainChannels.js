import React from 'react';

import ChannelComponent from './Channel';
import ChannelTabComponent from './ChannelTab';
import ChannelsTabComponent from './ChannelsTab';

import {Form, ValidatedInput} from 'react-bootstrap-validation';

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

        this.props.socket.on('channels', this.onSocketChannels.bind(this));
        this.props.socket.on('joined channel', this.onSocketJoinedChannel.bind(this));

        this.props.socket.emit('get channels', {
            nick: this.props.state.nick
        });
    }

    componentWillUnmount() {
        this.props.socket.off('channels', this.onSocketChannels.bind(this));
        this.props.socket.off('joined channel', this.onSocketJoinedChannel.bind(this));
    }

    onSocketChannels(channels) {
        this.setState({
            channels
        });
    }

    onSocketJoinedChannel(data) {
        this.props.router.push(`/channel/${data.name}`);
    }

    _handleValidSubmit(values) {
        this.props.socket.once('channel created', (data) => {
            this.props.socket.once('joined channel', (data) => {

            });
            this.props.socket.emit('join channel', {
                channel: values.name,
                nick: this.props.state.nick
            });
        });
        this.props.socket.emit('create channel', {
            name: values.name
        });
    }

    _handleInvalidSubmit(errors, values) {

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
                        <h3>Add Channel</h3>
                        <Form
                            onValidSubmit={this._handleValidSubmit.bind(this)}
                            onInvalidSubmit={this._handleInvalidSubmit.bind(this)}
                        >
                            <ul className="item-grid">
                                <li className="row">
                                    <div className="col-md-8">
                                        <ValidatedInput
                                            type="text"
                                            name="name"
                                            validate="required"
                                            errorHelp={{
                                                required: "Channel Name is required."
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-2">
                                        <button
                                            type="submit"
                                            className="btn btn-default btn-sm"
                                        >
                                            Add Channel
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </Form>
                    </section>

                    <section>
                        <h3>Your Channels</h3>
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