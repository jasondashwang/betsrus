import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import League from './components/League';
import Profile from './components/Profile';
import Page404 from './components/Page404';

class Routes extends Component {

	componentDidMount () {
		this.props.checkSession();
	}

  render () {
    return (
			<div>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route path="/leagues/:leagueId" component={League} />} />
					<Route exact path="/profile" component={Profile} />
					<Route component={Page404} />
				</Switch>
			</div>
    );
  }
}

import { connect } from 'react-redux';
import { checkSessionThunk } from './actions/account';

const mapDispatchToProps = dispatch => {
	return {
		checkSession () {
			dispatch(checkSessionThunk());
		}
	}
}


export default withRouter(connect(null, mapDispatchToProps)(Routes));
