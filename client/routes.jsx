import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import NavBar from './components/NavBar';

export default class Routes extends Component {
  render () {
    return (
      <div>
	      <Router>
					<div>
						<NavBar />
						<Switch>
							<Route exact path="/" component={App} />
							<Route path="/login" component={Login} />
						</Switch>
					</div>
	      </Router>
      </div>
    );
  }
}
