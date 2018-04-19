import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import League from './components/League';

export default class Routes extends Component {

	constructor (props) {
		super(props);

		this.state = {
			account: {}
		}
	}


  render () {
    return (
      <div>
	      <Router>
					<div>
						<NavBar account={this.state.account} />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/league" component={League} />
						</Switch>
					</div>
	      </Router>
      </div>
    );
  }
}
