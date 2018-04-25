import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import League from './components/League';
import Profile from './components/Profile';
import Page404 from './components/Page404';

export default class Routes extends Component {
  render () {
    return (
			<div>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route path="/leagues/:id" component={League} />} />
					<Route exact path="/profile" component={Profile} />
					<Route component={Page404} />
				</Switch>
			</div>
    );
  }
}
