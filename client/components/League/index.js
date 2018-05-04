import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Label from 'react-bootstrap/lib/Label';
import Image from 'react-bootstrap/lib/Image';
import './styles.css';

// This will be our main component container for the rest of our site
class League extends Component {

	componentDidMount () {
		this.props.getLeague();
		this.props.mountSockets();
	}

	componentWillUnmount () {
		this.props.clearLeague();
	}

  render () {
		if (!this.props._id) {
			return (
				<h1>Login to view Leagues</h1>
			)
		} else {
			return (
				<div>
					<h1>{ this.props.name }</h1>
					<h1>League Code (Share with Friends): { this.props.id }</h1>
					<Grid>
						<Row className="leagueGrid">
							<Col md={8} mdOffset={2}>
								<h1>
									<Label bsStyle="primary">Upcoming Games</Label>{' '}
								</h1>
								<ListGroup>
								<ListGroupItem>
									<Grid>
										<Row className="gameRow1">
											<Col xs={4}>
												<Image src="http://via.placeholder.com/125x125" />
												<p>Team 1</p>
											</Col>
											<Col xs={4}>
												<h2>
												<Label bsStyle="danger">VS</Label>{' '}
												</h2>
												<Label bsStyle="success">1 PM(EDT) Saturday Apr. 21, 2018</Label>{' '}
											</Col>
											<Col xs={4}>
												<Image src="http://via.placeholder.com/125x125" />
												<p>Team 2</p>
											</Col>
										</Row>
									</Grid>
								</ListGroupItem>
								<ListGroupItem>
									<Grid>
										<Row className="gameRow1">
											<Col xs={4}>
												<Image src="http://via.placeholder.com/125x125" />
												<p>Team 3</p>
											</Col>
											<Col xs={4}>
												<h2>
												<Label bsStyle="danger">VS</Label>{' '}
												</h2>
												<Label bsStyle="success">3 PM(EDT) Sunday Apr. 22, 2018</Label>{' '}
											</Col>
											<Col xs={4}>
												<Image src="http://via.placeholder.com/125x125" />
												<p>Team 4</p>
											</Col>
										</Row>
									</Grid>
								</ListGroupItem>
						</ListGroup>
							</Col>
							<Col md={2}>
								<h1>
									<Label bsStyle="primary">Standings</Label>{' '}
								</h1>
								<ListGroup>
								{
									this.props.players.map(player => {
										return (<ListGroupItem key={player._id}>{ player.username } - { player.score }</ListGroupItem>)
									})
								}
						</ListGroup>
							</Col>
						</Row>
					</Grid>
				</div>
			);
		}

  }
}

import { connect } from 'react-redux';
import { getLeagueThunk, clearLeagueActionCreator, mountSocketsThunk } from '../../actions/league';

const mapStateToProps = (state) => {
	return {
		id: state.league._id,
		players: state.league.players,
		name: state.league.name
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		getLeague () {
			return dispatch(getLeagueThunk(ownProps.match.params.leagueId));
		},
		clearLeague () {
			return dispatch(clearLeagueActionCreator());
		},
		mountSockets () {
			dispatch(mountSocketsThunk());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(League);
