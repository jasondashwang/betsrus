import {
  RECEIVE_LEAGUE,
  CLEAR_LEAGUE,
  ADD_PLAYER
} from '../actions/league';

const initialLeagueState = {
  _id: '',
  players: [],
  name: ''
};


export default function (state = initialLeagueState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_LEAGUE: {
      newState._id = action.league._id;
      newState.players = action.league.players;
      newState.name = action.league.name;
      break;
    }

    case CLEAR_LEAGUE: {
      newState._id = ''
      newState.players = [];
      newState.name = '';
      break;
    }

    case ADD_PLAYER: {
      newState.players = state.players.slice(0);
      newState.players.push(action.player);
      break;
    }

    default: {
      return newState;
    }
  }

  return newState;
}
