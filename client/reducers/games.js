import {
  RECEIVE_GAMES,
  SELECT_GAME,
  RECEIVE_PREDICTIONS
} from '../actions/games';

const initialAccountState = {
  list: [],
  focusGame: {},
  bets: {
    // gameID to list of bets
  }
};

export default function (state = initialAccountState, action) {

  const newState = Object.assign({}, state);

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

      predictions.forEach(prediction => {
        newState.bets[prediction.gameID] = prediction;
      })

      break;

    }

    default: {
      return newState;
    }
  }

  return newState;
}
