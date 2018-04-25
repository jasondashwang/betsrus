import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { ConnectedRouter as Router, routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

import reducers from './reducers';

const history = createHistory();
const middleware = applyMiddleware(thunkMiddleware, routerMiddleware(history), createLogger({collapsed: true}));
const enhancers = [middleware];

const store = createStore(combineReducers({
  ...reducers,
  routing: routerReducer
}), {}, compose(...enhancers));

ReactDOM.render(
  (<Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>),
  document.getElementById('app')
);
