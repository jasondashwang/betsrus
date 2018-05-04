import axios from 'axios';

import socket from '../socket';

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const SELECT_GAME = 'SELECT_GAME';
export const RECEIVE_PREDICTIONS = 'RECEIVE_PREDICTIONS';

export const receivePredictionsActionCreator = predictions => {
  return {
    type: RECEIVE_PREDICTIONS,
    predictions
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
      console.log(games);

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
    .then(prediction => {
      console.log(prediction);
    })
    .catch(err => {
      console.error(err);
    })
  }
}

