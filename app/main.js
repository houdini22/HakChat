import {render} from 'react-dom';

import "bootstrap/dist/css/bootstrap.css";
import "./scss/screen.scss";

import React from 'react';
import {Provider} from 'react-redux';
import store, {history} from './store';

import {Router, Route, IndexRoute} from 'react-router';

import MainNotFoundComponent from './components/_MainNotFound';
import MainStartScreenComponent from './components/_MainStartScreen';
import MainChatComponent from './components/_MainChat';
import AppComponent from './components/App';
import MainChannelsComponent from './components/_MainChannels';

const router = (
    <Provider store={store}>
        <Router history={history} key={new Date()}>
            <Route component={AppComponent} path="/">
                <IndexRoute component={MainStartScreenComponent}/>
                <Route path="/channels" component={MainChannelsComponent}/>
                <Route path="/channel/:name" component={MainChatComponent }/>
                <Route path="*" component={MainNotFoundComponent}/>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('main'));