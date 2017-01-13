import React from 'react';

import JoinedUserComponent from "./JoinedUser";

class JoinedUsersComponent extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.socket.on('users', (users) => {
            this.props.usersListChanged(users);
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
                    this.props.usersJoined.sort((a, b) => {
                        return a > b;
                    }).map((obj) => {
                        i++;
                        return <JoinedUserComponent
                            {...this.props}
                            nick={obj.nick}
                            ip={obj.ip}
                            isTyping={obj.isTyping}
                            key={i}
                        />;
                    })
                }
            </div>
        );
    }
}

JoinedUsersComponent.propTypes = {
    socket: React.PropTypes.object.isRequired
};

export default JoinedUsersComponent;