import React from 'react';

class UsersJoinedComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.props.socket.on('users', (users) => {
            this.setState({
                users
            });
        });
    }

    render() {
        let i = 0;
        return (
            <div className="users-joined">
                {
                    this.state.users.map((obj) => {
                        i++;
                        return (
                            <div className="connected-user" key={i}>
                                <p>
                                    <span className="nick">{obj.nick}</span>
                                    <span className="ip">{obj.ip}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

UsersJoinedComponent.propTypes = {
    socket: React.PropTypes.object.isRequired
};

export default UsersJoinedComponent;