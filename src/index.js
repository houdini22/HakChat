import React from 'react';
import {render} from 'react-dom';

import "./css/style.css";

import App from './components/App'

const Root = () => {
    return (
        <App/>
    );
};

render(<Root/>, document.getElementById('main'));