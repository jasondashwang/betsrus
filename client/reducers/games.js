import {
  RECEIVE_GAMES,
  SELECT_GAME,
  RECEIVE_PREDICTIONS,
  ADD_PREDICTION,
  CLEAR_GAMES
} from '../actions/games';

const initialGamesState = {
  list: [],
  focusGame: {},
  bets: {
    // gameID to list of bets
  },
  myBets: {
    // gameId to bet
  }
};

export default function (state = initialGamesState, action) {

  const newState = Object.assign({}, state);
  newState.list = newState.list.slice(0);
  newState.focusGame = Object.assign({}, newState.focusGame);
  newState.bets = Object.assign({}, newState.bets);
  newState.myBets = Object.assign({}, newState.myBets);

  switch (action.type) {
    case RECEIVE_GAMES: {
      newState.list = action.games;
      break;
    }

    case SELECT_GAME: {

      for (let i = 0; i < newState.list.length; i++ ) {
        if (newState.list[i].gameID === action.gameID) {
          newState.focusGame = newState.list[i];
          break;
        }
      }

      break;
    }

    case RECEIVE_PREDICTIONS: {
      const predictions = action.predictions;

      for (let i = 0; i < predictions.length; i++ ) {
        const prediction = predictions[i];
        if (!newState.bets[prediction.gameID]) {
          newState.bets[prediction.gameID] = [prediction];
        } else {
          newState.bets[prediction.gameID].push(prediction);
        }

        if (prediction.userID === action.id) {
          newState.myBets[prediction.gameID] = prediction;
        }

      }

      break;

    }

    case ADD_PREDICTION: {
      const prediction = action.prediction;

      if (!newState.bets[prediction.gameID]) {
        newState.bets[prediction.gameID] = [prediction];
      } else {
        newState.bets[prediction.gameID] = newState.bets[prediction.gameID].slice(0);
        newState.bets[prediction.gameID].push(prediction);
      }

      newState.myBets[prediction.gameID] = prediction;

      break;
    }

    case CLEAR_GAMES: {
      return Object.assign({}, initialGamesState);
    }

    default: {
      return newState;
    }
  }

  return newState;
}
