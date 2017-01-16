import React from 'react';

class Main extends React.Component {
    constructor() {
        super();
        this.documentTitleChanged = false;
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

    }

    componentWillUnmount() {
        this.props.socket.off('chat message', this.onChatMessage.bind(this));
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