import React from 'react';

class ChannelsTabComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        };
    }

    handleUserClick(e) {
        this.props.router.push('/channels');
    }

    render() {
        return (
            <div
                className="tab"
                onClick={(e) => {
                    this.handleUserClick(e);
                }}
            >
                All Channels
            </div>
        )
    }
}

export default ChannelsTabComponent;