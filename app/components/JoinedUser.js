import React from 'react';

class JoinedUserComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        };
    }

    render() {
        let classes = ['connected-user'];
        if (this.state.active === true) {
            classes.push('is-active');
        }
        return (
            <div
                className={classes.join(' ')}
                onMouseEnter={() => {
                    this.setState({active: true});
                }}
                onMouseLeave={() => {
                    this.setState({active: false});
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