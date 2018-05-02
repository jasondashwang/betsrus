import {
  RECEIVE_LEAGUE,
  CLEAR_LEAGUE
} from '../actions/league';

const initialLeagueState = {
  id: '',
  players: [],
  name: ''
};


export default function (state = initialLeagueState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_LEAGUE: {
      newState.id = action.league._id;
      newState.players = action.players;
      newState.name = action.league.name;
      break;
    }

    case CLEAR_LEAGUE: {
      newState.id = ''
      newState.players = [];
      newState.name = '';
      break;
    }

    default: {
      return newState;
    }
  }

  return newState;
}
