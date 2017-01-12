import React from 'react';

class JoinedUserComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        };
    }

    handleUserClick(e) {
        this.props.userClick(this.messageDiv.getAttribute('data-user-nick'));
    }

    componentDidMount() {
        this.messageDiv.setAttribute('data-user-nick', this.props.nick);
    }

    render() {
        let classes = ['connected-user'];
        if (this.state.active === true) {
            classes.push('is-active');
        }
        return (
            <div
                className={classes.join(' ')}
                onClick={(e) => {
                    this.handleUserClick(e);
                }}
                onMouseEnter={() => {
                    this.setState({active: true});
                }}
                onMouseLeave={() => {
                    this.setState({active: false});
                }}
                ref={(input) => {
                    this.messageDiv = input;
                }}
            >
                <p>
                    <span className="nick">{this.props.nick}</span>
                    <span className="ip">{this.props.ip}</span>
                </p>
            </div>
        )
    }
}

export default JoinedUserComponent;