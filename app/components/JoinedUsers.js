import React from 'react';

import JoinedUserComponent from "./JoinedUser";

class JoinedUsersComponent extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.socket.on('users', (users) => {
            this.props.actions.usersListChanged(users);
        });
        this.props.socket.on('disconnect', () => {
            this.props.socket.off('users');
        });
    }

    componentWillUnmount() {
        this.props.socket.off('users');
    }

    render() {
        return (
            <div className="users-joined">
                {
                    this.props.state.usersJoined.map((obj) => {
                        return <JoinedUserComponent
                            {...this.props}
                            nick={obj.nick}
                            ip={obj.ip}
                            isTyping={obj.isTyping}
                            key={obj.nick}
                        />;
                    })
                }
            </div>
        );
    }
}

export default JoinedUsersComponent;