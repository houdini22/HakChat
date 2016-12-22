import React from 'react';

class StartScreen extends React.Component {
    handleSubmit(e) {
        e.preventDefault();

        const nick = this.inputNick.value.trim();
        const password = this.inputPassword.value.trim();

        this.props.connect(nick, password);

        this.context.router.transitionTo('/chat');
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
                        <button type="submit">GO
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

StartScreen.contextTypes = {
    router: React.PropTypes.object
};

StartScreen.propTypes = {
    connect: React.PropTypes.func.isRequired
};

export default StartScreen;