import React from 'react';

import JoinedUserComponent from "./JoinedUser";

class JoinedUsersComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        let users = [];
        this.props.state.channels.forEach((obj) => {
            if (obj.name === this.props.params.name) {
                users = [...obj.joinedUsers];
                return false;
            }
        });
        return (
            <div className="users-joined">
                {
                    users.map((obj) => {
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