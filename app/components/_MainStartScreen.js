import React from 'react';
import LocaleStorageWrapper from '../classes/LocalStorageWrapper';

class StartScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            errorMessage: null
        };
        this.localeStorageWrapper = new LocaleStorageWrapper();
    }

    handleSubmit(e) {
        e.preventDefault();

        const nick = this.inputNick.value.trim();
        const password = this.inputPassword.value.trim();

        this.localeStorageWrapper.setByPath('userData', {nick, password}).save();

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
                this.props.actions.userLoggedIn(nick);
                this.props.router.push('/channels');
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
        let {nick, password} = this.localeStorageWrapper.getByPath('userData', {});

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

export default StartScreen;