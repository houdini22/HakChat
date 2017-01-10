import React from 'react';

import JoinedUserComponent from "./JoinedUser";

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
        this.props.socket.on('disconnect', () => {
            this.props.socket.off('users');
        });
    }

    componentWillUnmount() {
        this.props.socket.off('users');
    }

    render() {
        let i = 0;
        return (
            <div className="users-joined">
                {
                    this.state.users.map((obj) => {
                        i++;
                        return <JoinedUserComponent
                            nick={obj.nick}
                            ip={obj.ip}
                            key={i}
                        />;
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