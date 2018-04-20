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
		this.createLeague = this.createLeague.bind(this);
	}

  handleChange(evt) {
    this.setState({ leagueId: evt.target.value });
	}

	handleSubmit (evt) {
		evt.preventDefault();

		console.log('submitted');
	}

	createLeague () {
		axios.post('/api/league/createLeague')
		.then(res => {
			const league = res.data;
			console.log(league);
			this.props.history.push(`/leagues/${league._id}`, {
				state: {
					meow: true
				}
			});
		})
		.catch(err => {
			console.error(err);
		})
	}

  render () {
    return (
      <div>
        <Jumbotron className="landing">
					<h1>Welcome to Bets R Us</h1>
					<p>
						"Do you have what it takes to rise to the top?" - Chirayu Poudel (Crystal Palace)
					</p>
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
						<Button onClick={this.createLeague} bsStyle="primary">Create New League</Button>
					</p>
    	  </Jumbotron>

				<Jumbotron>
					<h2>My Leagues</h2>

					<Grid>
						<Row>
							<Col md={4}>
								Moo
							</Col>
							<Col md={4}>
								Moo
							</Col>
							<Col md={4}>
								Moo
							</Col>
						</Row>
					</Grid>
				</Jumbotron>
      </div>
    );
  }
}

export default withRouter(Home);
