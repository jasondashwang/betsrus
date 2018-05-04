import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Label from 'react-bootstrap/lib/Label';
import Image from 'react-bootstrap/lib/Image';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import './styles.css';

// This will be our main component container for the rest of our site
class League extends Component {

	componentDidMount () {
		this.props.getLeague();
    this.props.mountSockets();
    this.props.getGames();
	}

	componentWillUnmount () {
		this.props.clearLeague();
	}

  constructor (props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
        show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow (gameID) {
    this.setState({ show: true });

    this.props.selectGame(gameID)
  }

  render () {
		if (this.props.accountID === 'meow') {
			return (
				<h1>Login to view Leagues</h1>
			)
		} else {
			return (
        <div>
          <h1>{ this.props.name } </h1>
          <h2>League Code (Share with Friends): { this.props.id }</h2>
          <Grid>
            <Row className="leagueGrid">
              <Col md={8} mdOffset={2}>
                <h1>
                  <Label bsStyle="primary">Upcoming Games</Label>{' '}
                </h1>
                <ListGroup>
                {
                  this.props.games.map(game => {
                    return (
                      <ListGroupItem key={game.gameID}>
                        <Grid>
                          <Row className="gameRow1">
                            <Col xs={4}>
                              <Image src={`/premier-league/${game.team1.name}.png`} />
                              <p>{ game.team1.name } </p>
                            </Col>
                            <Col xs={4}>
                              <h2>
                              <Label bsStyle="danger">VS</Label>
                              </h2>
                              <Label bsStyle="success"> { game.start_Date } </Label>
                              <Button onClick={() => { this.handleShow(game.gameID); } }> Place a Bet </Button>
                            </Col>
                            <Col xs={4}>
                              <Image src={`/premier-league/${game.team2.name}.png`} />
                              <p> { game.team2.name } </p>
                            </Col>
                          </Row>
                        </Grid>
                      </ListGroupItem>
                    )
                  })
                }

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

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Placing Bet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
		}

  }
}

import { connect } from 'react-redux';
import { getLeagueThunk, clearLeagueActionCreator, mountSocketsThunk } from '../../actions/league';
import { getGamesThunk, selectGameActionCreator } from '../../actions/games';

const mapStateToProps = (state) => {
	return {
		id: state.league._id,
		players: state.league.players,
    name: state.league.name,
    accountID: state.account._id,
    games: state.games.list,
    focusGame: state.games.focusGame
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
    },
    getGames () {
      dispatch(getGamesThunk());
    },
    selectGame (gameID) {
      dispatch(selectGameActionCreator(gameID));
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(League);
