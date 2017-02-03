import React from 'react';

class JoinedUserComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        };
    }

    handleUserClick(e) {
        this.props.actions.userClick(this.props.nick);
    }

    render() {
        let classes = ['connected-user'];
        if (this.state.active === true) {
            classes.push('is-active');
        }
        if (this.props.isTyping) {
            classes.push('is-typing');
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
            >
                <p>
                    <span className="nick">{this.props.nick}</span>
                    {/*<span className="ip">{this.props.ip}</span>*/}
                </p>
            </div>
        )
    }
}

export default JoinedUserComponent;