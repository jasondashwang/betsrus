import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import axios from 'axios';

import './styles.css';
import { withRouter } from 'react-router-dom'

// This will be our main component container for the rest of our site
class Home extends Component {

	constructor (props) {
		super(props);

		this.state = {
			leagueId: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange(evt) {
    this.setState({ leagueId: evt.target.value });
	}

	handleSubmit (evt) {
		evt.preventDefault();

		console.log('submitted');
	}

  render () {
    return (
      <div>
        <Jumbotron className="landing">
					<h1>Welcome to Bets R Us</h1>
					<p>
						"Do you have what it takes to rise to the top?" - Chirayu Poudel (Crystal Palace)
					</p>

					{ this.props.accountId ?
						<div>
							<form onSubmit={this.handleSubmit}>
							<FormGroup
								controlId="formBasicText"
							>
								<ControlLabel>Join Existing League</ControlLabel>
								<FormControl
									type="text"
									value={this.state.leagueId}
									placeholder="Enter League ID"
									onChange={this.handleChange}
								/>
								<FormControl.Feedback />
							</FormGroup>

							<Button type="submit">Join</Button>
							</form>
							<p>
								<Button onClick={this.props.createLeague} bsStyle="primary">Create New League</Button>
							</p>
						</div> :
						<div>
							<h4>To create or join a league, please login or sign up with an account</h4>
						</div>

					}
    	  </Jumbotron>

				<Jumbotron>
					<h2>My Leagues</h2>
					{ /* Change this to be a Grid Format */ }

					{
						// if there are leagues, return the list of them otherwise display a message to join one
						this.props.leagues.length ?
						this.props.leagues.map(league => {
							return (
								<div>{ league }</div>
							)
						})
						: <h4>You are currently not part of any leagues!</h4>

					}
				</Jumbotron>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createLeagueThunk } from '../../actions/league';

const mapStateToProps = state => {
	return {
		accountId: state.account.id,
		leagues: state.account.leagues
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createLeague () {
			dispatch(createLeagueThunk())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
