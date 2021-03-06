import React from 'react';
import {hasNickInMessageHelper} from '../helpers/chat-helper';

import LocaleStorageWrapper from '../classes/LocalStorageWrapper';

class Main extends React.Component {
    constructor() {
        super();
        this.documentTitleChanged = false;
        this.isWindowFocused = true;
        this.localeStorageWrapper = new LocaleStorageWrapper();
    }

    onChatMessage() {
        if (this.documentTitleChanged === false && this.isWindowFocused === false) {
            this.documentTitleChanged = true;
            document.title = `* ${document.title}`;
        }
    }

    restorePreviousTitle() {
        if (this.documentTitleChanged === true) {
            this.documentTitleChanged = false;
            document.title = document.title.substr(2);
        }
    }

    onMessageReceived(data) {
        let important = hasNickInMessageHelper(this.props.state.nick, data.message);
        this.props.actions.messageReceived(data);
        this.props.state.channels.forEach((channel) => {
            if (data.channel === channel.name && data.channel !== this.props.params.name) {
                this.props.actions.pendingMessages({
                    channel: channel.name,
                    important: important
                });
            }
        });
        if (important) {
            try {
                let audio = new Audio('/sounds/notification.mp3');
                audio.play();
            } catch (ex) {
            }
        }
    }

    onJoined(data) {

    }

    componentDidMount() {
        window.onfocus = () => {
            this.isWindowFocused = true;
            this.props.socket.off('chat message', this.onChatMessage.bind(this));
            this.restorePreviousTitle();
        };
        window.onblur = () => {
            this.isWindowFocused = false;
            this.props.socket.on('chat message', this.onChatMessage.bind(this));
        };
        this.props.socket.on('chat message', this.onMessageReceived.bind(this));
        this.props.socket.on('system message', this.onMessageReceived.bind(this));
        this.props.socket.on('joined', this.onJoined.bind(this));

        this.props.socket.on('disconnect', () => {
            this.props.socket.off('chat message', this.onMessageReceived.bind(this));
            this.props.socket.off('system message', this.onMessageReceived.bind(this));
            this.props.socket.off('joined', this.onJoined.bind(this));
            this.props.router.push('/');
        });
    }

    componentWillUnmount() {
        this.props.socket.off('chat message', this.onChatMessage.bind(this));
        this.props.socket.off('chat message', this.onMessageReceived.bind(this));
        this.props.socket.off('system message', this.onMessageReceived.bind(this));
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, {...this.props})}
            </div>
        );
    }
}

export default Main;