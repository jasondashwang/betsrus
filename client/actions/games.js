import axios from 'axios';

import socket from '../socket';

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const SELECT_GAME = 'SELECT_GAME';
export const RECEIVE_PREDICTIONS = 'RECEIVE_PREDICTIONS';
export const ADD_PREDICTION = 'ADD_PREDICTION';
export const CLEAR_GAMES = 'CLEAR_GAMES';

export const clearGamesActionCreator = () => {
  return {
    type: CLEAR_GAMES
  }
}

export const addPredictionActionCreator = (prediction, id) => {
  return {
    type: ADD_PREDICTION,
    prediction,
    id
  }
}

export const receivePredictionsActionCreator = (predictions, id) => {
  return {
    type: RECEIVE_PREDICTIONS,
    predictions,
    id
  }
}

export const receiveGamesActionCreator = games => {
  return {
    type: RECEIVE_GAMES,
    games
  }
};

export const selectGameActionCreator = gameID => {
  return {
    type: SELECT_GAME,
    gameID
  }
}

export const getGamesThunk = () => {
  return (dispatch) => {
    axios.get('/api/game/remainingFixtures')
    .then(res => {
      const games = res.data;
      dispatch(receiveGamesActionCreator(games));
    })
  };
};

export const submitPredictionThunk = (scores) => {
  return (dispatch, getState) => {

    const state = getState();

    axios.post('/api/prediction', {
      scores,
      gameID: state.games.focusGame.gameID,
      leagueID: state.league._id,
      username: state.account.username,
      userID: state.account._id
    })
    .then(res => {
      const prediction = res.data;
      dispatch(addPredictionActionCreator(prediction, state.account._id));
      socket.emit('addPrediction', {
        prediction,
        leagueID: state.league._id
      })
    })
    .catch(err => {
      console.error(err);
    })
  }
}

