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

        localStorage.setItem("HakChat", JSON.stringify({nick, password}));

        this.setState({errorMessage: null});
        this.props.socket.connect();
    }

    componentWillMount() {
        this.props.socket.on('connect', () => {

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
                this.props.userLoggedIn(nick);
                this.props.router.push('/chat');
            };

            this.props.socket.once('joined', joined);

            this.props.socket.emit('join', {
                nick: nick,
                password: password
            });
        });
    }

    componentWillUnmount() {
        this.props.socket.off('connect');
    }

    render() {
        let data = JSON.parse(localStorage.getItem('HakChat') || '{}');

        const nick = data.nick || '';
        const password = data.password || '';

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
                               defaultValue={nick}
                        />
                    </div>
                    <div className="has-input">
                        <input type="password" name="password" placeholder="Enter password" required="required"
                               ref={(input) => {
                                   this.inputPassword = input;
                               }}
                               defaultValue={password}
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