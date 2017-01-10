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

        this.setState({errorMessage: null});

        this.props.socket.once('connect', () => {

            const nick = this.inputNick.value.trim();
            const password = this.inputPassword.value.trim();

            let disconnect = () => {
                this.setState({errorMessage: 'Wrong user or password.'});
                this.props.socket.off('joined');
                this.props.socket.disconnect();
            };
            this.props.socket.once('disconnect', disconnect);

            let joined = () => {
                this.props.socket.off('disconnect', disconnect);
                this.props.connect(nick);
                this.context.router.transitionTo('/chat');
            };

            this.props.socket.once('joined', joined);

            this.props.socket.emit('join', {
                nick: nick,
                password: password
            });
        });

        this.props.socket.connect();
    }

    componentWillUnmount() {
        this.props.socket.off('connect');
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
                    <p>{this.state.errorMessage}</p>
                </form>
            </div>
        )
    }
}

StartScreen.contextTypes = {
    router: React.PropTypes.object
};

export default StartScreen;