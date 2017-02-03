import React from 'react';

class ChannelsTabComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        };
    }

    handleUserClick() {
        this.props.actions.activeTabClicked('_CHANNELS_');
        this.props.router.push('/channels');
    }

    render() {
        let classNames = ['tab'];
        if (this.props.state.activeTab === '_CHANNELS_') {
            classNames.push('is-active');
        }
        return (
            <div
                className={classNames.join(' ')}
                onClick={(e) => {
                    this.handleUserClick();
                }}
            >
                All Channels
            </div>
        )
    }
}

export default ChannelsTabComponent;