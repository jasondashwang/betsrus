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
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
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
    this.handleTeam1Score = this.handleTeam1Score.bind(this);
    this.handleTeam2Score = this.handleTeam2Score.bind(this);
    this.handlePrediction = this.handlePrediction.bind(this);

    this.state = {
        show: false,
        team1Score: 0, // defaults to this as no prediction, same as data from API
        team2Score: 0
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow (gameID) {
    this.setState({ show: true });

    this.props.selectGame(gameID)
  }

  handleTeam1Score (evt) {
    this.setState({
      team1Score: evt.target.value
    })
  }

  handleTeam2Score (evt) {
    this.setState({
      team2Score: evt.target.value
    })
  }

  handlePrediction (evt) {
    evt.preventDefault();

    this.props.submitPrediction({
      team1: this.state.team1Score,
      team2: this.state.team2Score
    })

    this.setState({
      team1Score: 0,
      team2Score: 0,
      show: false
    });
  }

  render () {
    const { bets, focusGame, myBets } = this.props;
    let showForm = true;

    if (focusGame.gameID && myBets[focusGame.gameID]) {
      showForm = false;
    }


		if (!this.props.accountID) {
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

                    let showBet = true;

                    if (myBets[game.gameID]) {
                      showBet = false;
                    }

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
                              <Button onClick={() => { this.handleShow(game.gameID); } }> { showBet ? 'Place a Bet' : 'See Bets' }</Button>
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
              {
                focusGame.gameID ?
                ( showForm ?
                  (
                    <form onSubmit={this.handlePrediction}>
                      <FormGroup
                        controlId="formBasicText"
                      >
                        <ControlLabel>{ `${focusGame.team1.name} final score` }</ControlLabel>
                        <FormControl
                          type="number"
                          value={this.state.team1Score}
                          onChange={this.handleTeam1Score}
                        />
                        <FormControl.Feedback />

                        <ControlLabel>{ `${focusGame.team2.name} final score` }</ControlLabel>
                        <FormControl
                          type="number"
                          value={this.state.team2Score}
                          onChange={this.handleTeam2Score}
                        />
                        <FormControl.Feedback />
                      </FormGroup>

                      <Button type="submit" bsStyle="primary">Submit (This is final)</Button>
                    </form>
                  )
                  :
                  (
                    bets[focusGame.gameID].map(prediction => {
                      return (
                        <p key={prediction._id}>{ prediction.username }: { focusGame.team1.name } { prediction.scores.team1 } - { prediction.scores.team2 } { focusGame.team2.name } </p>
                      );
                    })
                  )
                ) : ''
              }
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
import { getGamesThunk, selectGameActionCreator, clearGamesActionCreator, submitPredictionThunk } from '../../actions/games';

const mapStateToProps = (state) => {
	return {
		id: state.league._id,
		players: state.league.players,
    name: state.league.name,
    accountID: state.account._id,
    games: state.games.list,
    focusGame: state.games.focusGame,
    bets: state.games.bets,
    myBets: state.games.myBets
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		getLeague () {
			return dispatch(getLeagueThunk(ownProps.match.params.leagueId));
		},
		clearLeague () {
      dispatch(clearLeagueActionCreator());
      dispatch(clearGamesActionCreator());
		},
		mountSockets () {
			dispatch(mountSocketsThunk());
    },
    getGames () {
      dispatch(getGamesThunk());
    },
    selectGame (gameID) {
      dispatch(selectGameActionCreator(gameID));
    },
    submitPrediction (prediction) {
      dispatch(submitPredictionThunk(prediction));
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(League);
