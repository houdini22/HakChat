import React from 'react';

class StartScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            errorMessage: null
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const nick = this.inputNick.value.trim();
        const password = this.inputPassword.value.trim();

        this.setState({errorMessage: null});

        this.props.socket.once('connect', () => {
            let joined = () => {
                this.props.connect(nick);
                this.context.router.transitionTo('/chat');
            };

            this.props.socket.once('joined', joined);

            this.props.socket.on('disconnect', () => {
                this.props.socket.off('joined');
                this.props.socket.disconnect();
            });

            this.props.socket.emit('join', {
                nick: nick,
                password: password
            });
        });

        this.props.socket.connect();
    }

    render() {
        return (
            <div className="start-screen">
                <form onSubmit={(e) => {
                    this.handleSubmit(e);
                }}>
                    <div className="has-input">
                        <input type="text" name="nick" placeholder="Enter your nick" required="required" minLength="3"
                               ref={(input) => {
                                   this.inputNick = input;
                               }}
                        />
                    </div>
                    <div className="has-input">
                        <input type="password" name="password" placeholder="Enter password" required="required"
                               ref={(input) => {
                                   this.inputPassword = input;
                               }}
                        />
                    </div>
                    <div className="has-button">
                        <button type="submit">GO</button>
                    </div>
                    {this.state.errorMessage}
                </form>
            </div>
        )
    }
}

StartScreen.contextTypes = {
    router: React.PropTypes.object
};

export default StartScreen;