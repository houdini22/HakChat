import {render} from 'react-dom';
import "./scss/screen.scss";

import React from 'react';
import {Provider} from 'react-redux';
import store, {history} from './store';

import {Router, Route, IndexRoute} from 'react-router';

import NotFoundComponent from './components/NotFound';
import StartScreenComponent from './components/StartScreen';
import ChatComponent from './components/Chat';
import AppComponent from './components/App';

const router = (
    <Provider store={store}>
        <Router history={history} key={new Date()}>
            <Route component={AppComponent} path="/">
                <IndexRoute component={StartScreenComponent}/>
                <Route path="/chat" component={ChatComponent }/>
                <Route path="*" component={NotFoundComponent}/>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('main'));