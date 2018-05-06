import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import axios from 'axios';

import './styles.css';
import { withRouter } from 'react-router-dom'

// This will be our main component container for the rest of our site
class Home extends Component {

	constructor (props) {
		super(props);

		this.state = {
			leagueID: '',
			name: ''
		}

		this.handleChangeLeagueID = this.handleChangeLeagueID.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.goToLeague = this.goToLeague.bind(this);
	}

  handleChangeLeagueID(evt) {
    this.setState({ leagueID: evt.target.value });
	}

	handleJoin (evt) {
		evt.preventDefault();

		this.props.joinLeague(this.state.leagueID);
	}

	handleChangeName (evt) {
		this.setState({ name: evt.target.value });
	}

	handleCreate (evt) {
		evt.preventDefault();

		this.props.createLeague(this.state.name)
	}

	goToLeague (id) {
		this.props.goToLeague(id);
	}

  render () {
    return (
      <div>
        <Jumbotron className="landing">
					<Image src="/premier-league/betsrus.png" />
					<p>
						"Do you have what it takes to rise to the top?"
					</p>

					{ this.props.accountId ?
						<div>
							<form onSubmit={this.handleJoin}>
								<FormGroup
									controlId="formBasicText"
								>
									<ControlLabel>Join Existing League</ControlLabel>
									<FormControl
										type="text"
										value={this.state.leagueID}
										placeholder="Enter League ID"
										onChange={this.handleChangeLeagueID}
									/>
									<FormControl.Feedback />
								</FormGroup>

								<Button type="submit" bsStyle="primary">Join</Button>
							</form>

							<form onSubmit={this.handleCreate}>
							<FormGroup
								controlId="formBasicText"
							>
								<ControlLabel>Create League</ControlLabel>
								<FormControl
									type="text"
									value={this.state.name}
									placeholder="Enter League Name"
									onChange={this.handleChangeName}
								/>
								<FormControl.Feedback />
							</FormGroup>

								<Button type="submit" bsStyle="primary">Create</Button>
							</form>

						</div> :
						<div>
							<h4>To create or join a league, please login or sign up with an account</h4>
						</div>

					}

					{
					this.props.accountId ?
								<Jumbotron className="leagueList">
									<h2>My Leagues</h2>
									{ /* Change this to be a Grid Format */ }

									{
										// if there are leagues, return the list of them otherwise display a message to join one
										this.props.leagues.length ?
										this.props.leagues.map(league => {
											return (
												<div className="leagueCard" key={league._id} onClick={() => { this.goToLeague(league._id); }} >{ league.name }</div>
											)
										})
										: <h4>You are currently not part of any leagues!</h4>

									}
								</Jumbotron>
					: ''
				}

    	  </Jumbotron>

      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createLeagueThunk, joinLeagueThunk } from '../../actions/league';
import { push } from 'react-router-redux';

const mapStateToProps = state => {
	return {
		accountId: state.account._id,
		leagues: state.account.leagues
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createLeague (name) {
			dispatch(createLeagueThunk(name))
		},
		joinLeague (leagueID) {
			dispatch(joinLeagueThunk(leagueID));
		},
		goToLeague (leagueID) {
			dispatch(push(`/leagues/${leagueID}`));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
